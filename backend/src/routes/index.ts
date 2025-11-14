import { Router } from 'express';
import authRoutes from './auth';
import costumeRoutes from './costumes';
import bookingRoutes from './bookings';
import paymentRoutes from './payments';
import reviewRoutes from './reviews';
import adminRoutes from './admin';

export const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/costumes', costumeRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/admin', adminRoutes);
