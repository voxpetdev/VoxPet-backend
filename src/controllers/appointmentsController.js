import AppointmentsModel from "#src/models/appointmentsModel.js"

class AppointmensController {
    constructor() {
        this.cache = new Map()
    }

    getAll = async (req, res) => {
        if (this.cache.has('specialty')) {
            return res.status(200).send({
                code: 200,
                data: this.cache.get('specialty')
            })
        }

        const data = await AppointmentsModel.getAll()
        this.cache.set('specialty', data.data)

        setTimeout(() => this.cache.delete('specialty'), 60 * 1000)

        res.status(data.code).send(data)
    }

    getById = async (req, res) => {
        const { id } = req.params

        if (this.cache.has(`specialty_${id}`)) {
            return res.status(200).send({
                code: 200,
                data: this.cache.get(`specialty_${id}`)
            })
        }

        const data = await AppointmentsModel.getById(id)

        if (!data.data) {
            return res.status(404).send({ code: 404, message: "Specialty not found" })
        }

        this.cache.set(`specialty_${id}`, data.data)
        setTimeout(() => this.cache.delete(`specialty_${id}`), 60 * 1000)

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
