import ClinicalHistoryModel from '#src/models/ClinicalHistoryModel.js'

class ClinicalHistoryController {
    async getAll(req, res) {
        const data = await ClinicalHistoryModel.getAll()
        res.status(data.code).send(data)
    }

    async getById(req, res) {
        const data = await ClinicalHistoryModel.getById(req.params.id)
        res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await ClinicalHistoryModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await ClinicalHistoryModel.update(req.params.id, req.body)
        res.status(data.code).send({ message: 'Clinical history updated successfully.' })
    }

    async delete(req, res) {
        const data = await ClinicalHistoryModel.delete(req.params.id)
        res.status(data.code).send({ message: 'Clinical history deleted successfully.' })
    }
}

export default new ClinicalHistoryController()
