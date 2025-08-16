import UserModel from "#src/models/userModel.js"

class UserController {
    async getAll(req, res) {
        const data = await UserModel.getAll()
        res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await UserModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await UserModel.update(req.params.id, req.body)
        res.status(data.code).send(data)
    }
}

export default new UserController()