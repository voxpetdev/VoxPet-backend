import { Router } from "express"
import UserController from "#src/controllers/UserController.js"

const router = Router()

router.get('/', UserController.getAll)
router.post('/', UserController.create)
router.put('/:id', UserController.update)
router.put('/disable/:id', UserController.disable)

export default router