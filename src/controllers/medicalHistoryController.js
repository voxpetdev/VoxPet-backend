import MedicalHistoryModel from "#src/models/medicalHistoryModel.js"

class MedicalHistoryController {
    constructor() {
        this.cache = new Map()
    }

    getAll = async (req, res) => {
        if (this.cache.has('medical_history')) {
            return res.status(200).send({code: 200, data: this.cache.get('medical_history')})
        }
        const data = await MedicalHistoryModel.getAll()
        this.cache.set('medical_history', data.data)

        setTimeout(() => this.cache.delete('medical_history'), 60 * 1000)
        res.status(data.code).send(data)
    }

    getById = async (req, res) => {
        const { id } = req.params

        if (this.cache.has(`medical_history_${id}`)) {
            return res.status(200).send({
                code: 200,
                data: this.cache.get(`medical_history_${id}`)
            })
        }

        const data = await MedicalHistoryModel.getById(id)
        if (data.code === 404) {
            return res.status(404).send(data)
        }
        if (data.code === 200) {
            this.cache.set(`medical_history_${id}`, data.data)
            setTimeout(() => this.cache.delete(`medical_history_${id}`), 60 * 1000)
        }

        return res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await MedicalHistoryModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await MedicalHistoryModel.update(req.params.id, req.body)
        res.status(data.code).send(data)
    }

    async disable(req, res) {
        const data = await MedicalHistoryModel.disable(req.params.id)
        res.status(data.code).send(data)
    }

}

export default new MedicalHistoryController()