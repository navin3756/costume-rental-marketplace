import { Response } from 'express';
import { addDays } from 'date-fns';
import { BookingModel } from '../models/booking.model';
import { AuthenticatedRequest } from '../middleware/auth';

export const listBookings = async (req: AuthenticatedRequest, res: Response) => {
  const bookings = await BookingModel.find({ renterId: req.user?.uid }).limit(50);
  res.json({ data: bookings });
};

export const createBooking = async (req: AuthenticatedRequest, res: Response) => {
  const booking = await BookingModel.create({
    ...req.body,
    renterId: req.user?.uid,
    endDate: req.body.endDate ?? addDays(new Date(req.body.startDate), 3)
  });
  res.status(201).json({ data: booking });
};
