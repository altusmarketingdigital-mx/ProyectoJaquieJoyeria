// @ts-nocheck
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';

async function main() {
  // Clean existing data
  await prisma.customOrder.deleteMany();
  await prisma.quotation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPass = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: { email: 'admin@example.com', passwordHash: adminPass, role: 'ADMIN' },
  });

  // Create client user
  const clientPass = await bcrypt.hash('client123', 10);
  await prisma.user.create({
    data: { email: 'client@example.com', passwordHash: clientPass, role: 'CLIENT' },
  });

  // Create sample products
  const products = [
    { name: 'Anillo Solitario Clásico', category: 'Anillos', material: 'Oro 18k', priceBase: 15000, imageUrl: '' },
    { name: 'Argollas Minimalistas', category: 'Anillos', material: 'Platino', priceBase: 22000, imageUrl: '' },
    { name: 'Collar Gota de Luz', category: 'Collares', material: 'Oro Blanco', priceBase: 12500, imageUrl: '' },
  ];
  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log('✅ Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
