import { Schema, model } from 'mongoose';

const variantSchema = new Schema(
  {
    size: String,
    rentalPrice: Number,
    replacementValue: Number,
    stock: Number
  },
  { _id: false }
);

const costumeSchema = new Schema(
  {
    ownerId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    category: String,
    tags: [String],
    images: [String],
    variants: [variantSchema],
    rating: Number,
    isFeatured: Boolean,
    location: String
  },
  { timestamps: true }
);

export const CostumeModel = model('Costume', costumeSchema);
