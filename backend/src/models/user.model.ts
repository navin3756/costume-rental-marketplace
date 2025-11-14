import { Schema, model } from 'mongoose';

const addressSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    avatarUrl: String,
    role: { type: String, enum: ['renter', 'owner', 'admin'], default: 'renter' },
    phone: String,
    bio: String,
    address: addressSchema,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const UserModel = model('User', userSchema);
