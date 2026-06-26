import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@admin';
  const plainPassword = 'password123';
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    await prisma.user.update({
      where: { email },
      data: { passwordHash, role: 'ADMIN' }
    });
    console.log('Admin password reset successfully!');
  } else {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'ADMIN'
      }
    });
    console.log('Admin user created successfully!');
  }
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
