import { db } from "../db/index.js"
import { breed } from "#src/db/Schemas/breedSchema.js"
import { eq } from "drizzle-orm"

class BreedModel {
    async getAll() {
        try {
            const res = await db.select().from(breed)
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the breed." }
        }
    }
    
    async getById(breedID) {
        try {
            const res = await db.select().from(breed).where(eq(breed.breedID, breedID))
            return { code: 200, data: res[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the breedID." }
        }
    }

    async create(data) {
        try {
            const res = await db.insert(breed).values(data).returning()

            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating the breed.' }
        }
    }

    async update(breedID, data) {
    try {
        const res = await db.update(breed).set(data).where(eq(breed.breedID, breedID)).returning()
        return { code: 200, data: res }
    } catch (error) {
        console.error(error)
        return { code: 500, message: "Error updating breed." }
    }
}

   async disable(breedID) {
    try {
        await db.update(breed).set({ status: "INACTIVE", updatedAt: Date.now() }).where(eq(breed.breedID, breedID))
        return { code: 200, message: "breed disabled." };
    } catch (error) {
        console.log(error);
        return { code: 500, message: "Error disabling breed." };
    }
}
}

export default new BreedModel()