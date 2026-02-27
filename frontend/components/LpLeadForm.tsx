"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Props {
  source: string;
  locale: string;
}

export default function LpLeadForm({ source, locale }: Props) {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim()) return;
    setLoading(true);
    setError("");
    try {
      await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, source, locale }),
      });
      setSuccess(true);
      setContact("");
    } catch {
      setError("提交失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-[#C6A86B]/10 border border-[#C6A86B]/30 px-6 py-5 text-center">
        <p className="text-[#C6A86B] font-medium text-sm">✓ 已收到您的联系方式</p>
        <p className="text-white/50 text-xs mt-1">我们将在24小时内联系您</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="手机号或邮箱"
        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-[#C6A86B] transition-colors"
        required
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-[#C6A86B] text-white text-sm tracking-widest hover:bg-[#A8884A] transition-colors disabled:opacity-50"
      >
        {loading ? "提交中..." : "立即获取报价"}
      </button>
      <p className="text-white/30 text-[10px] text-center">您的信息将被严格保密</p>
    </form>
  );
}
