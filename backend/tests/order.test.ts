import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import bcrypt from 'bcrypt';

let adminToken: string;
let clientToken: string;
let orderId: string;

beforeAll(async () => {
  // Clean DB tables used in this test suite
  await prisma.customOrder.deleteMany();
  await prisma.quotation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: { email: 'admin@test.com', passwordHash: adminPassword, role: 'ADMIN' },
  });
  // Create client user
  const clientPassword = await bcrypt.hash('client123', 10);
  await prisma.user.create({
    data: { email: 'client@test.com', passwordHash: clientPassword, role: 'CLIENT' },
  });

  // Log in both users to get JWTs
  const adminRes = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'admin123' });
  adminToken = adminRes.body.token;
  const clientRes = await request(app).post('/api/auth/login').send({ email: 'client@test.com', password: 'client123' });
  clientToken = clientRes.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Order and Quotation flow', () => {
  test('client creates a custom order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ userId: 2, productId: 1, customization: {} });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    orderId = res.body.id;
  });

  test('admin creates quotation and PDF', async () => {
    const res = await request(app)
      .post(`/api/orders/${orderId}/quotation`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Cotización Anillo', description: 'Anillo de oro 18K', price: 15000, currency: 'USD' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('pdfPath');
  });

  test('client can download generated PDF', async () => {
    const res = await request(app)
      .get(`/api/orders/${orderId}/quotation/pdf`)
      .set('Authorization', `Bearer ${clientToken}`);
    // The endpoint should return a PDF with correct content-type
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/pdf/);
  });
});
