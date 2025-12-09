import userPetsModel from "./userPetsModel.js"
import { usersPet } from "#src/db/Schemas/userPetsSchema.js"
import { pet } from "#src/db/Schemas/petSchema.js"
import { db } from "../db/index.js"
import { eq } from "drizzle-orm"

class PetModel {
    async getAll(userID) {
        try {
            const res = await db
                .select()
                .from(usersPet).innerJoin(pet, eq(usersPet.petID, pet.petID))
                .where(eq(usersPet.userID, userID))
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the pet." }
        }
    }
    
    async getById(petID, userID) {
        try {
            const res = await db.select().from(pet).where(eq(pet.petID, petID))
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the petID." }
        }
    }

    async create(data, userID) {
        try {
            const newPet = await db.insert(pet).values(data).returning()
            const petOwner = await userPetsModel.create({userID: userID, petID: newPet[0].petID})

            return { code: 200, data: [newPet[0], petOwner] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating pet.' }
        }
    }

    async update(petID, data) {
        try {
            const res = await db.update(pet).set({...data, updatedAt: Date.now()}).where(eq(pet.petID, petID)).returning()
            return { code: 200, data: res }

        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating pet." }
        }
    }

    async disable(petID) {
        try {
            await db.update(pet).set({ status: "INACTIVE", updatedAt: Date.now() }).where(eq(pet.petID, petID))
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return {
                code: 500, message: "Error interno del servicio"
            }
        }
    }

}

export default new PetModel()