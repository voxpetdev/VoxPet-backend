import PetsModel from "#src/models/petsModel.js"

class PetsController {
    constructor() {
        this.cache = new Map()
    }

    getAll = async (req, res) => {
        if (this.cache.has('pet')) {
            return res.status(200).send({code: 200, data: this.cache.get('pet')})
        }
        const data = await PetsModel.getAll()
        this.cache.set('pet', data.data)

        setTimeout(() => this.cache.delete('pet'), 60 * 1000)
        res.status(data.code).send(data)
    }

    getById = async (req, res) => {
        const { id } = req.params

        if (this.cache.has(`pet_${id}`)) {
            return res.status(200).send({
                code: 200,
                data: this.cache.get(`pet_${id}`)
            })
        }

        const data = await PetsModel.getById(id)
        if (data.code === 404) {
            return res.status(404).send(data)
        }
        if (data.code === 200) {
            this.cache.set(`pet_${id}`, data.data)
            setTimeout(() => this.cache.delete(`pet_${id}`), 60 * 1000)
        }

        return res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await PetsModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await PetsModel.update(req.params.id, req.body)
        res.status(data.code).send(data)
    }

}

export default new PetsController()