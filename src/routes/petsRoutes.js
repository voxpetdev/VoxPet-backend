import { Router } from "express"
import PetController from "#src/controllers/petsController.js"


const router = Router()

router.get('/:userID',  PetController.getAll)
router.get('/:userID/:id', PetController.getById)
router.post('/:userID', PetController.create)
router.put('/:id', PetController.update)
router.put('/disable/:id', PetController.disable)

export default router