import { Request, Response } from 'express';
import { CostumeModel } from '../models/costume.model';
import { AuthenticatedRequest } from '../middleware/auth';

export const listCostumes = async (req: Request, res: Response) => {
  const { q, category } = req.query;
  const filter: Record<string, any> = {};
  if (q) {
    filter.$text = { $search: String(q) };
  }
  if (category) {
    filter.category = category;
  }
  const costumes = await CostumeModel.find(filter).limit(50);
  res.json({ data: costumes });
};

export const createCostume = async (req: AuthenticatedRequest, res: Response) => {
  const ownerId = req.user?.uid;
  if (!ownerId) {
    return res.status(400).json({ message: 'Missing owner information' });
  }
  const costume = await CostumeModel.create({ ...req.body, ownerId });
  res.status(201).json({ data: costume });
};

export const updateCostume = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const costume = await CostumeModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ data: costume });
};
