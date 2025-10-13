import { tursoApp } from '../turso.config.js'

class ClinicalHistoryModel {
    async getAll() {
        try {
            const res = await tursoApp.execute('SELECT * FROM historia_clinica')
            return { code: 200, records: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting clinical histories.' }
        }
    }

    async getById(clinicalHistoryID) {
        try {
            const res = await tursoApp.execute({
                sql: 'SELECT * FROM historia_clinica WHERE clinicalHistoryID = ?',
                args: [clinicalHistoryID]
            })
            return res.rows.length > 0
                ? { code: 200, record: res.rows[0] }
                : { code: 404, message: 'Clinical history not found.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting clinical history.' }
        }
    }

    async create(data) {
        const { clinicalHistoryID, fecha, radicado, motivo, descripcion, mascotaID, observaciones } = data
        try {
            await tursoApp.execute({
                sql: `INSERT INTO historia_clinica 
                      (clinicalHistoryID, fecha, radicado, motivo, descripcion, mascotaID, observaciones)
                      VALUES (?, ?, ?, ?, ?, ?, ?)`,
                args: [clinicalHistoryID, fecha, radicado, motivo, descripcion, mascotaID, observaciones]
            })

            return { code: 200, message: 'Clinical history created successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating clinical history.' }
        }
    }

    async update(clinicalHistoryID, data) {
        const { fecha, radicado, motivo, descripcion, mascotaID, observaciones } = data
        try {
            await tursoApp.execute({
                sql: `UPDATE historia_clinica 
                      SET fecha = ?, radicado = ?, motivo = ?, descripcion = ?, mascotaID = ?, observaciones = ?
                      WHERE clinicalHistoryID = ?`,
                args: [fecha, radicado, motivo, descripcion, mascotaID, observaciones, clinicalHistoryID]
            })

            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error updating clinical history.' }
        }
    }

    async delete(clinicalHistoryID) {
        try {
            await tursoApp.execute({
                sql: 'DELETE FROM historia_clinica WHERE clinicalHistoryID = ?',
                args: [clinicalHistoryID]
            })
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error deleting clinical history.' }
        }
    }
}

export default new ClinicalHistoryModel()
