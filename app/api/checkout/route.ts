import { NextRequest, NextResponse } from "next/server";

// Dodo Payments - create a hosted Checkout Session for the one-time kit.
// Docs: POST {base}/checkouts  → returns { checkout_url }
function apiBase() {
  return process.env.DODO_MODE === "live"
    ? "https://live.dodopayments.com"
    : "https://test.dodopayments.com";
}

export async function POST(req: NextRequest) {
  const key = process.env.DODO_PAYMENTS_API_KEY;
  const productId = process.env.DODO_PRODUCT_ID;

  // Not configured → 501 so the client falls back to demo mode.
  if (!key || !productId) {
    return NextResponse.json(
      { error: "Dodo Payments not configured. Set DODO_PAYMENTS_API_KEY and DODO_PRODUCT_ID." },
      { status: 501 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const name: string = body?.name || "";
  const email: string = body?.email || "";
  const origin = req.headers.get("origin") || new URL(req.url).origin;

  const payload: Record<string, unknown> = {
    product_cart: [{ product_id: productId, quantity: 1 }],
    return_url: `${origin}/generate?dodo=return`,
  };
  if (email) payload.customer = { email, name: name || email };

  const res = await fetch(`${apiBase()}/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text();
    return NextResponse.json({ error: "checkout_failed", detail }, { status: 502 });
  }

  const data = await res.json();
  const checkout_url = data.checkout_url || data.url || data.payment_link;
  if (!checkout_url) {
    return NextResponse.json({ error: "no_checkout_url", detail: data }, { status: 502 });
  }
  return NextResponse.json({ checkout_url, session_id: data.session_id || data.id });
}
