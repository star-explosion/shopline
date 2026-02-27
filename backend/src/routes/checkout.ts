import { Router, Request, Response } from "express";
import { prisma } from "../prisma/client";
import { stripe } from "../lib/stripe";

function parseProductImages<T extends { images: string }>(product: T) {
  return { ...product, images: JSON.parse(product.images || "[]") as string[] };
}

const router = Router();

/**
 * POST /api/checkout
 * Creates a Stripe Checkout Session and a pending order.
 * Prices are always recalculated from the database — never trust the frontend.
 */
router.post("/", async (req: Request, res: Response) => {
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

    for (const item of items) {
      const product = productMap.get(item.productId)!;
      if (product.stock < item.quantity) {
        res.status(400).json({
          error: `Insufficient stock for "${product.name}"`,
        });
        return;
      }
    }

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

    const lineItems = order.items.map((item) => ({
      price_data: {
        currency: "cny",
        product_data: {
          name: item.product.name,
          description: item.product.description.slice(0, 200),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      metadata: { orderId: String(order.id) },
      success_url: `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/checkout/cancel`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    res.json({ url: session.url, orderId: order.id });
  } catch (error) {
    console.error("Checkout session creation failed:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

/**
 * GET /api/checkout/session-status?session_id=cs_xxx
 * Looks up the order associated with a Stripe session ID.
 */
router.get("/session-status", async (req: Request, res: Response) => {
  try {
    const sessionId = req.query.session_id as string;

    if (!sessionId) {
      res.status(400).json({ error: "session_id is required" });
      return;
    }

    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: { items: { include: { product: true } }, user: true },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found for this session" });
      return;
    }

    const parsed = {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: parseProductImages(item.product),
      })),
    };
    res.json(parsed);
  } catch (error) {
    console.error("Session status lookup failed:", error);
    res.status(500).json({ error: "Failed to look up session status" });
  }
});

export default router;
