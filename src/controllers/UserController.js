import UserModel from "#src/models/UserModel.js"

class UserController {
    cache = new Map()
    async getAll(req, res) {
        if (this.cache.has('users')) {
            return res.status(200).json({data: this.cache.get('users')})
        }
        const data = await UserModel.getAll()
        this.cache.set('users', data.data)

        setTimeout(() => this.cache.delete('users'), 60 * 1000)
        res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await UserModel.createAsAdmin(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await UserModel.update(req.params.id, req.body)
        res.status(data.code).send(data)
    }

    async disable(req, res) {
        const data = await UserModel.disable(req.params.id)
        res.status(data.code).send(data)
    }
}

export default new UserController()