import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { roles } from "./rolesSchema.js"
import { specialties } from "./specialtiesSchema.js"
import { v4 } from "uuid"

export const users = sqliteTable('users', {
    userID: text("userID").primaryKey().$defaultFn(() => v4()),
    name: text("name").notNull(),
    last_name: text("last_name").notNull(),
    email: text("email").unique().notNull(),
    documentType: text("documentType"),
    document: integer("document"),
    roleID: text("roleID").notNull().references(() => roles.roleID),
    specialtyID: text("specialtyID").references(() => specialties.specialtyID),
    phone: text("phone").notNull(),
    address: text("address"),
    status: text("status").default("INACTIVE"),
    createdAt: integer("createdAt").$defaultFn(() => Date.now()),
    updatedAt: integer("updatedAt").$defaultFn(() => Date.now())
})