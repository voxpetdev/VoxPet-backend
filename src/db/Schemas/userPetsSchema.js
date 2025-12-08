import { sqliteTable, integer, text} from "drizzle-orm/sqlite-core";
import { pet } from "./petSchema.js";
import { users } from "./usersSchema.js";

export const usersPet = sqliteTable("users_pets", {
    users_petsID: integer("users_petsID").primaryKey(),
    userID: integer("userID").notNull().references(() => users.userID),
    petID: integer("petID").notNull().references(() => pet.petID),
    status: text("status").notNull(),
    createdAt: integer("createdAt").$defaultFn(() => Date.now()),
    updatedAt: integer("updatedAt").$defaultFn(() => Date.now())
})
