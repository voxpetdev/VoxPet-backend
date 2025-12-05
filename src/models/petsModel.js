import { tursoApp } from "#src/config/turso.config.js"
import { pet } from "#src/db/Schemas/petSchema.js"
import { db } from "../db/index.js"
import { eq } from "drizzle-orm"

class PetModel {
    async getAll() {
        try {
            const res = await tursoApp.execute(`
        SELECT * FROM pet
            `)
            return { code: 200, data: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the pet." }
        }
    }
    
    async getById(petID) {
        try {
            const res = await tursoApp.execute({
                sql: "SELECT * FROM pet WHERE petID= ?",
                args: [petID]
            })
            return { code: 200, data: res.rows[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the petID." }
        }
    }

    async create(data) {
        const { name, last_name, weight, birthday, breedID, genre, color } = data
        try {
            await tursoApp.execute({
                sql: "INSERT INTO pet ( name, last_name, weight, birthday, breedID, genre, color) values (?, ?, ?, ?, ?, ?, ?)",
                args: [ name, last_name, weight, birthday, breedID, genre, color]
            })

            return { code: 200, message: 'pet created successfully.'
            }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating  pet.' }
        }
    }

    async update(petID, data) {
        try {
            const { name, last_name, weight, birthday, breedID, genre, color } = data

            const res = await tursoApp.execute({
                sql: "SELECT * FROM pet WHERE petID = ?",
                args: [petID]
            })

            if (res.rows.length < 1) {
                return { code: 404, message: "pet not found." }
            }

            await tursoApp.execute({
                sql: "UPDATE pet SET name = ?, last_name= ?, weight = ?, birthday = ?, breedID = ?, genre = ?, color = ? WHERE petID = ?",
                args: [name, last_name, weight, birthday, breedID, genre, color, petID]
            })

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