import { Router } from 'express'
import ClinicalHistoryController from '#src/controllers/ClinicalHistoryController.js'

const router = Router()

router.get('/', ClinicalHistoryController.getAll)
router.post('/', ClinicalHistoryController.create)
router.put('/:id', ClinicalHistoryController.update)
router.delete('/:id', ClinicalHistoryController.disable)

export default router
