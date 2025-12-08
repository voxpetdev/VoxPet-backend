import { Router } from "express"
import UserPetsController from "#src/controllers/userPetsController.js"


const router = Router()

router.get('/',  UserPetsController.getAll)
router.get('/:id', UserPetsController.getById)
router.post('/', UserPetsController.create)
router.put('/:id', UserPetsController.update)
router.put('/disable/:id', UserPetsController.disable)

export default router