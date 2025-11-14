import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    costumeId: { type: Schema.Types.ObjectId, ref: 'Costume', required: true },
    reviewerId: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String
  },
  { timestamps: true }
);

export const ReviewModel = model('Review', reviewSchema);
