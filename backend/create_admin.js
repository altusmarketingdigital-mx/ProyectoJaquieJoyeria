const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@admin';
  const password = '123';
  
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('User already exists');
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log('Created user:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
