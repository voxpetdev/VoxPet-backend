import { tursoApp } from "#src/config/turso.config.js"

class MedicalHistoryModel {
    async getAll() {
        try {
            const res = await tursoApp.execute(`
        SELECT * FROM medical_history
            `)
            return { code: 200, data: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the medical_history." }
        }
    }
    
    async getById(medical_historyID) {
        try {
            const res = await tursoApp.execute({
                sql: "SELECT * FROM medical_history WHERE medical_historyID= ?",
                args: [medical_historyID]
            })
            return { code: 200, data: res.rows[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the medical history" }
        }
    }

    async create(data) {
        const { date, record_number,  reason, description, petID,  observations, status} = data
        try {
            await tursoApp.execute({
                sql: "INSERT INTO medical_history (date, record_number,  reason, description, petID,  observations, status) values (?, ?, ?, ?, ?, ?, ?)",
                args: [date, record_number,  reason, description, petID,  observations, status]
            })

            return { code: 200, message: 'Created successfully.'
            }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating .' }
        }
    }

    async update(medical_historyID, data) {
        try {
            const { date, record_number,  reason, description, petID,  observations, status} = data

            const res = await tursoApp.execute({
                sql: "SELECT * FROM medical_history WHERE medical_historyID = ?",
                args: [medical_historyID]
            })

            await tursoApp.execute({
                sql: "UPDATE medical_history SET date=?, record_number=?,  reason=?, description=?, petID=?,  observations=?, status=? WHERE medical_historyID = ?",
                args: [date, record_number,  reason, description, petID,  observations, status, medical_historyID]
            })

            return { code: 200, message: " updated successfully." }

        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating." }
        }
    }

    async disable( medical_historyID) {
        try {
            await tursoApp.execute({
                sql: "UPDATE medical_history SET status = 'INACTIVE' WHERE medical_historyID = ?",
                args: [ medical_historyID]
            })
            return { code: 200 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling.' }
        }
    }

}

export default new MedicalHistoryModel()