import { tursoApp } from "#src/config/turso.config.js"

class SpecieModel {
    async getAll() {
        try {
            const res = await tursoApp.execute(`
        SELECT * FROM specie
            `)
            return { code: 200, data: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the specie." }
        }
    }
    
    async getById(specieID) {
        try {
            const res = await tursoApp.execute({
                sql: "SELECT * FROM specie WHERE specieID= ?",
                args: [specieID]
            })
            return { code: 200, data: res.rows[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the specieID." }
        }
    }

    async create(data) {
        const { name } = data
        try {
            await tursoApp.execute({
                sql: "INSERT INTO specie (name) values ( ?)",
                args: [ name]
            })

            return { code: 200, message: 'Specie created successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating the specie.' }
        }
    }

    async update(specieID, data) {
    try {
        const res = await tursoApp.execute({
            sql: "SELECT * FROM specie WHERE specieID = ?",
            args: [specieID]
        })

        if (res.rows.length < 1) {
            return { code: 404, message: "Specie not found." }
        }

        await tursoApp.execute({
            sql: "UPDATE specie SET name = ? WHERE specieID = ?",
            args: [data.name, specieID]
        })

        return { code: 200, message: "Specie updated successfully." }

    } catch (error) {
        console.error(error)
        return { code: 500, message: "Error updating specie." }
    }
}

   async disable(specieID) {
    try {
        await tursoApp.execute({
            sql: "DELETE FROM specie WHERE specieID = ?",
            args: [specieID]
        });

        return { code: 200, message: "Specie deleted." };
    } catch (error) {
        console.log(error);
        return { code: 500, message: "Error deleting specie." };
    }
}
}

export default new SpecieModel()