import {
  ArrowRight, Check, CreditCard, Download, FileText, Lock, Mail,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { DOCUMENTS } from "@/lib/documents";

const DOC_COUNT = DOCUMENTS.length;

// Visual product walkthrough: enter details → locked preview → pay → delivery.
// Each step renders a miniature mockup of the real screen.

function FormMini() {
  return (
    <div className="space-y-2.5 rounded-xl border border-border bg-background p-4">
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Legal name</p>
        <div className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground">
          Acme Technologies Pvt Ltd
        </div>
      </div>
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Industry</p>
        <div className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground">
          Fintech
        </div>
      </div>
      <div className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">
        Continue <ArrowRight className="h-3 w-3" />
      </div>
    </div>
  );
}

function PreviewMini() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-white p-4">
      <p className="text-center text-[10px] font-bold uppercase tracking-wide text-zinc-800">
        Offer of Employment
      </p>
      <div className="mx-auto mt-1 h-px w-10 bg-zinc-300" />
      <div className="mt-3 space-y-1.5">
        {[100, 92, 96, 60].map((w, i) => (
          <div key={i} className="h-1.5 rounded bg-zinc-200" style={{ width: `${w}%` }} />
        ))}
        <div className="h-1.5 w-0" />
        {[96, 88].map((w, i) => (
          <div key={i} className="h-1.5 rounded bg-zinc-200" style={{ width: `${w}%` }} />
        ))}
      </div>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-zinc-300">
        Acme · Preview
      </span>
      <div className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-zinc-100 py-1.5 text-[10px] font-medium text-zinc-500">
        <Lock className="h-3 w-3" /> Unlocks after payment
      </div>
    </div>
  );
}

function PayMini() {
  return (
    <div className="space-y-2.5 rounded-xl border border-border bg-background p-4">
      <div className="flex items-end justify-between rounded-lg border border-border bg-card px-3 py-2">
        <div>
          <p className="text-[10px] font-medium text-primary">Founder starter kit</p>
          <p className="text-[10px] text-muted-foreground">{DOC_COUNT} editable documents</p>
        </div>
        <p className="text-lg font-bold text-foreground">₹499</p>
      </div>
      <div className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-[11px] font-semibold text-primary-foreground">
        <CreditCard className="h-3 w-3" /> Pay securely
      </div>
      <p className="text-center text-[10px] text-muted-foreground">One-time. No subscription.</p>
    </div>
  );
}

function DeliveryMini() {
  return (
    <div className="space-y-2.5 rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-foreground">acme-document-kit.zip</p>
            <p className="text-[10px] text-muted-foreground">{DOC_COUNT} Word files, ready to edit</p>
          </div>
        </div>
        <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-foreground">Emailed to riya@acme.com</p>
            <p className="text-[10px] text-muted-foreground">All documents attached</p>
          </div>
        </div>
        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
          <Check className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

const WALKTHROUGH = [
  { n: "01", title: "Enter your details", caption: "Company, industry, state and signatory. Two minutes, once.", Mock: FormMini },
  { n: "02", title: "Preview your documents", caption: "See real documents filled with your details, watermarked and locked.", Mock: PreviewMini },
  { n: "03", title: "Pay ₹499 once", caption: "Secure checkout. No subscriptions, no per-document charges.", Mock: PayMini },
  { n: "04", title: "Get your documents", caption: "Download every Word file instantly, and a copy lands in your inbox.", Mock: DeliveryMini },
];

export function ProductWalkthrough() {
  return (
    <section id="how" className="scroll-mt-24 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            From your details to <span className="text-muted-foreground">signed-ready documents.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WALKTHROUGH.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="card spotlight relative flex h-full flex-col p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {i < WALKTHROUGH.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 text-muted-foreground/50 lg:block" />
                  )}
                </div>
                <s.Mock />
                <h3 className="mt-4 text-base font-bold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
