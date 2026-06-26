import { Router } from 'express';
import { checkRole } from '../middleware/auth';
import { prisma } from '../prisma';
import { getCatalog, createProduct, updateProduct, deleteProduct } from '../controllers/catalogController';

const router = Router();

// Admin‑only endpoint to get all clients
router.get('/clients', checkRole('ADMIN'), async (req, res) => {
  try {
    const clients = await prisma.user.findMany({
      where: { role: 'CLIENT' },
      include: {
        _count: {
          select: { orders: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const mapped = clients.map(client => ({
      id: client.id,
      email: client.email,
      createdAt: client.createdAt,
      totalOrders: client._count.orders
    }));
    
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching clients' });
  }
});

// Admin‑only endpoint to get all certificates
router.get('/certificates', checkRole('ADMIN'), async (req, res) => {
  try {
    const certificates = await prisma.jewelryCertificate.findMany({
      include: {
        order: {
          include: {
            user: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching certificates' });
  }
});

// Rutas de Catálogo (Inventario de Productos)
router.get('/catalog', checkRole('ADMIN'), getCatalog);
router.post('/catalog', checkRole('ADMIN'), createProduct);
router.put('/catalog/:id', checkRole('ADMIN'), updateProduct);
router.delete('/catalog/:id', checkRole('ADMIN'), deleteProduct);

export default router;
