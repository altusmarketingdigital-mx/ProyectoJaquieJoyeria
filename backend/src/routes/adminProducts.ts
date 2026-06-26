import { Router } from 'express';
import { checkRole } from '../middleware/auth';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
} from '../controllers/adminProductController';

const router = Router();

router.post('/products', checkRole('ADMIN'), createProduct);
router.put('/products/:id', checkRole('ADMIN'), updateProduct);
router.delete('/products/:id', checkRole('ADMIN'), deleteProduct);
router.get('/products', checkRole('ADMIN'), async (req, res) => {
  // pagination params (default page 1, limit 10)
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await listProducts(req, res, page, limit);
  // listProducts now returns { data, total }
  if (result) {
    res.json(result);
  }
});

export default router;
