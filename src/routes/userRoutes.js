import { Router } from "express"
import UserController from "#src/controllers/UserController.js"
import { verifyToken } from "#src/middlewares/authMiddleware.js"

const router = Router()

router.get('/', verifyToken, UserController.getAll)
router.post('/', verifyToken, UserController.create)
router.patch('/:id', verifyToken, UserController.update)
router.put('/disable/:id', verifyToken, UserController.disable)

export default router