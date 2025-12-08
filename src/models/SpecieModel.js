import { db } from "../db/index.js"
import { specie } from "#src/db/Schemas/specieSchema.js"
import { eq } from "drizzle-orm"

class SpecieModel {
    async getAll() {
        try {
            const res = await db.select().from(specie)
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the specie." }
        }
    }
    
    async getById(specieID) {
        try {
            const res = await db.select().from(specie).where(eq(specie.specieID, specieID))
            return { code: 200, data: res[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the specieID." }
        }
    }

    async create(data) {
        try {
            const res = await db.insert(specie).values(data).returning()
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating the specie.' }
        }
    }

    async update(specieID, data) {
        try {
            const res = await db.update(specie).set({...data, updatedAt: Date.now()}).where(eq(specie.specieID, specieID)).returning()
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating specie." }
        }
    }

    async disable(specieID) {
    try {
        await db.update(specie).set({ status: "INACTIVE", updatedAt: Date.now() }).where(eq(specie.specieID, specieID))
        return { code: 200, message: "Specie disabled." };
    } catch (error) {
        console.log(error);
        return { code: 500, message: "Error disabling specie." };
    }
}
}

export default new SpecieModel()