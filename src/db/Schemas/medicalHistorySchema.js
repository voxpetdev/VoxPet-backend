import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { pet } from "./petSchema.js";
    
export const medicalHistory = sqliteTable("medical_history", {
  medical_historyID: integer("medical_historyID").primaryKey(),
  date: text("date").notNull(),
  record_number: text("record_number").notNull(),
  reason: text("reason"),
  description: text("description"),
  petID: integer("petID").notNull().references(() => pet.petID),
  observations: text("observations"),
  status: text("status").notNull(),
  createdAt: integer("createdAt").$defaultFn(() => Date.now()),
  updatedAt: integer("updatedAt").$defaultFn(() => Date.now())
});
