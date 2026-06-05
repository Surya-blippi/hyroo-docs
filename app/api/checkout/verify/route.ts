import { NextRequest, NextResponse } from "next/server";

// Verify a Dodo payment server-side after the customer returns.
// Docs: GET {base}/payments/{payment_id} → { status: "succeeded" | ... }
function apiBase() {
  return process.env.DODO_MODE === "live"
    ? "https://live.dodopayments.com"
    : "https://test.dodopayments.com";
}

const PAID = new Set(["succeeded", "paid", "completed", "active"]);

export async function GET(req: NextRequest) {
  const key = process.env.DODO_PAYMENTS_API_KEY;
  const paymentId = new URL(req.url).searchParams.get("payment_id");

  if (!key) {
    return NextResponse.json({ paid: false, error: "not_configured" }, { status: 501 });
  }
  if (!paymentId) {
    return NextResponse.json({ paid: false, error: "missing_payment_id" }, { status: 400 });
  }

  const res = await fetch(`${apiBase()}/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ paid: false, status: "unknown" });
  }

  const data = await res.json();
  const status = String(data.status || "").toLowerCase();
  return NextResponse.json({ paid: PAID.has(status), status });
}
