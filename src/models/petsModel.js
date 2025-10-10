import { tursoApp } from '../turso.config.js'

class petsModel {
    async getAll() {
        const db = await tursoApp
        try {
            const res = await tursoApp.execute('SELECT * FROM mascotas')
            return { code: 200, records: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting pets.' }
        }
    }

    async getById(mascotasID) {
        const db = await tursoApp
        try {
            const res = await tursoApp.execute({
                sql: 'SELECT * FROM mascotas WHERE mascotasID = ?',
                args: [mascotasID]
            })
            return res.rows.length > 0
                ? { code: 200, record: res.rows[0] }
                : { code: 404, message: 'Pets not found.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting Pets.' }
        }
    }

    async create(data) {
        const db = await tursoApp
        const { mascotasID, nombre, apellido, peso,  fecha_nacimiento, especieID, razaID, sexoID, color} = data
        try {
            await tursoApp.execute({
                sql: `INSERT INTO mascotas 
                      (mascotasID, nombre, apellido, peso, fecha_nacimiento, especieID, razaID, sexoID, color)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [mascotasID, nombre, apellido, peso, fecha_nacimiento, especieID, razaID, sexoID, color]
            })

            return { code: 200, message: 'Pet created successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating pet.' }
        }
    }

    async update(mascotasID, data) {
        const db = await tursoApp
        const { nombre, apellido, peso, color } = data
        try {
            await tursoApp.execute({
                sql: `UPDATE mascotas
                      SET nombre = ?, apellido = ?, peso = ?, color = ?
                      WHERE mascotasID = ?`,
                args: [nombre, apellido, peso, color, mascotasID]
            })

            return { code: 201, message: 'Pet updated successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error updating  pet.' }
        }
    }

    async delete(mascotasID) {
        const db = await tursoApp
        try {
            await tursoApp.execute({
                sql: 'DELETE FROM mascotas WHERE mascotasID = ?',
                args: [mascotasID]
            })
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error deleting Pet.' }
        }
    }
}

export default new ClinicalHistoryModel()
