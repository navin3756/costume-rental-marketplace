import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createReview, listReviews } from '../controllers/review.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.get('/', asyncHandler(listReviews));
router.post('/', authenticate, asyncHandler(createReview));

export default router;
