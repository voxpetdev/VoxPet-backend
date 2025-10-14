import { tursoApp } from "#src/config/turso.config.js"
import dayjs from 'dayjs'

class UserModel {
    constructor() {
        this.saltRounds = parseInt(process.env.BCRYPT_SALT)
    }

    async getAll() {
        try {
            const res = await tursoApp.execute('SELECT * FROM users')
            return { code: 200, data: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the users." }
        }
    }

    async create(data) {
        const { userID, name, last_name, phone } = data
        try {
            await tursoApp.execute({
                sql: "INSERT INTO users (userID, name, last_name, roleID, specialtyID, phone, status) values (?, ?, ?, ?, ?, ?, ?)",
                args: [userID, name, last_name, '2f0a87cb-83e0-4838-bf2d-3a93d992dbfb', null, phone, 'INACTIVE']
            })

            return { code: 200, message: 'User created codefully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating the user.' }
        }
    }

    async update(userID, data) {
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
        try {
            const user = await tursoApp.execute({ sql: "SELECT name, last_name, documentType, document, roleID, specialtyID, phone, address, status, updatedAt FROM users WHERE userID = ?", args: [userID] })
            if (user.rows < 1) return { code: 500, message: "No se encontró el usuario" }
            const updatedUser = { ...user.rows[0], ...data, updatedAt: now}

            const { name, last_name, documentType, document, roleID, specialtyID, phone, address, status } = updatedUser

            await tursoApp.execute({
                sql: "UPDATE users SET name = ?, last_name = ?, documentType = ?, document = ?, roleID = ?, specialtyID = ?, phone = ?, address = ?, status = ?, updatedAt = ? WHERE userID = ?",
                args: [name, last_name, documentType, document, roleID, specialtyID, phone, address, status, now, userID]
            })
            
            return { code: 200, data: updatedUser }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error updating user.' }
        }
    }

    async disable(userID) {
        try {
            await tursoApp.execute({
                sql: 'UPDATE users SET status = INACTIVE WHERE userID = ?',
                args: [userID]
            })
            return { code: 200 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling user.' }
        }
    }
}

export default new UserModel()