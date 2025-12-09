import PetsModel from "#src/models/petsModel.js"

class PetsController {
    getAll = async (req, res) => {
        const data = await PetsModel.getAll(req.params.userID)
        res.status(data.code).send(data)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const data = await PetsModel.getById(id)
        return res.status(data.code).send(data)
    }

    async create(req, res) {
        const data = await PetsModel.create(req.body, req.params.userID)
        res.status(data.code).send(data)
    }

    async update(req, res) {
        const data = await PetsModel.update(req.params.id, req.body)
        res.status(data.code).send(data)
    }

    async disable(req, res) {
        const data = await PetsModel.disable(req.params.id)
        res.status(data.code).send(data)
    }

}

export default new PetsController()