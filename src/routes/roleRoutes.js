import { Router } from "express"
import roleController from "#src/controllers/roleController.js"

const router = Router()

router.get("/", roleController.getAll)
router.get("/:id", roleController.getById)

export default router