import { Router } from 'express'
import vaccinesController from '#src/controllers/vaccinesController.js'

const router = Router()

router.get('/', vaccinesController.getAll)
router.get('/:id', vaccinesController.getById)
router.post('/', vaccinesController.create)
router.put('/:id', vaccinesController.update)
router.put('/disable/:id', vaccinesController.disable)

export default router
