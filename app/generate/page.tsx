"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Check, FileText, Download, Loader2, Lock,
  CheckCircle2, AlertCircle, ChevronRight, ImageUp, X,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PreviewGallery } from "@/components/PreviewGallery";
import { PaymentModal } from "@/components/PaymentModal";
import {
  CompanyData, emptyCompany, ENTITY_TYPES, INDUSTRIES, STATES,
} from "@/lib/types";
import { DOCUMENTS, documentsByCategory, CATEGORY_ORDER, getDocument } from "@/lib/documents";
import { downloadOne, downloadBundle } from "@/lib/render/bundle";
import { verifyDodoPayment, loadPendingCompany, clearPendingCompany } from "@/lib/payment";

type Step = 1 | 2 | 3;

const STEPS = [
  { n: 1, label: "Company details" },
  { n: 2, label: "Preview the kit" },
  { n: 3, label: "Pay & download" },
] as const;

// A small, curated set of titles we tease (blurred). The rest stay hidden
// behind the "+N more" lock so the full list isn't exposed before payment.
const TEASER_IDS = [
  "offer-letter",
  "employment-agreement",
  "employee-nda-noncompete",
  "posh-policy",
  "separation-agreement",
];

export default function GeneratePage() {
  const [step, setStep] = useState<Step>(1);
  const [company, setCompany] = useState<CompanyData>(emptyCompany());
  const [paid, setPaid] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  // Handle the return from Dodo's hosted checkout: verify + restore + unlock.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("dodo") !== "return") return;
    const paymentId = params.get("payment_id");
    const status = (params.get("status") || "").toLowerCase();

    (async () => {
      setVerifying(true);
      const restored = loadPendingCompany<CompanyData>();
      if (restored) setCompany(restored);

      let ok = false;
      if (paymentId) ok = await verifyDodoPayment(paymentId);
      else if (["succeeded", "paid", "active", "completed"].includes(status)) ok = true;

      if (ok) {
        clearPendingCompany();
        setPaid(true);
      } else {
        setPayError("We couldn't confirm your payment. If you were charged, contact support and we'll sort it out.");
      }
      setStep(3);
      setVerifying(false);
      window.history.replaceState({}, "", "/generate");
    })();
  }, []);

  const byCat = documentsByCategory();
  const errors = useMemo(() => validate(company), [company]);
  const canProceed = Object.keys(errors).length === 0;

  const teasers = useMemo(
    () => TEASER_IDS.map((id) => getDocument(id)).filter(Boolean) as typeof DOCUMENTS,
    []
  );
  const remaining = DOCUMENTS.length - teasers.length;

  function update<K extends keyof CompanyData>(key: K, value: CompanyData[K]) {
    setCompany((c) => ({ ...c, [key]: value }));
  }

  function goStep2() {
    setTouched(true);
    if (canProceed) setStep(2);
  }

  async function handleDownloadAll() {
    setDownloadingAll(true);
    try {
      await downloadBundle(DOCUMENTS, company);
    } finally {
      setDownloadingAll(false);
    }
  }

  async function handleDownloadOne(id: string) {
    const def = getDocument(id);
    if (!def) return;
    setBusyId(id);
    try {
      await downloadOne(def, company);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="min-h-screen bg-grid">
      <header className="sticky top-0 z-30 border-b border-line/80 bg-paper-100/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <Logo />
          <Stepper step={step} />
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-ink-muted md:hidden">Step {step}/3</span>
            <Link href="/" className="hidden text-sm font-medium text-ink-muted hover:text-ink sm:inline">
              ← Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-7 sm:px-5 sm:py-8">
        {payError && (
          <div className="mb-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {payError}
          </div>
        )}

        {step === 1 && (
          <CompanyStep company={company} update={update} errors={errors} touched={touched} onNext={goStep2} />
        )}

        {step === 2 && (
          <section>
            <p className="eyebrow">Step 2</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Your kit is ready to preview
            </h1>
            <p className="mt-1.5 text-ink-soft">
              {DOCUMENTS.length} documents, each filled with{" "}
              {company.brandName || company.legalName || "your company"}&apos;s details. Swipe
              through a few — the full, editable files unlock after checkout.
            </p>

            <div className="mt-6">
              <PreviewGallery
                company={company}
                teasers={teasers}
                remaining={remaining}
                onUnlock={() => setStep(3)}
              />
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
              <ChevronRight className="h-3.5 w-3.5" /> Swipe to flip through the kit
            </div>

            <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
              <button onClick={() => setStep(1)} className="btn-ghost">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button onClick={() => setStep(3)} className="btn-accent">
                Continue to checkout <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <CheckoutStep
            company={company}
            byCat={byCat}
            paid={paid}
            onPay={() => setShowPay(true)}
            onBack={() => setStep(2)}
            onDownloadAll={handleDownloadAll}
            onDownloadOne={handleDownloadOne}
            downloadingAll={downloadingAll}
            busyId={busyId}
          />
        )}
      </div>

      <PaymentModal
        open={showPay}
        onClose={() => setShowPay(false)}
        onSuccess={() => { setPaid(true); setShowPay(false); }}
        name={company.signatoryName}
        email={company.email}
        company={company}
        docCount={DOCUMENTS.length}
      />

      {verifying && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-lift">
            <Loader2 className="h-5 w-5 animate-spin text-primary" /> Confirming your payment…
          </div>
        </div>
      )}
    </main>
  );
}

// ---------------------------------------------------------------------------

function validate(c: CompanyData): Record<string, string> {
  const e: Record<string, string> = {};
  if (!c.legalName.trim()) e.legalName = "Required";
  if (!c.city.trim()) e.city = "Required";
  if (!c.signatoryName.trim()) e.signatoryName = "Required";
  if (!c.email.trim()) e.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) e.email = "Enter a valid email";
  return e;
}

function Stepper({ step }: { step: Step }) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex items-center gap-2">
          <span
            className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
              step >= s.n ? "bg-brand-600 text-chalk" : "bg-paper-200 text-ink-muted"
            }`}
          >
            {step > s.n ? <Check className="h-3.5 w-3.5" /> : s.n}
          </span>
          <span className={`text-sm ${step >= s.n ? "font-semibold text-ink" : "text-ink-muted"}`}>
            {s.label}
          </span>
          {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-line" />}
        </div>
      ))}
    </div>
  );
}

function Field({
  label, value, onChange, error, placeholder, type = "text", touched,
}: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; type?: string; touched?: boolean;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type={type}
        className={`field-input ${touched && error ? "border-red-300 focus:ring-red-100" : ""}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {touched && error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void; options: readonly string[];
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <select className="field-input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function CompanyStep({
  company, update, errors, touched, onNext,
}: {
  company: CompanyData;
  update: <K extends keyof CompanyData>(k: K, v: CompanyData[K]) => void;
  errors: Record<string, string>;
  touched: boolean;
  onNext: () => void;
}) {
  function handleLogo(file: File) {
    if (!/image\/(png|jpeg)/.test(file.type)) {
      alert("Please upload a PNG or JPEG image.");
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Logo must be under 1.5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      const img = new window.Image();
      img.onload = () => {
        const maxH = 64;
        const maxW = 200;
        const scale = Math.min(maxH / img.naturalHeight, maxW / img.naturalWidth, 1);
        update("logoDataUrl", dataUrl);
        update("logoW", Math.max(1, Math.round(img.naturalWidth * scale)));
        update("logoH", Math.max(1, Math.round(img.naturalHeight * scale)));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  return (
    <section>
      <p className="eyebrow">Step 1</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Tell us about your company</h1>
      <p className="mt-1.5 text-ink-soft">
        We use these details to fill every document. Optional fields can be left blank — they&apos;ll
        appear as editable brackets you can complete later.
      </p>

      <div className="mt-7 card p-5 sm:p-6">
        <h3 className="mb-4 eyebrow">Company</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Legal name *" value={company.legalName} onChange={(v) => update("legalName", v)}
            error={errors.legalName} touched={touched} placeholder="Acme Technologies Pvt Ltd" />
          <Field label="Brand / trade name" value={company.brandName} onChange={(v) => update("brandName", v)} placeholder="Acme" />
          <Select label="Entity type" value={company.entityType}
            onChange={(v) => update("entityType", v as CompanyData["entityType"])} options={ENTITY_TYPES} />
          <Select label="Industry" value={company.industry}
            onChange={(v) => update("industry", v as CompanyData["industry"])} options={INDUSTRIES} />
          <Field label="CIN / Registration no." value={company.cin} onChange={(v) => update("cin", v)} placeholder="U72900KA2024PTC000000" />
          <Select label="Approx. team size" value={company.headcount}
            onChange={(v) => update("headcount", v)} options={["1-9", "10-50", "51-200", "200+"]} />
        </div>

        <h3 className="mb-4 mt-7 eyebrow">Registered office</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Address" value={company.address} onChange={(v) => update("address", v)} placeholder="2nd Floor, 14 MG Road" />
          </div>
          <Field label="City *" value={company.city} onChange={(v) => update("city", v)}
            error={errors.city} touched={touched} placeholder="Bengaluru" />
          <Select label="State (jurisdiction)" value={company.state} onChange={(v) => update("state", v)} options={STATES} />
          <Field label="PIN code" value={company.pincode} onChange={(v) => update("pincode", v)} placeholder="560001" />
          <Field label="Website" value={company.website} onChange={(v) => update("website", v)} placeholder="https://acme.com" />
        </div>

        <h3 className="mb-4 mt-7 eyebrow">Authorised signatory &amp; contact</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Signatory name *" value={company.signatoryName} onChange={(v) => update("signatoryName", v)}
            error={errors.signatoryName} touched={touched} placeholder="Riya Sharma" />
          <Field label="Signatory designation" value={company.signatoryDesignation} onChange={(v) => update("signatoryDesignation", v)} placeholder="Director" />
          <Field label="Email *" type="email" value={company.email} onChange={(v) => update("email", v)}
            error={errors.email} touched={touched} placeholder="founder@acme.com" />
          <Field label="Phone" value={company.phone} onChange={(v) => update("phone", v)} placeholder="+91 98765 43210" />
        </div>

        <h3 className="mb-4 mt-7 eyebrow">Optional — company logo</h3>
        <p className="-mt-2 mb-4 text-xs text-ink-muted">
          Upload a PNG or JPEG logo and it&apos;s printed on the letterhead of every generated document.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid h-16 w-28 place-items-center overflow-hidden rounded-xl border border-dashed border-line bg-white">
            {company.logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={company.logoDataUrl} alt="Company logo preview" className="max-h-14 max-w-[100px] object-contain" />
            ) : (
              <ImageUp className="h-6 w-6 text-ink-muted" />
            )}
          </div>
          <div className="flex items-center gap-3">
            <label className="btn-ghost cursor-pointer py-2.5 text-sm">
              {company.logoDataUrl ? "Replace logo" : "Upload logo"}
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleLogo(f);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            {company.logoDataUrl && (
              <button
                type="button"
                onClick={() => {
                  update("logoDataUrl", "");
                  update("logoW", 0);
                  update("logoH", 0);
                }}
                className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"
              >
                <X className="h-3.5 w-3.5" /> Remove
              </button>
            )}
          </div>
        </div>

        <h3 className="mb-4 mt-7 eyebrow">Optional — pre-fill HR letters</h3>
        <p className="-mt-2 mb-4 text-xs text-ink-muted">
          Fill these to pre-populate the offer / appointment / internship letters for one person.
          Leave blank to keep them as editable placeholders.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Candidate name" value={company.candidateName} onChange={(v) => update("candidateName", v)} placeholder="Arjun Mehta" />
          <Field label="Designation" value={company.candidateRole} onChange={(v) => update("candidateRole", v)} placeholder="Software Engineer" />
          <Field label="Annual CTC" value={company.candidateCtc} onChange={(v) => update("candidateCtc", v)} placeholder="₹12,00,000" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Link href="/" className="btn-ghost">
          <ArrowLeft className="h-4 w-4" /> Cancel
        </Link>
        <button onClick={onNext} className="btn-accent">
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function CheckoutStep({
  company, byCat, paid, onPay, onBack, onDownloadAll, onDownloadOne, downloadingAll, busyId,
}: {
  company: CompanyData;
  byCat: ReturnType<typeof documentsByCategory>;
  paid: boolean;
  onPay: () => void;
  onBack: () => void;
  onDownloadAll: () => void;
  onDownloadOne: (id: string) => void;
  downloadingAll: boolean;
  busyId: string | null;
}) {
  if (paid) {
    return (
      <section>
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-4">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-brand-400" />
          <div>
            <p className="font-semibold text-foreground">Payment successful — your kit is unlocked</p>
            <p className="text-sm text-muted-foreground">Download everything below as editable Word files.</p>
          </div>
        </div>

        <div className="overflow-hidden card">
          {CATEGORY_ORDER.map((cat) => (
            <div key={cat}>
              <p className="border-b border-line bg-paper-100 px-4 py-2 eyebrow sm:px-5">{cat}</p>
              <div className="divide-y divide-line">
                {byCat[cat].map((d) => (
                  <div key={d.id} className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <FileText className="h-4 w-4 shrink-0 text-brand-500" />
                      <p className="truncate text-sm font-medium text-ink">{d.name}</p>
                    </div>
                    <button
                      onClick={() => onDownloadOne(d.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-muted"
                    >
                      {busyId === d.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                      .docx
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onDownloadAll} disabled={downloadingAll} className="btn-primary">
            {downloadingAll ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Preparing zip…</>
            ) : (
              <><Download className="h-4 w-4" /> Download all as zip</>
            )}
          </button>
        </div>
      </section>
    );
  }

  // Pre-payment: show counts only, never the document names.
  return (
    <section>
      <p className="eyebrow">Step 3</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Unlock your kit</h1>
      <p className="mt-1.5 text-ink-soft">
        The complete kit for {company.brandName || company.legalName || "your company"} —
        filled, formatted and ready to edit.
      </p>

      <div className="mt-6 overflow-hidden rounded-3xl border-2 border-brand-500/40 bg-board shadow-lift">
        <div className="px-6 py-7 text-white">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-chalk/80">Founder starter kit</p>
              <p className="text-2xl font-bold">{DOCUMENTS.length} documents</p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold leading-none">₹499</p>
              <p className="mt-1 text-xs text-chalk/60">one-time</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((cat) => (
              <span key={cat} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-chalk/90">
                <Lock className="h-3 w-3" /> {cat} · {byCat[cat].length}
              </span>
            ))}
          </div>

          <button onClick={onPay} className="btn-accent mt-6 w-full py-3.5 text-base">
            <Lock className="h-4 w-4" /> Pay ₹499 &amp; unlock all {DOCUMENTS.length}
          </button>
          <p className="mt-3 text-center text-xs text-chalk/50">
            Instant download · editable .docx · one-time payment
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <p className="inline-flex max-w-[60%] items-start gap-1.5 text-right text-xs text-ink-muted">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Templates for informational use — not a substitute for legal advice.
        </p>
      </div>
    </section>
  );
}
