import { Router } from 'express';
import DatesController from '#src/controllers/DatesController.js'

const router = Router();

// CRUD routes
router.get('/', DatesController.getAll);
router.get('/:id', DatesController.getById);
router.post('/', DatesController.create);
router.put('/:id', DatesController.update);
router.delete('/:id', DatesController.delete);

export default router;
