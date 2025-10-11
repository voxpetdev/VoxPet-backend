import ClinicalHistoryModel from '#src/models/ClinicalHistoryModel.js'

class ClinicalHistoryController {
    async getAll(req, res) {
        const data = await ClinicalHistoryModel.getAll()
        res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await ClinicalHistoryModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await ClinicalHistoryModel.update(req.params.id, req.body)
        res.status(data.code).send({ message: 'medical history updated successfully' })
    }

    async disable(req, res) {
        const data = await petsModel.disable(req.params.id)
        res.status(data.code).send({  ClinicalHistoryModel: 'medical history disabled successfully' })
    }
}

export default new ClinicalHistoryController()
