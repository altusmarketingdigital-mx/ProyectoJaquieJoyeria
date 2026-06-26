import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import bcrypt from 'bcrypt';

let adminToken: string;

beforeAll(async () => {
  // Clean products and users
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: { email: 'admin@test.com', passwordHash: adminPassword, role: 'ADMIN' },
  });

  const loginRes = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'admin123' });
  adminToken = loginRes.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Admin product CRUD with pagination', () => {
  test('create a product', async () => {
    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Anillo', description: 'Oro 18K', price: 12000, imageUrl: '' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('list products with pagination', async () => {
    const res = await request(app)
      .get('/api/admin/products?page=1&limit=5')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('total');
  });

  test('update a product', async () => {
    const product = await prisma.product.findFirst();
    const res = await request(app)
      .put(`/api/admin/products/${product?.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Anillo Deluxe', description: 'Oro 18K con diamante', price: 25000, imageUrl: '' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Anillo Deluxe');
  });

  test('delete a product', async () => {
    const product = await prisma.product.findFirst();
    const res = await request(app)
      .delete(`/api/admin/products/${product?.id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(204);
  });
});
