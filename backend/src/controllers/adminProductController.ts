import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Admin: create a new product
export async function createProduct(req: Request, res: Response) {
  const { name, category, material, gemstone, priceBase, imageUrl } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        category,
        material,
        gemstone,
        priceBase,
        imageUrl,
      },
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Admin: update an existing product
export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const { name, category, material, gemstone, priceBase, imageUrl } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { name, category, material, gemstone, priceBase, imageUrl },
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Admin: delete a product
export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Admin: list all products (could be used for management UI)
export async function listProducts(req: Request, res: Response, page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;
    const [total, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({ skip, take: limit })
    ]);
    return { data: products, total };
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
    return null;
  }
}
