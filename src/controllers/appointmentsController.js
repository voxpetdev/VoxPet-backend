import AppointmentsModel from "#src/models/appointmentsModel.js"

class AppointmensController {
    constructor() {
        this.cache = new Map()
    }

    getAll = async (req, res) => {
        if (this.cache.has('appointment')) {
            return res.status(200).send({
                code: 200,
                data: this.cache.get('appointment')
            })
        }

        const data = await AppointmentsModel.getAll()
        this.cache.set('appointment', data.data)

        setTimeout(() => this.cache.delete('appointment'), 60 * 1000)

        res.status(data.code).send(data)
    }

    getById = async (req, res) => {
        const { id } = req.params

        if (this.cache.has(`appointment_${id}`)) {
            return res.status(200).send({
                code: 200,
                data: this.cache.get(`appointment_${id}`)
            })
        }

        const data = await AppointmentsModel.getById(id)

        if (!data.data) {
            return res.status(404).send({ code: 404, message: "appointment not found" })
        }

        this.cache.set(`appointment_${id}`, data.data)
        setTimeout(() => this.cache.delete(`appointment_${id}`), 60 * 1000)

        return res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await AppointmentsModel.create(req.body)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await AppointmentsModel.update(req.params.id, req.body)
        res.status(data.code).send(data)
    }

    async disable(req, res) {
        const data = await AppointmentsModel.disable(req.params.id)
        res.status(data.code).send(data)
    }
}

export default new AppointmensController()
