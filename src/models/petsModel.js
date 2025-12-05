import { pet } from "#src/db/Schemas/petSchema.js"
import { db } from "../db/index.js"
import { eq } from "drizzle-orm"

class PetModel {
    async getAll() {
        try {
            const res = await db.select().from(pet)
            console.log(res)
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the pet." }
        }
    }
    
    async getById(petID) {
        try {
            const res = await db.select().from(pet).where(eq(pet.petID, petID))
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the petID." }
        }
    }

    async create(data) {
        try {
            await db.insert(pet).values(data)
            return { code: 200, data }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating  pet.' }
        }
    }

    async update(petID, data) {
        try {
            await db.update(pet).set(data).where(eq(pet.petID, petID))

            return { code: 200, message: "pet updated successfully." }

        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating pet." }
        }
    }

    async disable(petID) {
        try {
            const res = await db.update(pet).set({ status: "INACTIVE" }).where(eq(pet.petID, petID))
            if (res.rowsAffected < 1) {
                return { code: 404, message: "La mascota no se encuentra o no existe" }
            }
            return { code: 200, message: "Mascota inhabilitada" }
        } catch (error) {
            console.error(error)
            return {
                code: 500, message: "Error interno del servicio"
            }
        }
    }

}

export default new PetModel()