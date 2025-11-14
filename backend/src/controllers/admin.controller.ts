import { Response } from 'express';
import { UserModel } from '../models/user.model';
import { CostumeModel } from '../models/costume.model';
import { BookingModel } from '../models/booking.model';
import { PaymentModel } from '../models/payment.model';

export const getAdminOverview = async (_req: any, res: Response) => {
  const [users, costumes, bookings, payments] = await Promise.all([
    UserModel.countDocuments(),
    CostumeModel.countDocuments(),
    BookingModel.countDocuments(),
    PaymentModel.countDocuments()
  ]);

  res.json({
    data: {
      users,
      costumes,
      bookings,
      payments
    }
  });
};
