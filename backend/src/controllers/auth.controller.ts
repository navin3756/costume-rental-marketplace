import { Response } from 'express';
import { UserModel } from '../models/user.model';
import { AuthenticatedRequest } from '../middleware/auth';

export const upsertProfile = async (req: AuthenticatedRequest, res: Response) => {
  const { displayName, avatarUrl, phone, bio, address, role } = req.body;
  const firebaseUid = req.user?.uid;
  const email = req.user?.email;

  if (!firebaseUid || !email) {
    return res.status(400).json({ message: 'Missing Firebase user information' });
  }

  const user = await UserModel.findOneAndUpdate(
    { firebaseUid },
    { displayName, avatarUrl, phone, bio, address, role, email },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.json({ data: user });
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  const firebaseUid = req.user?.uid;
  if (!firebaseUid) {
    return res.status(400).json({ message: 'Missing Firebase user information' });
  }

  const user = await UserModel.findOne({ firebaseUid });
  res.json({ data: user });
};
