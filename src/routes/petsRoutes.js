import { Router } from 'express'
import PetsController from '#src/controllers/PetsController.js'

const router = Router()

router.get('/', PetsController.getAll)
router.get('/:id', PetsController.getById)
router.post('/', PetsController.create)
router.put('/:id', PetsController.update)
router.delete('/:id', PetsController.delete)

export default router