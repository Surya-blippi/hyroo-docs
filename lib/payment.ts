// Payment orchestration - Dodo Payments (hosted Checkout Session).
//
// Flow:
//   1. Client asks /api/checkout to create a Dodo Checkout Session.
//   2. We persist the entered company data to localStorage, then redirect the
//      customer to Dodo's hosted checkout (session.checkout_url).
//   3. Dodo redirects back to /generate?dodo=return&payment_id=...&status=...
//   4. /generate verifies the payment via /api/checkout/verify and unlocks.
//
// If Dodo isn't configured (no API key / product), /api/checkout returns 501 and
// the UI falls back to a demo checkout so the app still runs end-to-end.

export const PRICE_INR = 499;

const PENDING_KEY = "hyroo_pending_company";

// Public flag used only to label the UI ("demo" vs "secure checkout").
export function dodoEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DODO_ENABLED === "1";
}

export function savePendingCompany(company: unknown) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(company));
  } catch {
    /* quota / unavailable - non-fatal */
  }
}

export function loadPendingCompany<T = unknown>(): T | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function clearPendingCompany() {
  try {
    localStorage.removeItem(PENDING_KEY);
  } catch {
    /* ignore */
  }
}

type StartResult = {
  configured: boolean; // false → caller should use demo mode
  ok: boolean; // true → redirect is happening
  error?: string;
};

export async function startDodoCheckout(opts: {
  name: string;
  email: string;
  company: unknown;
}): Promise<StartResult> {
  // Persist before navigating away so the kit survives the round-trip.
  savePendingCompany(opts.company);

  let res: Response;
  try {
    res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: opts.name, email: opts.email }),
    });
  } catch {
    return { configured: true, ok: false, error: "Network error. Please try again." };
  }

  if (res.status === 501) return { configured: false, ok: false };

  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    return { configured: true, ok: false, error: j.error || "Could not start checkout." };
  }

  const { checkout_url } = await res.json();
  if (!checkout_url) return { configured: true, ok: false, error: "No checkout URL returned." };

  window.location.href = checkout_url;
  return { configured: true, ok: true };
}

export async function verifyDodoPayment(paymentId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/checkout/verify?payment_id=${encodeURIComponent(paymentId)}`, {
      cache: "no-store",
    });
    if (!res.ok) return false;
    const j = await res.json();
    return Boolean(j.paid);
  } catch {
    return false;
  }
}

// Ask the server to generate the kit and email it to the buyer.
// Returns true if the email was sent; false is non-fatal (downloads still work).
export async function sendKitEmail(company: unknown, paymentId?: string): Promise<boolean> {
  try {
    const res = await fetch("/api/send-kit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, payment_id: paymentId }),
    });
    if (!res.ok) return false;
    const j = await res.json();
    return Boolean(j.sent);
  } catch {
    return false;
  }
}
