import { Router } from "express"
import BreedController from "#src/controllers/breedController.js"


const router = Router()

router.get('/',  BreedController.getAll)
router.get('/:id', BreedController.getById)
router.post('/', BreedController.create)
router.put('/:id', BreedController.update)
router.put('/disable/:id', BreedController.disable)

export default router