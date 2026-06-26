import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Anillo Solitario Diamante",
        category: "Anillo",
        material: "Oro Blanco 18K",
        gemstone: "Diamante Corte Brillante 0.5CT",
        priceBase: 24500.00,
        imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b2548e?w=500&auto=format&fit=crop&q=60"
      },
      {
        name: "Collar Zafiro Azul",
        category: "Collar",
        material: "Plata Ley .925",
        gemstone: "Zafiro Azul 1.2CT",
        priceBase: 8900.00,
        imageUrl: "https://images.unsplash.com/photo-1599643478524-fb66f7ca065b?w=500&auto=format&fit=crop&q=60"
      },
      {
        name: "Aretes Perla Cultivada",
        category: "Aretes",
        material: "Oro Amarillo 14K",
        gemstone: "Perlas Akoya",
        priceBase: 4200.00,
        imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60"
      }
    ]
  });
  console.log("Mock products seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
