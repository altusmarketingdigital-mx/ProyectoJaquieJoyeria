import { Router } from 'express';
import { verifyJwt, checkRole } from '../middleware/auth';
import {
  createOrder,
  getOrder,
  createQuotation,
  getQuotationPdf,
  getAllOrders,
  createCertificate,
  getCertificatePdf,
} from '../controllers/orderController';

const router = Router();

// Admin get all orders
router.get('/', verifyJwt, checkRole('ADMIN'), getAllOrders);

// Any authenticated user creates a new custom order
router.post('/', verifyJwt, createOrder);

// Client or admin fetch order details (must belong to client unless admin)
router.get('/:id', verifyJwt, getOrder);

// Admin creates/updates quotation for an order
router.post('/:id/quotation', verifyJwt, checkRole('ADMIN'), createQuotation);

// Get quotation PDF (public URL for easy sharing/opening)
router.get('/:id/quotation/pdf', getQuotationPdf);

// Admin creates/updates jewelry certificate
router.post('/:id/certificate', verifyJwt, checkRole('ADMIN'), createCertificate);

// Get certificate PDF (public URL for easy sharing/opening)
router.get('/:id/certificate/pdf', getCertificatePdf);

export default router;
