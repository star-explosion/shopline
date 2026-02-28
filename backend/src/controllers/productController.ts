import { Request, Response } from "express";
import { prisma } from "../prisma/client";

function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function parseProductFields<
  T extends { images: string; features?: string | null; specifications?: string | null }
>(product: T) {
  return {
    ...product,
    images: safeJsonParse<string[]>(product.images, []),
    features: safeJsonParse<string[]>(
      (product.features ?? undefined) as string | undefined,
      []
    ),
    specifications: safeJsonParse<Record<string, unknown>>(
      (product.specifications ?? undefined) as string | undefined,
      {}
    ),
  };
}

export async function getProducts(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.product.count(),
    ]);

    res.json({ products: products.map(parseProductFields), total, page, limit });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(parseProductFields(product));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
}
