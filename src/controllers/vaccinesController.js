import ClinicalHistoryModel from '#src/models/vaccinesModel.js'

class vaccinesController {
    async getAll(req, res) {
        const data = await vaccinesModel.getAll()
        res.status(data.code).send(data)
    }

    async getById(req, res) {
        const data = await vaccinesModel.getById(req.params.id)
        res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await vaccinesModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await vaccinesModel.update(req.params.id, req.body)
        res.status(data.code).send({ message: 'vaccines updated successfully.' })
    }

    async disable(req, res) {
        const data = await vaccinesModel .delete(req.params.id)
        res.status(data.code).send({ message: ' vaccines disable successfully.' })
    }
}

export default new vaccinesController()
