import petsModel from "#src/models/petsModel.js"

class PetsController {
    async getAll(req, res) {
        const data = await petsModel.getAll()
        res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await petsModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await petsModel.update(req.params.id, req.body)
        res.status(data.code).send({ message: 'Pet updated successfully' })
    }

    async disable(req, res) {
        const data = await petsModel.disable(req.params.id)
        res.status(data.code).send({  message: 'Pet disabled successfully' })
    }
}

export default new PetsController()