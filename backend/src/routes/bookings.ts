import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createBooking, listBookings } from '../controllers/booking.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.get('/', authenticate, asyncHandler(listBookings));
router.post('/', authenticate, asyncHandler(createBooking));

export default router;
