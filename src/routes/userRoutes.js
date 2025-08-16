import { Router } from "express"
import UserController from "#src/controllers/userController.js"

const router = Router()

router.get('/', UserController.getAll)
router.post('/', UserController.create)
router.put('/:id', UserController.update)

export default router