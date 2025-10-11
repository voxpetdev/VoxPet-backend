import { tursoApp } from '../turso.config.js'

class petsModel {
    async getAll() {
        
        try {
            const query = await tursoApp.execute('SELECT * FROM pets')
            return { code: 200, records: query.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting pets.' }
        }
    }

    async getById(petID) {
        try {
            const query = await tursoApp.execute({
                sql: 'SELECT * FROM pets WHERE petID = ?',
                args: [petID]
            })
            return res.rows.length > 0
                ? { code: 200, record: query.rows[0] }
                : { code: 404, message: 'Pets not found.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error getting Pets.' }
        }
    }

    async create(data) {
        const { petID, name, last_name, weight,  birth_date, specieID, breedID, sex, color} = data
        try {
            const loquesea = await tursoApp.execute({
                sql: `INSERT INTO pets 
                      (petID, name, last_name, weight,  birth_date, specieID, breedID, sex, color)
                      values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [petID, name, last_name, weight,  birth_date, specieID, breedID, sex, color]
            })
            console.log(loquesea)
            return { code: 200, message: 'Pet created successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating pet.' }
        }
    }

    async update(petID, data) {
        const { name, last_name, weight, color } = data
        try {
            await tursoApp.execute({
                sql: `UPDATE pets
                      SET name = ?, last_name = ?, weight = ?, color = ?
                      WHERE petID = ?`,
                args: [name, last_name, weight, color, petID]
            })

            return { code: 201, message: 'Pet updated successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error updating  pet.' }
        }
    }

     async disable(petID) {
        try {
            await tursoApp.execute({
                sql: 'UPDATE pets SET status = SUSPENDED WHERE petID = ?',
                args: [petID]
            })
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling user.' }
        }
    }
}

export default new petsModel()
