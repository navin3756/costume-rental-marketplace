import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createCostume, listCostumes, updateCostume } from '../controllers/costume.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.get('/', asyncHandler(listCostumes));
router.post('/', authenticate, asyncHandler(createCostume));
router.put('/:id', authenticate, asyncHandler(updateCostume));

export default router;
