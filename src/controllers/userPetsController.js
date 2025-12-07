import UserPetsModel from "#src/models/userPetsModel.js"

class UserPetsController {
    constructor() {
        this.cache = new Map()
    }

    getAll = async (req, res) => {
        if (this.cache.has('users_pets')) {
            return res.status(200).send({code: 200, data: this.cache.get('users_pets')})
        }
        const data = await UserPetsModel.getAll()
        this.cache.set('users_pets', data.data)

        setTimeout(() => this.cache.delete('users_pets'), 60 * 1000)
        res.status(data.code).send(data)
    }

    getById = async (req, res) => {
        const { id } = req.params

        if (this.cache.has(`users_pets_${id}`)) {
            return res.status(200).send({
                code: 200,
                data: this.cache.get(`users_pets_${id}`)
            })
        }

        const data = await UserPetsModel.getById(id)
        if (data.code === 404) {
            return res.status(404).send(data)
        }
        if (data.code === 200) {
            this.cache.set(`users_pets_${id}`, data.data)
            setTimeout(() => this.cache.delete(`users_pets_${id}`), 60 * 1000)
        }

        return res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await UserPetsModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await UserPetsModel.update(req.params.id, req.body)
        res.status(data.code).send(data)
    }

    async disable(req, res) {
        const data = await UserPetsModel.disable(req.params.id)
        res.status(data.code).send(data)
    }

}

export default new UserPetsController()