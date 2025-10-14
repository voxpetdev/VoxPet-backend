import supabase from "#src/config/supabase.config.js"
import { tursoApp } from "#src/config/turso.config.js"
import UserModel from "./UserModel.js"

class AuthModel {
    constructor() {}

    async register(userData) {
        const { email, password } = userData
        
        if (!email || !password) return { code: 400, message: "El correo y la contraseña son requeridos!" }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) return { code: 400, message: error.message }

        const userCreated = await UserModel.create({ userID: data.user.id, ...userData })

        return {
            code: userCreated.code,
            message: userCreated.message
        }
    }

    async login(credentials) {
        const { username, password } = credentials

        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password
        })

        if (error) {
            console.error(error.message)
            return {
                code: 500,
                message: "Error Signning In"
            }
        }

        const query = await tursoApp.execute(`SELECT * FROM users WHERE userID = '${data.user.id}'`)

        const user = query.rows[0]

        console.log(user)

        return {
            code: 201,
            access_token: data.session.access_token,
            user: {
                id: data.user.id,
                email: data.user.email,
                name: user.name,
                phone: user.phone
            }
        }
    }
}

export default new AuthModel()