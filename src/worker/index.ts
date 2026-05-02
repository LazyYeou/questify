import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { tasks, tags, users, taskTags } from "../db/schema";
import { eq, and } from "drizzle-orm";

type Bindings = {
  db: D1Database;
  cache: KVNamespace;
};

type Variables = {
  userId: number;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Mock Auth Middleware
app.use("*", async (c, next) => {
  const db = drizzle(c.env.db);
  const mockId = 1;

  const existingUser = await db.select().from(users).where(eq(users.id, mockId)).get();
  if (!existingUser) {
    await db.insert(users).values({
      id: mockId,
      email: "mock@example.com",
      name: "Mock User",
    }).run();
  }

  c.set("userId", mockId);
  await next();
});

// User Profile
app.get("/api/users/me", async (c) => {
  const db = drizzle(c.env.db);
  const userId = c.get("userId");
  const user = await db.select().from(users).where(eq(users.id, userId)).get();
  
  if (!user) return c.json(null);

  // Streak reset check
  if (user.lastStreakAt) {
    const lastDate = new Date(user.lastStreakAt);
    const today = new Date();
    
    // Normalize to dates
    const d1 = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
    const d2 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const diffDays = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      // Missed more than a day, reset streak
      const [updatedUser] = await db.update(users)
        .set({ streak: 0 })
        .where(eq(users.id, userId))
        .returning();
      return c.json(updatedUser);
    }
  }

  return c.json(user);
});

// Tasks Endpoints
app.get("/api/tasks", async (c) => {
  const db = drizzle(c.env.db);
  const userId = c.get("userId");

  // Fetch tasks and their tags
  const results = await db
    .select({
      task: tasks,
      tag: tags,
    })
    .from(tasks)
    .leftJoin(taskTags, eq(tasks.id, taskTags.taskId))
    .leftJoin(tags, eq(taskTags.tagId, tags.id))
    .where(eq(tasks.userId, userId))
    .all();

  // Group by task ID
  const groupedTasks = results.reduce((acc, curr) => {
    const taskId = curr.task.id;
    if (!acc[taskId]) {
      acc[taskId] = { ...curr.task, tags: [] };
    }
    if (curr.tag) {
      acc[taskId].tags.push(curr.tag);
    }
    return acc;
  }, {} as Record<number, any>);

  return c.json(Object.values(groupedTasks));
});

app.post("/api/tasks", async (c) => {
  const db = drizzle(c.env.db);
  const userId = c.get("userId");
  const body = await c.req.json();
  const { title, description, timeEstimation, tags: tagNames, icon, dueDate } = body;

  // 1. Insert Task
  const [newTask] = await db.insert(tasks).values({
    userId,
    title,
    description,
    timeEstimation: timeEstimation || 0,
    status: "pending",
    icon,
    dueDate,
  }).returning();

  // 2. Handle Tags (Inline Creation)
  if (tagNames && Array.isArray(tagNames)) {
    for (const rawName of tagNames) {
      if (!rawName.trim()) continue;
      const name = rawName.trim().toUpperCase();

      // Upsert tag
      let tag = await db.select().from(tags).where(and(eq(tags.userId, userId), eq(tags.name, name))).get();
      if (!tag) {
        [tag] = await db.insert(tags).values({
          userId,
          name: name,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color
        }).returning();
      }

      // Link Tag to Task
      await db.insert(taskTags).values({
        taskId: newTask.id,
        tagId: tag.id,
      }).run();
    }
  }

  return c.json(newTask, 201);
});

app.put("/api/tasks/:id", async (c) => {
  const db = drizzle(c.env.db);
  const userId = c.get("userId");
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  const { tags: tagNames, icon, ...taskUpdates } = body;
  
  const currentTask = await db.select().from(tasks).where(and(eq(tasks.id, id), eq(tasks.userId, userId))).get();
  if (!currentTask) return c.json({ error: "Task not found" }, 404);

  const isCompleting = body.status === "completed" && currentTask.status !== "completed";
  
  // 1. Update Task Table
  const [updatedTaskRow] = await db.update(tasks)
    .set({
      ...taskUpdates,
      icon,
      updatedAt: new Date().toISOString(),
    })
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .returning();

  // 2. Handle Tag Updates
  if (tagNames && Array.isArray(tagNames)) {
    await db.delete(taskTags).where(eq(taskTags.taskId, id)).run();
    for (const rawName of tagNames) {
      if (!rawName.trim()) continue;
      const name = rawName.trim().toUpperCase();
      let tag = await db.select().from(tags).where(and(eq(tags.userId, userId), eq(tags.name, name))).get();
      if (!tag) {
        [tag] = await db.insert(tags).values({
          userId,
          name: name,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        }).returning();
      }
      await db.insert(taskTags).values({ taskId: id, tagId: tag.id }).run();
    }
  }

  // 3. Fetch full updated task
  const taskWithTags = await db
    .select({ task: tasks, tag: tags })
    .from(tasks)
    .leftJoin(taskTags, eq(tasks.id, taskTags.taskId))
    .leftJoin(tags, eq(taskTags.tagId, tags.id))
    .where(eq(tasks.id, id))
    .all();

  const finalTask = taskWithTags.reduce((acc, curr) => {
    if (!acc) acc = { ...curr.task, tags: [] };
    if (curr.tag) acc.tags.push(curr.tag);
    return acc;
  }, null as any);

  let userUpdate = null;
  if (isCompleting) {
    // 4. Automatically add "COMPLETED" tag
    const completedTagName = "COMPLETED";
    let completedTag = await db.select().from(tags).where(and(eq(tags.userId, userId), eq(tags.name, completedTagName))).get();
    if (!completedTag) {
      [completedTag] = await db.insert(tags).values({
        userId,
        name: completedTagName,
        color: "#10B981", // Emerald-500
      }).returning();
    }
    
    // Check if link already exists
    const existingLink = await db.select().from(taskTags).where(and(eq(taskTags.taskId, id), eq(taskTags.tagId, completedTag.id))).get();
    if (!existingLink) {
      await db.insert(taskTags).values({ taskId: id, tagId: completedTag.id }).run();
      finalTask.tags.push(completedTag);
    }

    const expReward = (updatedTaskRow.timeEstimation || 0) * 2;
    const coinReward = (updatedTaskRow.timeEstimation || 0) * 5;
    const user = await db.select().from(users).where(eq(users.id, userId)).get();
    
    if (user) {
      const newExp = user.experience + expReward;
      const newLevel = Math.floor(newExp / 100) + 1;
      const newCoins = user.coins + coinReward;
      
      // Streak Logic
      let newStreak = user.streak;
      const now = new Date();
      
      if (!user.lastStreakAt) {
        newStreak = 1;
      } else {
        const lastDate = new Date(user.lastStreakAt);
        const d1 = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
        const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const diffDays = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      }

      const newLongestStreak = Math.max(user.longestStreak || 0, newStreak);

      [userUpdate] = await db.update(users)
        .set({
          experience: newExp,
          level: newLevel,
          coins: newCoins,
          streak: newStreak,
          longestStreak: newLongestStreak,
          lastStreakAt: now.toISOString(),
        })
        .where(eq(users.id, userId))
        .returning();
    }
  }
    
  return c.json({ task: finalTask, user: userUpdate });
});

app.delete("/api/tasks/:id", async (c) => {
  const db = drizzle(c.env.db);
  const userId = c.get("userId");
  const id = parseInt(c.req.param("id"));
  
  // Cleanup taskTags first (cascading might not be set)
  await db.delete(taskTags).where(eq(taskTags.taskId, id)).run();
  
  const result = await db.delete(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .returning();
    
  if (result.length === 0) return c.json({ error: "Task not found" }, 404);
  return c.json({ success: true });
});

// Tags Endpoints
app.get("/api/tags", async (c) => {
  const db = drizzle(c.env.db);
  const userId = c.get("userId");
  const allTags = await db.select().from(tags).where(eq(tags.userId, userId)).all();
  return c.json(allTags);
});

export default app;
