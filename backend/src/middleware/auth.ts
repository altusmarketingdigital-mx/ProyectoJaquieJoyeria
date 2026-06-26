import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const payload = jwt.verify(token, secret) as { userId: string; role: string };
    // Attach user info to request for later use
    (req as any).userId = payload.userId;
    (req as any).role = payload.role;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Role‑based access helper – use as middleware: (req, res, next) => checkRole('ADMIN')(req,res,next)
export function checkRole(requiredRole: 'ADMIN' | 'CLIENT') {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).role;
    if (!role) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }
    if (role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: insufficient privileges' });
    }
    next();
  };
}
