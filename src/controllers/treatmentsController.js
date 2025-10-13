import treatmentsModel from "#src/models/treatmentsModel.js"

class treatmentsController {
    async getAll(req, res) {
        const data = await treatmentsModel.getAll()
        res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await treatmentsModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await treatmentsModel.update(req.params.id, req.body)
        res.status(data.code).send({ message: 'treatment updated successfully' })
    }

    async disable(req, res) {
        const data = await treatmentsModel.disable(req.params.id)
        res.status(data.code).send({  message: 'treatment disabled successfully' })
    }
}

export default new treatmentsController()