import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export async function createLead(req: Request, res: Response) {
  try {
    const { contact, source, locale } = req.body as {
      contact: string;
      source?: string;
      locale?: string;
    };

    if (!contact) {
      res.status(400).json({ error: "contact is required" });
      return;
    }

    const lead = await prisma.lead.create({
      data: { contact, source: source || "popup", locale: locale || "zh" },
    });

    res.status(201).json({ id: lead.id });
  } catch {
    res.status(500).json({ error: "Failed to save lead" });
  }
}
