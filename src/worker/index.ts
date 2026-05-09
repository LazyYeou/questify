import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { tasks, tags, users, taskTags, quests, userQuests } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { getCookie, setCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";

type Bindings = {
  db: D1Database;
  cache: KVNamespace;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  JWT_SECRET: string;
};

type Variables = {
  userId: number;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Google OAuth
app.get("/api/auth/google", (c) => {
  const rawId = c.env.GOOGLE_CLIENT_ID || "dummy_id";
  const clientId = rawId.replace(/['"]/g, ""); // Remove accidental quotes
  
  const clientOrigin = c.req.query("origin");
  const forwardedHost = c.req.header("x-forwarded-host");
  const host = forwardedHost || c.req.header("host") || new URL(c.req.url).host;
  const protocol = c.req.header("x-forwarded-proto") || (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");
  
  const origin = clientOrigin || `${protocol}://${host}`;
  const redirectUri = `${origin}/api/auth/google/callback`;
  const state = btoa(redirectUri);
  
  if (clientId === "dummy_id") {
    return c.redirect(`${redirectUri}?code=dummy_code&state=${state}`);
  }
  
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile&prompt=select_account&state=${state}`;
  return c.redirect(url);
});

app.get("/api/auth/google/callback", async (c) => {
  const code = c.req.query("code");
  const state = c.req.query("state");
  if (!code) return c.json({ error: "No code provided" }, 400);

  const rawId = c.env.GOOGLE_CLIENT_ID || "dummy_id";
  const rawSecret = c.env.GOOGLE_CLIENT_SECRET || "dummy_secret";
  const clientId = rawId.replace(/['"]/g, "");
  const clientSecret = rawSecret.replace(/['"]/g, "");
  
  let redirectUri = "";
  if (state) {
    try {
      redirectUri = atob(state);
    } catch {
      // Ignore
    }
  }

  if (!redirectUri) {
    const forwardedHost = c.req.header("x-forwarded-host");
    const host = forwardedHost || c.req.header("host") || new URL(c.req.url).host;
    const protocol = c.req.header("x-forwarded-proto") || (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");
    const origin = `${protocol}://${host}`;
    redirectUri = `${origin}/api/auth/google/callback`;
  }

  // Exchange code for token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = (await tokenRes.json()) as any;
  if (!tokenRes.ok) {
    if (clientId === "dummy_id") {
      tokenData.access_token = "dummy_access_token";
    } else {
      return c.json(tokenData, 400);
    }
  }

  let userData: any = { email: "dummy@example.com", picture: "" };
  if (tokenData.access_token !== "dummy_access_token") {
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    userData = await userRes.json();
  }

  const db = drizzle(c.env.db);
  let existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, userData.email))
    .get();

  if (!existingUser) {
    [existingUser] = await db
      .insert(users)
      .values({
        email: userData.email,
        avatarUrl: userData.picture || null,
      })
      .returning();
  }

  const payload = {
    userId: existingUser.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
  };
  const secret = (c.env.JWT_SECRET || "fallback_secret").replace(/['"]/g, "");
  const token = await sign(payload, secret);

  const isSecure = new URL(c.req.url).protocol === "https:";

  setCookie(c, "auth_token", token, {
    path: "/",
    httpOnly: true,
    secure: isSecure,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "Lax",
  });

  return c.redirect("/");
});

app.post("/api/auth/logout", (c) => {
  setCookie(c, "auth_token", "", {
    path: "/",
    httpOnly: true,
    secure: c.req.url.startsWith("https"),
    maxAge: 0,
    sameSite: "Lax",
  });
  return c.json({ success: true });
});

// Guest Login (Alternative)
app.post("/api/auth/guest", async (c) => {
  const db = drizzle(c.env.db);
  
  const guestEmail = `guest_${crypto.randomUUID()}@questify.local`;

  const [guestUser] = await db
    .insert(users)
    .values({
      email: guestEmail,
      name: null, // Forces UsernameModal to appear
      avatarUrl: null,
    })
    .returning();

  const payload = {
    userId: guestUser.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
  };
  const secret = (c.env.JWT_SECRET || "fallback_secret").replace(/['"]/g, "");
  const token = await sign(payload, secret);

  setCookie(c, "auth_token", token, {
    path: "/",
    httpOnly: true,
    secure: c.req.url.startsWith("https"),
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "Lax",
  });

  return c.json({ success: true });
});

// Auth Middleware
app.use("/api/*", async (c, next) => {
  if (c.req.path.startsWith("/api/auth")) {
    return next();
  }

  const token = getCookie(c, "auth_token");
  if (!token) {
    if (c.req.method === "GET" && c.req.path === "/api/users/me") {
      return c.json(null, 200);
    }
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET || "fallback_secret");
    c.set("userId", payload.userId as number);
    await next();
  } catch {
    if (c.req.method === "GET" && c.req.path === "/api/users/me") {
      return c.json(null, 200);
    }
    return c.json({ error: "Unauthorized" }, 401);
  }
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

app.put("/api/users/me", async (c) => {
  const db = drizzle(c.env.db);
  const userId = c.get("userId");
  const body = await c.req.json();
  const { name, avatarUrl } = body;

  const [updatedUser] = await db
    .update(users)
    .set({ name, avatarUrl })
    .where(eq(users.id, userId))
    .returning();

  return c.json(updatedUser);
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
      const newLevel = getLevelFromExp(newExp);
      const newCoins = user.coins + coinReward;
      const newWeeklyMinutes = (user.weeklyMinutes || 0) + (updatedTaskRow.timeEstimation || 0);
      
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
          weeklyMinutes: newWeeklyMinutes,
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

// Quest Endpoints
app.get("/api/quests", async (c) => {
  const db = drizzle(c.env.db);
  const userId = c.get("userId");

  const allQuests = await db.select().from(quests).all();
  const userClaims = await db.select().from(userQuests).where(eq(userQuests.userId, userId)).all();

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  
  // Start of week (Monday) - Immutable calculation
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Adjust to Monday
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfWeekISO = startOfWeek.toISOString();

  // Fetch tasks for progress calculation
  const completedTasks = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.userId, userId), eq(tasks.status, "completed")))
    .all();

  const questProgress = allQuests.map((q) => {
    const periodStart = q.type === "daily" ? startOfDay : startOfWeekISO;
    
    // Filter tasks in current period
    const tasksInPeriod = completedTasks.filter(t => t.updatedAt && t.updatedAt >= periodStart);
    
    let progress = 0;
    if (q.goalType === "tasks") {
      progress = tasksInPeriod.length;
    } else if (q.goalType === "minutes") {
      progress = tasksInPeriod.reduce((acc, t) => acc + (t.timeEstimation || 0), 0);
    }

    const claim = userClaims.find(uc => uc.questId === q.id);
    const isClaimedInPeriod = claim && claim.lastClaimedAt && claim.lastClaimedAt >= periodStart;

    return {
      ...q,
      currentProgress: progress,
      isCompleted: progress >= q.goalValue,
      isClaimed: !!isClaimedInPeriod,
    };
  });

  return c.json(questProgress);
});

function getLevelFromExp(totalExp: number) {
  let level = 1;
  let xpInLevel = totalExp;
  let nextLevelReq = 10;
  
  while (xpInLevel >= nextLevelReq) {
    xpInLevel -= nextLevelReq;
    level++;
    nextLevelReq = Math.floor(10 * Math.pow(1.3, level - 1));
  }
  
  return level;
}

app.post("/api/quests/:id/claim", async (c) => {
  const db = drizzle(c.env.db);
  const userId = c.get("userId");
  const questId = c.req.param("id");

  const quest = await db.select().from(quests).where(eq(quests.id, questId)).get();
  if (!quest) return c.json({ error: "Quest not found" }, 404);

  // Re-calculate progress to be safe
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const startOfWeek = new Date(now.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfWeekISO = startOfWeek.toISOString();
  
  const periodStart = quest.type === "daily" ? startOfDay : startOfWeekISO;

  const claim = await db
    .select()
    .from(userQuests)
    .where(and(eq(userQuests.userId, userId), eq(userQuests.questId, questId)))
    .get();

  if (claim && claim.lastClaimedAt && claim.lastClaimedAt >= periodStart) {
    return c.json({ error: "Already claimed for this period" }, 400);
  }

  const completedTasks = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.userId, userId), eq(tasks.status, "completed")))
    .all();

  const tasksInPeriod = completedTasks.filter(t => t.updatedAt && t.updatedAt >= periodStart);
  
  let progress = 0;
  if (quest.goalType === "tasks") {
    progress = tasksInPeriod.length;
  } else if (quest.goalType === "minutes") {
    progress = tasksInPeriod.reduce((acc, t) => acc + (t.timeEstimation || 0), 0);
  }

  if (progress < quest.goalValue) {
    return c.json({ error: "Quest not completed" }, 400);
  }

  // Update claim
  const claimTime = new Date().toISOString();
  if (claim) {
    await db.update(userQuests)
      .set({ lastClaimedAt: claimTime })
      .where(and(eq(userQuests.userId, userId), eq(userQuests.questId, questId)))
      .run();
  } else {
    await db.insert(userQuests)
      .values({ userId, questId, lastClaimedAt: claimTime })
      .run();
  }

  // Award rewards
  const user = await db.select().from(users).where(eq(users.id, userId)).get();
  if (user) {
    const newExp = user.experience + quest.rewardExp;
    const newLevel = getLevelFromExp(newExp);
    const newCoins = user.coins + quest.rewardCoins;

    const [updatedUser] = await db.update(users)
      .set({
        experience: newExp,
        level: newLevel,
        coins: newCoins,
      })
      .where(eq(users.id, userId))
      .returning();

    return c.json({ success: true, user: updatedUser });
  }

  return c.json({ success: true });
});

// Update in task completion as well
// app.put("/api/tasks/:id", ...) 
// I need to find the task update endpoint logic and replace newLevel calculation there too.


// Leaderboard Endpoints
app.get("/api/leaderboard", async (c) => {
  // Force refresh for now to ensure cache doesn't serve old fox icons
  const data = await refreshLeaderboard(c.env.db);
  await c.env.cache.put("leaderboard", JSON.stringify(data), { expirationTtl: 60 });
  return c.json(data);
});

async function refreshLeaderboard(d1: D1Database) {
  const db = drizzle(d1);
  const allUsers = await db.select().from(users).all();
  
  const allTime = [...allUsers]
    .sort((a, b) => b.experience - a.experience)
    .slice(0, 10)
    .map((u, i) => ({
      id: u.id.toString(),
      name: u.name || "Unknown Hero",
      level: u.level,
      xp: u.experience,
      minutesSpent: u.weeklyMinutes,
      avatar: (u.avatarUrl && u.avatarUrl !== "🦊") ? u.avatarUrl : "",
      rank: i + 1
    }));

  const weekly = [...allUsers]
    .sort((a, b) => b.weeklyMinutes - a.weeklyMinutes)
    .slice(0, 10)
    .map((u, i) => ({
      id: u.id.toString(),
      name: u.name || "Unknown Hero",
      level: u.level,
      xp: u.experience,
      minutesSpent: u.weeklyMinutes,
      avatar: (u.avatarUrl && u.avatarUrl !== "🦊") ? u.avatarUrl : "",
      rank: i + 1
    }));

  return { allTime, weekly };
}

export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: Bindings) {
    const db = drizzle(env.db);
    
    // 1. Weekly Reset check (Sunday 23:59)
    if (event.cron === "59 23 * * SUN") {
      await db.update(users).set({ weeklyMinutes: 0 }).run();
    }
    
    // 2. Hourly Refresh
    const data = await refreshLeaderboard(env.db);
    await env.cache.put("leaderboard", JSON.stringify(data), { expirationTtl: 3600 });
  }
};
