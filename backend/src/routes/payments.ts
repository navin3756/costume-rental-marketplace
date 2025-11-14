import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createPaymentIntent } from '../controllers/payment.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.post('/intent', authenticate, asyncHandler(createPaymentIntent));

export default router;
