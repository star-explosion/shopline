"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

interface Labels {
  title: string;
  totalVisits: string;
  productViews: string;
  orders: string;
  revenue: string;
  funnelTitle: string;
  leadsTitle: string;
  contact: string;
  source: string;
  locale: string;
  time: string;
}

interface Props {
  stats: Stats;
  totalVisits: number;
  productViews: number;
  labels: Labels;
}

const STEP_LABELS: Record<string, string> = {
  view_homepage: "首页",
  view_product: "商品页",
  add_to_cart: "加购",
  begin_checkout: "结算",
  purchase: "下单",
};

export default function AdminDashboardClient({ stats, totalVisits, productViews, labels }: Props) {
  const statCards = [
    { label: labels.totalVisits, value: totalVisits.toLocaleString() },
    { label: labels.productViews, value: productViews.toLocaleString() },
    { label: labels.orders, value: stats.totalOrders.toLocaleString() },
    { label: labels.revenue, value: `¥${stats.revenue.toLocaleString()}` },
  ];

  const funnelData = stats.funnel.map((f) => ({
    name: STEP_LABELS[f.step] ?? f.step,
    count: f.count,
  }));

  return (
    <div className="min-h-screen bg-[#F8F8F6] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <h1 className="font-display text-3xl text-[#111111] mb-8">{labels.title}</h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-xs text-[#6B6B6B] tracking-widest mb-2">{card.label}</p>
              <p className="font-display text-3xl text-[#C6A86B]">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Funnel chart */}
        <div className="bg-white border border-[#E2DDD6] p-6 mb-8">
          <h2 className="text-sm font-semibold text-[#111111] tracking-widest mb-6">
            {labels.funnelTitle}
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B6B6B" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6B6B6B" }} />
                <Tooltip
                  contentStyle={{ border: "1px solid #E2DDD6", borderRadius: 0, fontSize: 12 }}
                />
                <Bar dataKey="count" radius={0}>
                  {funnelData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index === 0 ? "#C6A86B" : `rgba(198,168,107,${0.9 - index * 0.15})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-white border border-[#E2DDD6]">
          <div className="px-6 py-4 border-b border-[#E2DDD6]">
            <h2 className="text-sm font-semibold text-[#111111] tracking-widest">
              {labels.leadsTitle} ({stats.leadsCount})
            </h2>
          </div>
          {stats.recentLeads.length === 0 ? (
            <div className="px-6 py-10 text-center text-xs text-[#6B6B6B]">暂无线索数据</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#E2DDD6]">
                    {[labels.contact, labels.source, labels.locale, labels.time].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-[#6B6B6B] tracking-widest font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DDD6]">
                  {stats.recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#F8F8F6] transition-colors">
                      <td className="px-6 py-3 text-[#111111] font-medium">{lead.contact}</td>
                      <td className="px-6 py-3 text-[#6B6B6B]">{lead.source}</td>
                      <td className="px-6 py-3 text-[#6B6B6B]">{lead.locale}</td>
                      <td className="px-6 py-3 text-[#6B6B6B]">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
