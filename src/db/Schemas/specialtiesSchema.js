import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { v4 } from "uuid"

export const specialties = sqliteTable('specialties', {
    specialtyID: text("specialtyID").primaryKey().$defaultFn(() => v4()),
    name: text("name").notNull()
})