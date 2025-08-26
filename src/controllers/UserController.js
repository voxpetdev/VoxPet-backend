import UserModel from "#src/models/UserModel.js"

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
        res.status(data.code).send({ message: 'Usuario editado correctamente.' })
    }

    async disable(req, res) {
        const data = await UserModel.disable(req.params.id)
        res.status(data.code).send({  message: 'Usuario deshabilitado correctamente.' })
    }
}

export default new UserController()