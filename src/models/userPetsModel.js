import { tursoApp } from "#src/config/turso.config.js"

class UserPetsModel {
    async getAll() {
        try {
            const res = await tursoApp.execute(`
        SELECT * FROM users_pets
            `)
            return { code: 200, data: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the users_pets." }
        }
    }
    
    async getById(users_petsID) {
        try {
            const res = await tursoApp.execute({
                sql: "SELECT * FROM users_pets WHERE users_petsID= ?",
                args: [users_petsID]
            })
            return { code: 200, data: res.rows[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting " }
        }
    }

    async create(data) {
        const { userID, petID,  status} = data
        try {
            await tursoApp.execute({
                sql: "INSERT INTO users_pets ( userID, petID,  status) values (?, ?, ?)",
                args: [ userID, petID,  status]
            })

            return { code: 200, message: 'Created successfully.'
            }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating .' }
        }
    }

    async update(users_petsID, data) {
        try {
            const {  userID, petID,  status} = data

            const res = await tursoApp.execute({
                sql: "SELECT * FROM users_pets WHERE users_petsID = ?",
                args: [users_petsID]
            })

            await tursoApp.execute({
                sql: "UPDATE users_pets SET userID=?, petID=?,  status=? WHERE users_petsID = ?",
                args: [ userID, petID,  status, users_petsID]
            })

            return { code: 200, message: " updated successfully." }

        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating." }
        }
    }

    async disable( users_petsID) {
        try {
            await tursoApp.execute({
                sql: "UPDATE users_pets SET status = 'INACTIVE' WHERE users_petsID = ?",
                args: [ users_petsID]
            })
            return { code: 200 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling.' }
        }
    }

}

export default new UserPetsModel()