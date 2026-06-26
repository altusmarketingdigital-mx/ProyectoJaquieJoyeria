const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users in DB:");
  users.forEach(u => console.log(`- Email: ${u.email}, Role: ${u.role}`));
}

main().finally(() => prisma.$disconnect());
