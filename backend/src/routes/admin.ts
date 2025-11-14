import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import { getAdminOverview } from '../controllers/admin.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.get('/overview', authenticate, requireAdmin, asyncHandler(getAdminOverview));

export default router;
