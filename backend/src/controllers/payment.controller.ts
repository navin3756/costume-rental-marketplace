import { Response } from 'express';
import { stripe } from '../config/stripe';
import { PaymentModel } from '../models/payment.model';
import { AuthenticatedRequest } from '../middleware/auth';

export const createPaymentIntent = async (req: AuthenticatedRequest, res: Response) => {
  const { amount, currency = 'usd' } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata: {
      renterId: req.user?.uid ?? ''
    }
  });

  const payment = await PaymentModel.create({
    bookingId: req.body.bookingId,
    amount,
    currency,
    stripePaymentIntentId: paymentIntent.id
  });

  res.status(201).json({ data: { clientSecret: paymentIntent.client_secret, payment } });
};
