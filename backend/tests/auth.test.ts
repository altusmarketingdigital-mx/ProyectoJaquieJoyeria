import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import bcrypt from 'bcrypt';

let adminToken: string;
let clientToken: string;

beforeAll(async () => {
  // Clean DB
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('admin123', 10);
  const clientPassword = await bcrypt.hash('client123', 10);

  const admin = await prisma.user.create({
    data: { email: 'admin@test.com', passwordHash: adminPassword, role: 'ADMIN' },
  });
  const client = await prisma.user.create({
    data: { email: 'client@test.com', passwordHash: clientPassword, role: 'CLIENT' },
  });

  const adminRes = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'admin123' });
  const clientRes = await request(app).post('/api/auth/login').send({ email: 'client@test.com', password: 'client123' });
  adminToken = adminRes.body.token;
  clientToken = clientRes.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth flow', () => {
  test('register new client', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'newclient@test.com', password: 'newpass' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('login returns JWT', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'client@test.com', password: 'client123' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('protected route requires JWT', async () => {
    const res = await request(app).get('/api/client/profile');
    expect(res.status).toBe(401);
  });

  test('protected route works with JWT', async () => {
    const res = await request(app).get('/api/client/profile').set('Authorization', `Bearer ${clientToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
