import { tursoApp } from "#src/config/turso.config.js"

class BreedModel {
    async getAll() {
        try {
            const res = await tursoApp.execute(`
        SELECT * FROM breed
            `)
            return { code: 200, data: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the breed." }
        }
    }
    
    async getById(breedID) {
        try {
            const res = await tursoApp.execute({
                sql: "SELECT * FROM breed WHERE breedID= ?",
                args: [breedID]
            })
            return { code: 200, data: res.rows[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the breedID." }
        }
    }

    async create(data) {
        const { specieID, name } = data
        try {
            await tursoApp.execute({
                sql: "INSERT INTO breed (specieID, name) values (?, ?)",
                args: [ specieID, name]
            })

            return { code: 200, message: 'breed created successfully.'
            }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating the breed.' }
        }
    }

    async update(breedID, data) {
    try {
        const { specieID, name } = data

        const res = await tursoApp.execute({
            sql: "SELECT * FROM breed WHERE breedID = ?",
            args: [breedID]
        })

        if (res.rows.length < 1) {
            return { code: 404, message: "Breed not found." }
        }

        await tursoApp.execute({
            sql: "UPDATE breed SET specieID = ?, name = ? WHERE breedID = ?",
            args: [specieID, name, breedID]
        })

        return { code: 200, message: "Breed updated successfully." }

    } catch (error) {
        console.error(error)
        return { code: 500, message: "Error updating breed." }
    }
}

   async disable(breedID) {
    try {
        await tursoApp.execute({
            sql: "DELETE FROM breed WHERE breedID = ?",
            args: [breedID]
        });

        return { code: 200, message: "breed deleted." };
    } catch (error) {
        console.log(error);
        return { code: 500, message: "Error deleting breed." };
    }
}
}

export default new BreedModel()