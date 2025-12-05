import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { breed } from "./breedSchema.js";

export const pet = sqliteTable("pet", {
    petID: integer("petID").primaryKey(),
    name: text("name").notNull(),
    last_name: text("last_name"),
    weight: real("weight").notNull(),
    birthday: text("birthday").notNull(),
    breedID: integer("breedID").notNull().references(() => breed.breedID),
    genre: text("genre").notNull(),
    color: text("color"),
    status: text("status").default("ACTIVE"),
    createdAt: integer("createdAt").$defaultFn(() => Date.now()),
    updatedAt: integer("updatedAt").$defaultFn(() => Date.now())
});
