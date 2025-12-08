import UserModel from "./UserModel.js"
import jwt from "jsonwebtoken"

import { supabase } from "#src/config/supabase.config.js"
import { db } from "#src/db/index.js"
import { users } from "#src/db/Schemas/usersSchema.js"
import { roles } from "#src/db/Schemas/rolesSchema.js"
import { eq } from "drizzle-orm"

class AuthModel {
    constructor() {}

    generateToken(user) {
        return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" })
    }

    async register(userData) {
        const { email, password } = userData
        if (!email || !password) return { code: 400, message: "El correo y la contraseña son requeridos!" }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            console.error(error)
            return { code: error.status, message: error.message }
        }

        if (data) {
            const userCreated = await UserModel.create({ userID: data.user.id, ...userData })
            return {
                code: userCreated.code,
                data: userCreated
            }
        }

        return {
            code: 500,
            message: "Internal server error"
        }
    }

    async login(credentials) {
        const { username, password } = credentials

        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password
        })

        if (error) {
            console.error(error)
            return {
                code: error.status,
                message: error.message
            }
        }

        const user = await db.select({
            userID: users.userID,
            name: users.name,
            last_name: users.last_name,
            email: users.email,
            role: roles.name,
            phone: users.phone
        }).from(users).where(eq(users.userID, data.user.id)).leftJoin(roles, eq(users.roleID, roles.roleID))

        return {
            code: 200,
            access_token: this.generateToken(user[0])
        }
    }

    async resetRequest(email) {
        const { _, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://vox-pet-web.vercel.app/update-password'
        })

        if (error) {
            console.error(error)
            return { code: 401, message: error.message }
        }

        return { code: 200, message: "Codigo enviado correctamente." }
    }
}

export default new AuthModel()