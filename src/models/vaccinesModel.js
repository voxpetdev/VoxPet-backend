import { tursoApp } from '../turso.config.js'

class vaccinesModel {
    async getAll() {
        
        try {
            const query = await tursoApp.execute('SELECT * FROM vaccines')
            return { code: 200, records: query.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting vaccines.' }
        }
    }

    async getById(vaccineID) {
        try {
            const query = await tursoApp.execute({
                sql: 'SELECT * FROM vaccines WHERE vaccineID = ?',
                args: [vaccineID]
            })
            return res.rows.length > 0
                ? { code: 200, record: query.rows[0] }
                : { code: 404, message: 'vaccine not found.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting vaccine.' }
        }
    }

    async create(data) {
        const { vaccineID, medical_historyID, vaccine_name, description,  application_date, next_date, dosage, observations} = data
        try {
            const loquesea = await tursoApp.execute({
                sql: `INSERT INTO vaccines 
                      (vaccineID, medical_historyID, vaccine_name, description,  application_date, next_date, dosage, observations)
                      values (?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [vaccineID, medical_historyID, vaccine_name, description,  application_date, next_date, dosage, observations]
            })
            console.log(loquesea)
            return { code: 200, message: 'vaccines created successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating vaccines.' }
        }
    }

    async update(vaccineID, data) {
        const { vaccine_name, description, next_date, dosage, observations } = data
        try {
            await tursoApp.execute({
                sql: `UPDATE vaccines
                      SET vaccine_name = ?, description = ?, next_date = ?, dosage = ?, observations = ?
                      WHERE vaccineID = ?`,
                args: [vaccine_name, description, next_date, dosage, observations, vaccineID]
            })

            return { code: 201, message: 'Vaccine updated successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error updating vaccine.' }
        }
    }

     async disable(vaccineID) {
        try {
            await tursoApp.execute({
                sql: 'UPDATE vaccines SET status = SUSPENDED WHERE vaccineID = ?',
                args: [vaccineID]
            })
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling vaccine.' }
        }
    }
}

export default new (vaccinesModel)
