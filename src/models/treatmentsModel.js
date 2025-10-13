import { tursoApp } from '../turso.config.js'

class treatmentsModel {
    async getAll() {
        
        try {
            const query = await tursoApp.execute('SELECT * FROM treatments')
            return { code: 200, records: query.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting treatments.' }
        }
    }

    async getById(treatmentID) {
        try {
            const query = await tursoApp.execute({
                sql: 'SELECT * FROM treatments WHERE treatmentID = ?',
                args: [treatmentID]
            })
            return res.rows.length > 0
                ? { code: 200, record: query.rows[0] }
                : { code: 404, message: 'treatments not found.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting treatments.' }
        }
    }

    async create(data) {
        const { medical_historyID, treatment_name, description, start_date,  end_date, dosage, frequency, observations} = data
        try {
            const loquesea = await tursoApp.execute({
                sql: `INSERT INTO treatments 
                      ( medical_historyID, treatment_name, description, start_date,  end_date, dosage, frequency, observations)
                      values (?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [medical_historyID, treatment_name, description, start_date,  end_date, dosage, frequency, observations]
            })
            console.log(loquesea)
            return { code: 200, message: 'treatments created successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating treatments.' }
        }
    }

    async update(treatmentID, data) {
        const { treatment_name, description, end_date, dosage, frequency, observations } = data
        try {
            await tursoApp.execute({
                sql: `UPDATE treatments
                  SET treatment_name = ?, description = ?, end_date = ?, dosage = ?, frequency = ?, observations = ?
                  WHERE treatmentID = ?`,
                args: [treatment_name, description, end_date, dosage, frequency, observations, treatmentID]
            })

            return { code: 201, message: 'treatments updated successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error updating  treatments.' }
        }
    }

     async disable(treatmentID) {
        try {
            await tursoApp.execute({
                sql: 'UPDATE treatments SET status = SUSPENDED WHERE treatmentID = ?',
                args: [treatmentID]
            })
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling treatments.' }
        }
    }
}

export default new treatmentsModel()
