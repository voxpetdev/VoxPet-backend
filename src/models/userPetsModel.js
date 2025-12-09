import { db } from "#src/db/index.js"
import { usersPet } from "#src/db/Schemas/userPetsSchema.js"

class UserPetsModel {
    async getAll() {
        try {
            const res = await db.select().from(usersPet)
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the pet owners." }
        }
    }
    
    async getById(users_petsID) {
        try {
            const res = await db.select().from(usersPet).where(eq(usersPet.users_petsID, users_petsID))
            return { code: 200, data: res[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting pet owner" }
        }
    }

    async create(data) {
        try {
            const res = await db.insert(usersPet).values(data).returning()
            return { user_pet: res[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating pet owner.' }
        }
    }

    async update(users_petsID, data) {
        try {
            const res = await db.update(usersPet).set({...data, updatedAt: Date.now()}).where(eq(usersPet.users_petsID, users_petsID)).returning()
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating pet owner." }
        }
    }

    async disable(users_petsID) {
        try {
            await db.update(usersPet).set({ status: "INACTIVE", updatedAt: Date.now() }).where(eq(usersPet.users_petsID, users_petsID))
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling owner.' }
        }
    }

}

export default new UserPetsModel()