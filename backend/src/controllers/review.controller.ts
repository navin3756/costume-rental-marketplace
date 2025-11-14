import { Response } from 'express';
import { ReviewModel } from '../models/review.model';
import { AuthenticatedRequest } from '../middleware/auth';

export const listReviews = async (_req: AuthenticatedRequest, res: Response) => {
  const reviews = await ReviewModel.find().limit(50);
  res.json({ data: reviews });
};

export const createReview = async (req: AuthenticatedRequest, res: Response) => {
  const review = await ReviewModel.create({ ...req.body, reviewerId: req.user?.uid });
  res.status(201).json({ data: review });
};
