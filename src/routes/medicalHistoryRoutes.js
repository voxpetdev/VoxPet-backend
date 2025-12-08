import { Router } from "express"
import MedicalHistoryController from "#src/controllers/medicalHistoryController.js"


const router = Router()

router.get('/',  MedicalHistoryController.getAll)
router.get('/:id', MedicalHistoryController.getById)
router.post('/', MedicalHistoryController.create)
router.put('/:id', MedicalHistoryController.update)
router.put('/disable/:id', MedicalHistoryController.disable)

export default router