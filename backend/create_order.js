const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No users found");
    return;
  }
  
  const order = await prisma.customOrder.create({
    data: {
      userId: user.id,
      status: 'completed',
    },
  });

  console.log(`Order created with ID: ${order.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
