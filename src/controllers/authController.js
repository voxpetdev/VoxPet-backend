import AuthModel from "#src/models/authModel.js"

class AuthController {
    async login(req, res) {
        const data = await AuthModel.login(req.body)
        console.log(data)
        res.status(data.code).send(data)
    }

    async register(req, res) {
        const data = await AuthModel.register(req.body)
        res.status(data.code).send(data)
    }
}

export default new AuthController()