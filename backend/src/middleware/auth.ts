import { NextFunction, Request, Response } from 'express';
import { verifyFirebaseToken } from '../config/firebase';
import { env } from '../config/env';

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    role?: string;
  };
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = await verifyFirebaseToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email ?? undefined,
      role: decoded.role ?? 'renter'
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const email = req.user?.email;
  if (!email || !env.adminEmails.includes(email)) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
