const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const certs = await prisma.jewelryCertificate.findMany();
  for (const cert of certs) {
    console.log(`Cert ID: ${cert.id}`);
    console.log(`pdfPath: ${cert.pdfPath}`);
    console.log(`Exists on disk? ${fs.existsSync(cert.pdfPath)}`);
  }
}

main().finally(() => prisma.$disconnect());
