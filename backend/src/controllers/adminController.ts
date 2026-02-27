import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export async function getStats(_req: Request, res: Response) {
  try {
    const [
      totalOrders,
      revenueResult,
      leadsCount,
      viewHomepage,
      viewProduct,
      addToCart,
      beginCheckout,
      purchase,
      recentLeads,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalPrice: true } }),
      prisma.lead.count(),
      prisma.event.count({ where: { type: "view_homepage" } }),
      prisma.event.count({ where: { type: "view_product" } }),
      prisma.event.count({ where: { type: "add_to_cart" } }),
      prisma.event.count({ where: { type: "begin_checkout" } }),
      prisma.event.count({ where: { type: "purchase" } }),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    ]);

    res.json({
      totalOrders,
      revenue: revenueResult._sum.totalPrice || 0,
      leadsCount,
      funnel: [
        { step: "view_homepage", count: viewHomepage },
        { step: "view_product", count: viewProduct },
        { step: "add_to_cart", count: addToCart },
        { step: "begin_checkout", count: beginCheckout },
        { step: "purchase", count: purchase },
      ],
      recentLeads,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}
