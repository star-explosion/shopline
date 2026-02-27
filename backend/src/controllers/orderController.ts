import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export async function createOrder(req: Request, res: Response) {
  try {
    const { userId, items } = req.body as {
      userId: number;
      items: { productId: number; quantity: number }[];
    };

    if (!userId || !items || items.length === 0) {
      res.status(400).json({ error: "userId and items are required" });
      return;
    }

    const productIds = items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      res.status(400).json({ error: "One or more products not found" });
      return;
    }

    const productMap = new Map(products.map((p) => [p.id, p]));
    const totalPrice = items.reduce((sum, item) => {
      const product = productMap.get(item.productId)!;
      return sum + product.price * item.quantity;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        status: "pending",
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: productMap.get(item.productId)!.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    res.status(201).json({
      orderId: order.id,
      status: order.status,
      totalPrice: order.totalPrice,
      items: order.items,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } }, user: true },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
}
