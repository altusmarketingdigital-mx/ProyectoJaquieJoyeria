const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);
  
  await prisma.user.upsert({
    where: { email: 'demo@admin' },
    update: { passwordHash, role: 'ADMIN' },
    create: { email: 'demo@admin', passwordHash, role: 'ADMIN' },
  });
  console.log("Password for demo@admin reset to password123");
}

main().finally(() => prisma.$disconnect());
