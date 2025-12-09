import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { pet } from "./petSchema.js";
import { users } from "./usersSchema.js";

export const appointments = sqliteTable("appointments", {
    appointmentID: integer("appointmentID").primaryKey(),
    date: text("date").notNull(),
    consultation: text("consultation"),
    place: text("place"),
    observations: text("observations"),
    petID: integer("petID").notNull().references(() => pet.petID),
    userID: text("userID").notNull().references(() => users.userID),
    status: text("status").notNull(),
    createdAt: integer("createdAt").$defaultFn(() => Date.now()),
    updatedAt: integer("updatedAt").$defaultFn(() => Date.now())
})
