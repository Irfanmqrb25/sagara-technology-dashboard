import { pgTable } from "@/db/utils";
import { sql } from "drizzle-orm";
import { timestamp, varchar } from "drizzle-orm/pg-core";

import { generateId } from "@/lib/id";

export const students = pgTable("students", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  name: varchar("name", { length: 128 }).notNull().unique(),
  emailAddress: varchar("email_address", { length: 128 }),
  phoneNumber: varchar("phone_number", { length: 30 }).notNull(),
  instance: varchar("instance", {
    length: 128,
    enum: [
      "Telkom University",
      "University of Indonesia",
      "Gunadarma University",
      "Other",
    ],
  }).notNull(),
  password: varchar("password", { length: 128 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
