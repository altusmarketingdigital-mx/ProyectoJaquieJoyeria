import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todo el catálogo
export const getCatalog = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching catalog:', error);
    res.status(500).json({ error: 'Failed to fetch catalog' });
  }
};

// Crear un nuevo producto en el catálogo
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, material, gemstone, priceBase, imageUrl } = req.body;
    
    // Validación básica
    if (!name || !category || !material || priceBase === undefined) {
      return res.status(400).json({ error: 'Name, category, material, and priceBase are required' });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        material,
        gemstone,
        priceBase,
        imageUrl
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Actualizar un producto existente
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { name, category, material, gemstone, priceBase, imageUrl } = req.body;
    
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        material,
        gemstone,
        priceBase,
        imageUrl
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Eliminar un producto del catálogo
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id }
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
