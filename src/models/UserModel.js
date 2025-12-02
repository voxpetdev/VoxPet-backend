import { db } from '../db/index.js'
import { users } from "../db/Schemas/usersSchema.js"
import { eq } from 'drizzle-orm'
import { supabaseAdmin } from '#src/config/supabase.config.js'

class UserModel {
    constructor() {
        this.saltRounds = parseInt(process.env.BCRYPT_SALT)
    }

    async getAll() {
        try {
            const res = await db.select().from(users)
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the users." }
        }
    }

    async create(data) {
        try {
            await db.insert(users).values({...data, roleID: "b50b032e-58e8-4899-a2ec-004ac2ca50e1" })
            const user = await db.select().from(users).where(eq(users.email, data.email))
            return { code: 200, data: user }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating the user.' }
        }
    }

    async createAsAdmin({name, last_name, email, phone, password}) {
        try {
            const { data: authUser, error } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true
            })

            if (error) throw error

            const user = await this.create({userID: authUser.user.id, name, last_name, roleID: "2f0a87cb-83e0-4838-bf2d-3a93d992dbfb" , email, phone})

            return { code: 200, data: user.data }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating the user.' }
        }
    }

    async update(userID, data) {
        try {
            const user = await db.select().from(users).where(eq(users.userID, userID))
            if (!user) return { code: 500, message: "No se encontró el usuario" }
            const updatedUser = { ...user, ...data, updatedAt: Date.now()}

            await db.update(users).set(updatedUser).where(eq(users.userID, userID))
            
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