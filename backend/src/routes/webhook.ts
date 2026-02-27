import { Router, Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../prisma/client";
import { stripe } from "../lib/stripe";

const router = Router();

/**
 * POST /api/webhook
 * Stripe webhook handler. Must receive raw body (not JSON-parsed)
 * for signature verification. The raw body middleware is applied
 * in index.ts before this route is mounted.
 */
router.post("/", async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    res.status(500).json({ error: "Webhook secret not configured" });
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    res.status(400).json({ error: `Webhook Error: ${message}` });
    return;
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        await prisma.order.update({
          where: { stripeSessionId: session.id },
          data: {
            status: "paid",
            paymentIntentId: session.payment_intent as string,
          },
        });

        console.log(`Order paid — session ${session.id}`);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        await prisma.order.updateMany({
          where: { stripeSessionId: session.id, status: "pending" },
          data: { status: "cancelled" },
        });

        console.log(`Order cancelled (session expired) — session ${session.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook event:", error);
    res.status(500).json({ error: "Webhook handler failed" });
    return;
  }

  res.json({ received: true });
});

export default router;
