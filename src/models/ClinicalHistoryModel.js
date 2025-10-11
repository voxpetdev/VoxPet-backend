import { tursoApp } from '../turso.config.js'

class ClinicalHistoryModel {
    async getAll() {
        
        try {
            const query = await tursoApp.execute('SELECT * FROM medical_history')
            return { code: 200, records: query.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting medical history.' }
        }
    }

    async getById(medical_historyID) {
        try {
            const query = await tursoApp.execute({
                sql: 'SELECT * FROM medical_history WHERE medical_historyID = ?',
                args: [medical_historyID]
            })
            return res.rows.length > 0
                ? { code: 200, record: query.rows[0] }
                : { code: 404, message: 'medical history not found.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting medical history.' }
        }
    }

    async create(data) {
        const { medical_historyID, date, record_number, reason,  description, petID, observations} = data
        try {
            const loquesea = await tursoApp.execute({
                sql: `INSERT INTO medical_history 
                      (medical_historyID, date, record_number, reason,  description, petID, observations)
                      values (?, ?, ?, ?, ?, ?, ?)`,
                args: [medical_historyID, date, record_number, reason,  description, petID, observations]
            })
            console.log(loquesea)
            return { code: 200, message: 'medical history created successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating medical history.' }
        }
    }

    async update(medical_historyID, data) {
        const { reason, description, observations } = data
        try {
            await tursoApp.execute({
                sql: `UPDATE medical_history
                      SET reason = ?, description = ?, observations = ?
                      WHERE medical_historyID = ?`,
                args: [reason, description, observations, medical_historyID]
            })

            return { code: 201, message: 'medical history updated successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error updating  medical history' }
        }
    }

     async disable(medical_historyID) {
        try {
            await tursoApp.execute({
                sql: 'UPDATE medical_history SET status = SUSPENDED WHERE medical_historyID = ?',
                args: [medical_historyID]
            })
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling medical history.' }
        }
    }
}

export default new ClinicalHistoryModel()
