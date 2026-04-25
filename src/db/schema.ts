import { sqliteTable, text, integer, primaryKey, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  experience: integer("experience").notNull().default(0),
  level: integer("level").notNull().default(1),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: ["pending", "in-progress", "completed"] }).notNull().default("pending"),
  timeEstimation: integer("time_estimation").notNull().default(0),
  dueDate: text("due_date"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  color: text("color").notNull().default("#000000"),
}, (t) => ({
  uniqueTagName: uniqueIndex("unique_tag_name").on(t.userId, t.name),
}));

export const taskTags = sqliteTable("task_tags", {
  taskId: integer("task_id").notNull().references(() => tasks.id),
  tagId: integer("tag_id").notNull().references(() => tags.id),
}, (t) => ({
  pk: primaryKey({ columns: [t.taskId, t.tagId] }),
}));
