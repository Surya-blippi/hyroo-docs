"use client";

import { useState } from "react";
import { Lock, Loader2, X, ShieldCheck, CreditCard } from "lucide-react";
import { PRICE_INR, dodoEnabled, startDodoCheckout } from "@/lib/payment";
import { CompanyData } from "@/lib/types";

export function PaymentModal({
  open,
  onClose,
  onSuccess,
  name,
  email,
  company,
  docCount,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  name: string;
  email: string;
  company: CompanyData;
  docCount: number;
}) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDemo = !dodoEnabled();

  if (!open) return null;

  async function pay() {
    setError(null);
    setProcessing(true);
    try {
      const res = await startDodoCheckout({ name, email, company });
      if (!res.configured) {
        // Dodo not set up → demo: simulate a successful gateway round-trip.
        await new Promise((r) => setTimeout(r, 1000));
        onSuccess();
        return;
      }
      if (res.ok) {
        // Redirecting to Dodo's hosted checkout — keep the spinner up.
        return;
      }
      setError(res.error || "Payment could not be started. Please try again.");
      setProcessing(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-0 backdrop-blur-sm sm:place-items-center sm:p-4">
      <div className="w-full max-w-md overflow-hidden rounded-t-3xl border border-border bg-popover shadow-lift sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <Lock className="h-4 w-4 text-primary" /> Secure checkout
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-end justify-between rounded-2xl border border-border bg-muted/50 px-5 py-4">
            <div>
              <p className="text-sm font-medium text-primary">Founder starter kit</p>
              <p className="text-xs text-muted-foreground">{docCount} editable documents</p>
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground">₹{PRICE_INR}</div>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Instant download, one-time payment</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Fully editable Word files</li>
          </ul>

          {error && (
            <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
          )}

          <button onClick={pay} disabled={processing} className="btn-accent mt-6 w-full py-3.5 text-base">
            {processing ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
            ) : (
              <><CreditCard className="h-4 w-4" /> Pay ₹{PRICE_INR}</>
            )}
          </button>

          {isDemo ? (
            <p className="mt-3 text-center text-xs text-ink-muted">
              Demo mode — no real payment is charged. Configure Dodo Payments to go live.
            </p>
          ) : (
            <p className="mt-3 text-center text-xs text-ink-muted">
              Secure checkout by Dodo Payments. You&apos;ll be redirected to complete payment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
