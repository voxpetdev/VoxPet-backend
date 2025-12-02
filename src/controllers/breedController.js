import BreedModel from "#src/models/breedModel.js"

class BreedController {
    constructor() {
        this.cache = new Map()
    }

    getAll = async (req, res) => {
        if (this.cache.has('breed')) {
            return res.status(200).send({code: 200, data: this.cache.get('breed')})
        }
        const data = await BreedModel.getAll()
        this.cache.set('breed', data.data)

        setTimeout(() => this.cache.delete('breed'), 60 * 1000)
        res.status(data.code).send(data)
    }

    getById = async (req, res) => {
        const { id } = req.params

        if (this.cache.has(`breed_${id}`)) {
            return res.status(200).send({
                code: 200,
                data: this.cache.get(`breed_${id}`)
            })
        }

        const data = await BreedModel.getById(id)
        if (data.code === 404) {
            return res.status(404).send(data)
        }
        if (data.code === 200) {
            this.cache.set(`breed_${id}`, data.data)
            setTimeout(() => this.cache.delete(`breed_${id}`), 60 * 1000)
        }

        return res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await BreedModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await BreedModel.update(req.params.id, req.body)
        res.status(data.code).send(data)
    }

    async disable(req, res) {
        const data = await BreedModel.disable(req.params.id)
        res.status(data.code).send(data)
    }
}

export default new BreedController()