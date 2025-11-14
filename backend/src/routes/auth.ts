import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getProfile, upsertProfile } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

/**
 * @openapi
 * /api/auth/profile:
 *   get:
 *     summary: Get current profile
 */
router.get('/profile', authenticate, asyncHandler(getProfile));
router.post('/profile', authenticate, asyncHandler(upsertProfile));

export default router;
