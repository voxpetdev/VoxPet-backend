import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const specie = sqliteTable("specie", {
  specieID: integer("specieID").primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("createdAt").$defaultFn(() => Date.now()),
  updatedAt: integer("updatedAt").$defaultFn(() => Date.now())
})
