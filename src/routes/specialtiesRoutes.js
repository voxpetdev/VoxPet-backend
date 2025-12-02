import { Router } from "express"
import SpecialtyController from "#src/controllers/specialtiesController.js"


const router = Router()

router.get('/',  SpecialtyController.getAll)
router.get('/:id', SpecialtyController.getById)
router.post('/', SpecialtyController.create)
router.put('/:id', SpecialtyController.update)
router.put('/disable/:id', SpecialtyController.disable)

export default router