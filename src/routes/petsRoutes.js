import { Router } from "express"
import PetController from "#src/controllers/petsController.js"


const router = Router()

router.get('/',  PetController.getAll)
router.get('/:id', PetController.getById)
router.post('/', PetController.create)
router.put('/:id', PetController.update)
//router.put('/disable/:id', PetController.disable)

export default router