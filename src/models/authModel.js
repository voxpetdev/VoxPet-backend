import supabase from "#src/supabase.config.js"

class AuthModel {
    constructor() {}

    async register(credentials) {
        const { username, password } = credentials
        
        if (!username || !password) return { code: 500, message: "El correo y la contraseña son requeridos!" }

        const { data, error } = await supabase.auth.signUp({
            email: username,
            password: password
        })

        if (error) return { code: 500, message: error.message }

        return {
            code: 201,
            message: "Usuario registrado!",
            record: data.user.id
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

        return {
            code: 201,
            records: data
        }
    }
}

export default new AuthModel()