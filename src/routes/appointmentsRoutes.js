import { Router } from "express"
import appointmentController from "#src/controllers/appointmentsController.js"


const router = Router()

router.get('/',  appointmentController.getAll)
router.get('/:id', appointmentController.getById)
router.post('/', appointmentController.create)
router.put('/:id', appointmentController.update)
router.put('/disable/:id', appointmentController.disable)

export default router