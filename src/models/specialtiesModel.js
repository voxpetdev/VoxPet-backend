import { db } from "#src/db/index.js"
import { specialties } from "#src/db/Schemas/specialtiesSchema.js"
import { eq } from "drizzle-orm"

class specialtiesModel {
    async getAll() {
        try {
            const res = await db.select().from(specialties)
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting specialties." }
        }
    }
    
    async getById(specialtyID) {
        try {
            const res = await db.select().from(specialties).where(eq(specialties.specialtyID, specialtyID))
            return { code: 200, data: res[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting specialty" }
        }
    }

    async create(data) {
        try {
            const res = await db.insert(specialties).values(data).returning()

            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating specialty.' }
        }
    }

    async update(specialtyID, data) {
        try {
            const res = await db.update(specialties).set(data).where(eq(specialties.specialtyID, specialtyID)).returning()
            return { code: 200, data: res }

        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating." }
        }
    }

    async disable( specialtyID) {
        try {
            await db.update(specialties).set({ status: "INACTIVE", updatedAt: Date.now() }).where(eq(specialties.specialtyID, specialtyID))
            return { code: 200, message: "Specialty disabled." }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling specialty.' }
        }
    }

}

export default new specialtiesModel()