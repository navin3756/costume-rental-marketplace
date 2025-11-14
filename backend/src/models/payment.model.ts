import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: Number,
    currency: { type: String, default: 'usd' },
    status: {
      type: String,
      enum: ['requires_payment_method', 'processing', 'succeeded', 'refunded'],
      default: 'requires_payment_method'
    },
    stripePaymentIntentId: String
  },
  { timestamps: true }
);

export const PaymentModel = model('Payment', paymentSchema);
