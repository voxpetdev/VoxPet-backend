import { Router } from 'express'
import PetsController from '#src/controllers/PetsController.js'

const router = Router()


router.get('/', PetsController.getAll)
router.post('/', PetsController.create)
router.put('/:id', PetsController.update)
router.put('/disable/:id', PetsController.disable)

export default router