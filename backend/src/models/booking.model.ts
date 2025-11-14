import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    costumeId: { type: Schema.Types.ObjectId, ref: 'Costume', required: true },
    renterId: { type: String, required: true },
    ownerId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    total: Number,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },
    notes: String
  },
  { timestamps: true }
);

export const BookingModel = model('Booking', bookingSchema);
