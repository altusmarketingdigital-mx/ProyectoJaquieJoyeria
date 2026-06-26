import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../prisma';

// Helper to sign JWT
function signToken(payload: object) {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

// Register new user (client role by default)
export async function register(req: Request, res: Response) {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: role?.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'CLIENT',
      },
      select: { id: true, email: true, role: true },
    });
    const token = signToken({ userId: user.id, role: user.role });
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Login existing user
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken({ userId: user.id, role: user.role });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get current user profile (protected)
export async function me(req: Request, res: Response) {
  // @ts-ignore - userId injected by auth middleware
  const userId = (req as any).userId;
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true, createdAt: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
}
