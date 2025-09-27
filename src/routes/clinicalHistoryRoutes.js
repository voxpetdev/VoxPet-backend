import { Router } from 'express'
import ClinicalHistoryController from '#src/controllers/ClinicalHistoryController.js'

const router = Router()

router.get('/', ClinicalHistoryController.getAll)
router.get('/:id', ClinicalHistoryController.getById)
router.post('/', ClinicalHistoryController.create)
router.put('/:id', ClinicalHistoryController.update)
router.delete('/:id', ClinicalHistoryController.delete)

export default router
