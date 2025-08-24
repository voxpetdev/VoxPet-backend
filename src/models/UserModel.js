import { tursoApp } from '../turso.config.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

class UserModel {
    constructor() {
        this.saltRounds = parseInt(process.env.BCRYPT_SALT)
    }

    async getAll() {
        try {
            const res = await tursoApp.execute('SELECT * FROM usuarios')
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
                sql: "INSERT INTO usuarios values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                args: [userID, name, last_name, docType, docNumber, '30458c42-1a08-4637-bb3d-0b18524e0979', phone, email, address, hashedPassword]
            })

            return { code: 200, message: 'User created successfully.' }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating the user.' }
        }
    }

    async update(userID, data) {
        const { name, last_name, email, roleID, docType, docNumber, phone, address, password } = data
        const hashedPassword = bcrypt.hashSync(password, this.saltRounds)
        try {
            await tursoApp.execute({
                sql: "UPDATE usuarios SET nombre = ?, apellido = ?, tipo_documento = ?, numero_documento = ?, id_rol = ?, numero_contacto = ?, correo_electronico = ?, direccion = ?, contrasena = ? WHERE id_usuario = ?",
                args: [name, last_name, docType, docNumber, roleID, phone, email, address, hashedPassword, userID]
            })
            
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error updating user.' }
        }
    }

    async disable(userID) {
        try {
            await tursoApp.execute({
                sql: 'UPDATE usuarios SET status = unabled WHERE id_usuario = ?',
                args: [userID]
            })
            return { code: 201 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error unabling user.' }
        }
    }
}

export default new UserModel()