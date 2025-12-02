import { tursoApp } from "#src/config/turso.config.js"

class specialtiesModel {
    async getAll() {
        try {
            const res = await tursoApp.execute(`
        SELECT * FROM specialties
            `)
            return { code: 200, data: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the pet." }
        }
    }
    
    async getById(specialtyID) {
        try {
            const res = await tursoApp.execute({
                sql: "SELECT * FROM specialties WHERE specialtyID= ?",
                args: [specialtyID]
            })
            return { code: 200, data: res.rows[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the specialty" }
        }
    }

    async create(data) {
        const { name, status } = data
        try {
            await tursoApp.execute({
                sql: "INSERT INTO specialties ( name, status) values (?, ?)",
                args: [name, status]
            })

            return { code: 200, message: 'Created successfully.'
            }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating .' }
        }
    }

    async update(specialtyID, data) {
        try {
            const { name, status} = data

            const res = await tursoApp.execute({
                sql: "SELECT * FROM specialties WHERE specialtyID = ?",
                args: [specialtyID]
            })

            await tursoApp.execute({
                sql: "UPDATE specialties SET name = ?, status= ? WHERE specialtyID = ?",
                args: [name,status, specialtyID]
            })

            return { code: 200, message: " updated successfully." }

        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating." }
        }
    }

    async disable( specialtyID) {
        try {
            await tursoApp.execute({
                sql: "UPDATE specialties SET status = 'INACTIVE' WHERE specialtyID = ?",
                args: [ specialtyID]
            })
            return { code: 200 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling.' }
        }
    }

}

export default new specialtiesModel()