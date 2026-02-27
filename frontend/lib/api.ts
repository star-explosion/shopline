const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchProducts(page = 1, limit = 12) {
  const res = await fetch(`${API_BASE}/api/products?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id: number) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function createOrder(payload: {
  userId: number;
  items: { productId: number; quantity: number }[];
}) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function fetchOrder(id: number) {
  const res = await fetch(`${API_BASE}/api/orders/${id}`);
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

export async function createCheckoutSession(payload: {
  userId: number;
  items: { productId: number; quantity: number }[];
}): Promise<{ url: string; orderId: number }> {
  const res = await fetch(`${API_BASE}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create checkout session");
  return res.json();
}

export async function fetchSessionStatus(sessionId: string) {
  const res = await fetch(
    `${API_BASE}/api/checkout/session-status?session_id=${encodeURIComponent(sessionId)}`
  );
  if (!res.ok) throw new Error("Failed to fetch session status");
  return res.json();
}
