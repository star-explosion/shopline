import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export async function createEvent(req: Request, res: Response) {
  try {
    const { type, productId, sessionId, userAgent } = req.body as {
      type: string;
      productId?: number;
      sessionId: string;
      userAgent: string;
    };

    if (!type || !sessionId) {
      res.status(400).json({ error: "type and sessionId are required" });
      return;
    }

    const event = await prisma.event.create({
      data: { type, productId: productId ?? null, sessionId, userAgent: userAgent || "" },
    });

    res.status(201).json({ id: event.id });
  } catch {
    res.status(500).json({ error: "Failed to record event" });
  }
}
