import { getTranslations } from "next-intl/server";
import AdminDashboardClient from "./AdminDashboardClient";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface FunnelStep {
  step: string;
  count: number;
}

interface Lead {
  id: number;
  contact: string;
  source: string;
  locale: string;
  createdAt: string;
}

interface Stats {
  totalOrders: number;
  revenue: number;
  leadsCount: number;
  funnel: FunnelStep[];
  recentLeads: Lead[];
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AdminPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });

  let stats: Stats = {
    totalOrders: 0,
    revenue: 0,
    leadsCount: 0,
    funnel: [],
    recentLeads: [],
  };

  try {
    const res = await fetch(`${API}/api/admin/stats`, { cache: "no-store" });
    if (res.ok) stats = await res.json();
  } catch {
    // backend may not be running
  }

  const totalVisits = stats.funnel.find((f) => f.step === "view_homepage")?.count ?? 0;
  const productViews = stats.funnel.find((f) => f.step === "view_product")?.count ?? 0;

  return (
    <AdminDashboardClient
      stats={stats}
      totalVisits={totalVisits}
      productViews={productViews}
      labels={{
        title: t("title"),
        totalVisits: t("totalVisits"),
        productViews: t("productViews"),
        orders: t("orders"),
        revenue: t("revenue"),
        funnelTitle: t("funnelTitle"),
        leadsTitle: t("leadsTitle"),
        contact: t("contact"),
        source: t("source"),
        locale: t("locale"),
        time: t("time"),
      }}
    />
  );
}
