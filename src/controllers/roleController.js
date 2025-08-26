import roleModel from "#src/models/roleModel.js"

class roleController {
    async getAll(req, res) {
        const data = await roleModel.getAll()
        res.status(data.code).send(data)
    }

    async getById(req, res) {
        const data = await roleModel.getById(req.params.id)
        res.status(data.code).send(data)
    }
}

export default new roleController()