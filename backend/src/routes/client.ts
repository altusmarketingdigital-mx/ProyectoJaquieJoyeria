import { Router } from 'express';
import { checkRole } from '../middleware/auth';

const router = Router();

// Example protected client endpoint
router.get('/profile', (req, res) => {
  // In a real implementation, fetch client data via prisma
  res.json({ message: 'Client profile placeholder' });
});

export default router;
