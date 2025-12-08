import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { specie } from "./specieSchema.js";

export const breed = sqliteTable("breed", {
  breedID: integer("breedID").primaryKey(),
  specieID: integer("specieID").notNull().references(() => specie.specieID),
  name: text("name").notNull(),
  createdAt: integer("createdAt").$defaultFn(() => Date.now()),
  updatedAt: integer("updatedAt").$defaultFn(() => Date.now())
})
