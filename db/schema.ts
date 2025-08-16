import { pgTable, serial, text, varchar, integer, boolean, timestamp, date, uuid } from "drizzle-orm/pg-core";

// 1. Usuarios (BetterAuth espera "user" no "users")
export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").default(false),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Sesiones (BetterAuth espera "session" no "sessions")
export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Verificaciones de email (BetterAuth espera "emailVerification" no "emailVerifications")
export const emailVerification = pgTable("emailVerification", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Categorías de hábitos
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  color: varchar("color", { length: 7 }).default("#3B82F6"), // Color hex
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Hábitos
export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" }),
  frequency: varchar("frequency", { length: 50 }).default("daily"), // daily, weekly, custom
  targetDays: integer("target_days").default(1), // Para hábitos semanales
  isArchived: boolean("is_archived").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 6. Registros diarios de hábitos
export const habitLogs = pgTable("habit_logs", {
  id: serial("id").primaryKey(),
  habitId: integer("habit_id").references(() => habits.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  date: date("date").notNull(),
  completed: boolean("completed").default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 7. Rachas de hábitos (streaks)
export const streaks = pgTable("streaks", {
  id: serial("id").primaryKey(),
  habitId: integer("habit_id").references(() => habits.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastCompletedDate: date("last_completed_date"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Índices para mejorar el rendimiento
export const habitLogsDateIndex = habitLogs.date;
export const habitLogsHabitIdIndex = habitLogs.habitId;
export const habitsUserIdIndex = habits.userId;
export const categoriesUserIdIndex = categories.userId;

