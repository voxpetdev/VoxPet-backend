import { supabase } from "#src/config/supabase.config.js"
import { tursoApp } from "#src/config/turso.config.js"
import jwt from "jsonwebtoken"
import UserModel from "./UserModel.js"

class AuthModel {
    constructor() {}

    generateToken(user) {
        return jwt.sign(
            {
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                phone: user.phone
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
    }

    async register(userData) {
        const { email, password } = userData
        if (!email || !password) return { code: 400, message: "El correo y la contraseña son requeridos!" }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) return { code: 400, message: error.message }

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
                code: 500,
                message: "Error Signning In"
            }
        }

        const query = await tursoApp.execute(`SELECT u.name name, u.last_name last_name, r.name role, u.phone phone FROM users u LEFT JOIN roles r ON u.roleID = r.roleID WHERE userID = '${data.user.id}'`)

        const userData = query.rows[0]

        const user = {
            name: userData.name,
            last_name: userData.last_name,
            email: data.user.email,
            role: userData.role,
            phone: userData.phone
        }

        return {
            code: 201,
            access_token: this.generateToken(user)
        }
    }

    async resetRequest(email) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
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