import { Router } from 'express'
import treatmentsController from '#src/controllers/treatmentsController.js'

const router = Router()


router.get('/', treatmentsController.getAll)
router.post('/', treatmentsController.create)
router.put('/:id', treatmentsController.update)
router.put('/disable/:id', treatmentsController.disable)

export default router