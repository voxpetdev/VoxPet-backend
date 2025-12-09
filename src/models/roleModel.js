import { db } from "../db/index.js"
import { roles } from "#src/db/Schemas/rolesSchema.js"
import { eq } from "drizzle-orm"

class roleModel {
    async getAll() {
        try {
            const res = await db.select().from(roles)
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting roles." }
        }
    }

    async getById(roleID) {
        try {
            const res = await db.select().from(roles).where(eq(roles.roleID, roleID))
            return { code: 200, data: res[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the role." }
        }
    }
}

export default new roleModel()