import { tursoApp } from '../turso.config.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

class UserModel {
    constructor() {
        this.saltRounds = parseInt(process.env.BCRYPT_SALT)
    }

    async getAll() {
        try {
            const res = await tursoApp.execute('SELECT * FROM users')
            return { code: 200, records: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the users." }
        }
    }

    async create(data) {
        const { name, last_name, email, docType, docNumber, phone, address, password } = data
        try {
            const userID = uuid()
            const hashedPassword = bcrypt.hashSync(password, this.saltRounds)
            await tursoApp.execute({
                sql: "INSERT INTO users values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                args: [userID, name, last_name, docType, docNumber, '2f0a87cb-83e0-4838-bf2d-3a93d992dbfb', null, phone, email, address, 'INACTIVE', hashedPassword]
            })

            return { code: 200, message: 'User created successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating the user.' }
        }
    }

    async update(userID, data) {
        const { name, last_name, email, roleID, specialityID, docType, docNumber, phone, address, status, password } = data
        const hashedPassword = bcrypt.hashSync(password, this.saltRounds)
        try {
            await tursoApp.execute({
                sql: "UPDATE users SET name = ?, last_name = ?, documentType = ?, document = ?, roleID = ?, specialtyID = ?, phone = ?, email = ?, address = ?, status = ?, password = ? WHERE userID = ?",
                args: [name, last_name, docType, docNumber, roleID, specialityID, phone, email, address, status, hashedPassword, userID]
            })
            
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error updating user.' }
        }
    }
}

export default new UserModel()