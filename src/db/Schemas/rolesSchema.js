import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { v4 } from "uuid"

export const roles = sqliteTable("roles", {
    roleID: text("roleID").primaryKey().$defaultFn(() => v4()),
    name: text("name").notNull()
})