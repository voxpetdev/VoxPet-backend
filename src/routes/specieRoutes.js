import { Router } from "express"
import SpecieController from "#src/controllers/SpecieController.js"


const router = Router()

router.get('/',  SpecieController.getAll)
router.get('/:id', SpecieController.getById)
router.post('/', SpecieController.create)
router.put('/:id', SpecieController.update)
router.put('/disable/:id', SpecieController.disable)

export default router