import Link from "next/link";
import {
  ArrowRight, FileText, ShieldCheck, Clock, Download,
  Building2, ScrollText, Users, Scale, Lock, Check,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TweetEmbed } from "@/components/TweetEmbed";
import { WhatsAppFab, WhatsAppLink, WHATSAPP_DISPLAY } from "@/components/WhatsApp";
import { HeroSection } from "@/components/ui/hero-with-product-mockup";
import { DOCUMENTS, documentsByCategory, CATEGORY_ORDER } from "@/lib/documents";
import { DocCategory } from "@/lib/types";

const CATEGORY_ICON: Record<DocCategory, typeof Users> = {
  "HR & Employee Contracts": Users,
  "Employee Policies": ScrollText,
  "Company Legal Contracts": Scale,
  "Compliance & Governance": ShieldCheck,
};

const CATEGORY_BLURB: Record<DocCategory, string> = {
  "HR & Employee Contracts": "Offer to exit — every contract to hire and manage your team, compliantly.",
  "Employee Policies": "The day-to-day policies your team operates by.",
  "Company Legal Contracts": "Protect your IP and deals with vendors, partners and contractors.",
  "Compliance & Governance": "The statutory pieces you can't skip — starting with POSH.",
};

const VALUE_PROPS = [
  { icon: Building2, title: "Lawyers quote ₹15,000+", body: "A founder shouldn't pay a fortune for a first NDA or appointment letter. Hyroo gives you the same essentials for ₹499." },
  { icon: ShieldCheck, title: "Compliance you'd miss", body: "A written appointment letter is mandatory under the Shops & Establishments Act. A POSH policy is required for every workplace. We bake these in." },
  { icon: Clock, title: "Hours of templates, gone", body: "Stop stitching together random Google Doc templates. Answer once, and every document is filled with your company's details." },
];

const STEPS = [
  { n: "01", icon: Building2, title: "Tell us about your company", body: "Legal name, entity type, industry, address and signatory. We use it to fill every document." },
  { n: "02", icon: FileText, title: "Preview your documents", body: "Flip through your kit, filled with your details — the full editable files unlock at checkout." },
  { n: "03", icon: Download, title: "Pay ₹499, download all", body: "Get every document as an editable Word file in one zip — ready to tweak, sign and use." },
];

const TWEET_URL = "https://x.com/chiragiscooking/status/2062064028990775481";

const REASONS = [
  { title: "Customised to your industry", body: "Fintech, SaaS, healthcare and more — clauses tailored to how your company actually operates." },
  { title: "Vetted by professional lawyers", body: "Every template is reviewed by qualified advocates, not generated blindly." },
  { title: "A one-time investment", body: "Pay ₹499 once. No subscriptions, no per-document charges, ever." },
  { title: "No risk of missing a compliance", body: "POSH, the mandatory appointment letter, DPDP — the pieces you can't skip are built in." },
];

const PRICE_FEATURES = [
  `All ${DOCUMENTS.length} documents, fully filled`,
  "Editable Word (.docx) files",
  "Tailored to your state & industry",
  "POSH policy adapted to your team size",
  "Download the whole kit as one zip",
];

export default function Home() {
  const byCat = documentsByCategory();

  return (
    <main className="min-h-screen bg-background">
      {/* Floating pill nav */}
      <div className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
        <nav className="flex items-center gap-4 rounded-full border border-border bg-background/70 px-5 py-2.5 shadow-2xl backdrop-blur-md sm:gap-6 sm:px-6">
          <Logo />
          <div className="hidden h-4 w-px bg-border md:block" />
          <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#documents" className="transition-colors hover:text-foreground">Documents</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/generate" className="btn-primary h-9 px-5 py-0">Get my kit</Link>
          </div>
        </nav>
      </div>

      {/* Hero — product-mockup style */}
      <HeroSection />
      <div className="pointer-events-none -mt-32 h-32 w-full bg-gradient-to-t from-background to-transparent" />

      {/* Value props */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-3">
          {VALUE_PROPS.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="card spotlight relative h-full p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-muted text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Documents — categories & counts only */}
      <section id="documents" className="scroll-mt-24 bg-grid">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">The full kit</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                Everything you need to <span className="text-muted-foreground">hire and operate.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {DOCUMENTS.length} documents across four areas — each automatically filled with your
                company details and jurisdiction. Start the flow to preview them live.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {CATEGORY_ORDER.map((cat, i) => {
              const Icon = CATEGORY_ICON[cat];
              return (
                <Reveal key={cat} delay={i * 80}>
                  <div className="card spotlight relative flex h-full items-start gap-4 p-7">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-muted text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold tracking-tight text-foreground">{cat}</h3>
                        <span className="chip">{byCat[cat].length} docs</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{CATEGORY_BLURB[cat]}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link href="/generate" className="btn-primary">
                Preview the kit <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> Previews unlock once you start — watermarked &amp; copy-protected.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-24 bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">Three steps</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              From blank page to <span className="text-muted-foreground">signed kit.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="card spotlight group relative h-full overflow-hidden p-8">
                  <span className="absolute -right-3 -top-5 text-9xl font-extrabold leading-none text-foreground/[0.04]">{s.n}</span>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-muted text-primary transition-colors group-hover:text-foreground">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <span className="text-3xl font-bold text-muted-foreground/40 transition-colors group-hover:text-foreground">{s.n}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hyroo — reasons + social proof */}
      <section className="bg-grid">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow">Why Hyroo</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built right, so you <span className="text-muted-foreground">don&apos;t have to worry.</span>
              </h2>
              <ul className="mt-8 space-y-5">
                {REASONS.map((r) => (
                  <li key={r.title} className="flex items-start gap-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-muted text-primary">
                      <Check className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{r.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="flex flex-col items-center">
              <TweetEmbed url={TWEET_URL} className="w-full max-w-md" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing — dark CTA island in both themes */}
      <section id="pricing" className="scroll-mt-24 bg-grid">
        <div className="mx-auto max-w-md px-4 py-20 sm:px-6 md:py-28">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border-2 border-brand-500/50 bg-board shadow-lift">
              <div className="border-b border-white/10 px-8 py-8 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                  Founder starter kit
                </span>
                <div className="mt-4 flex items-end justify-center gap-1">
                  <span className="text-6xl font-bold tracking-tight text-white">₹499</span>
                  <span className="mb-2 text-sm text-white/60">one-time</span>
                </div>
                <p className="mt-2 text-sm text-white/70">Everything below, instantly.</p>
              </div>
              <div className="px-8 py-7">
                <ul className="space-y-3 text-sm text-white/85">
                  {PRICE_FEATURES.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" /> {t}
                    </li>
                  ))}
                </ul>
                <Link href="/generate" className="btn-accent mt-7 h-12 w-full text-base">
                  Build my kit <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-center text-xs text-white/50">
                  Templates for informational use — not a substitute for legal advice.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-border bg-background">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-sm text-muted-foreground sm:px-6">
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
            <Logo />
            <p className="text-center">© {new Date().getFullYear()} Hyroo. HR &amp; legal paperwork for Indian startups.</p>
            <p className="text-center text-xs">Not a law firm. Templates are not legal advice.</p>
          </div>
          <div className="flex flex-col items-center gap-1 border-t border-border pt-5 text-center md:flex-row md:gap-2">
            <span>Questions or need help?</span>
            <WhatsAppLink label={`WhatsApp us at ${WHATSAPP_DISPLAY}`} />
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-3rem] select-none text-center font-extrabold tracking-tighter text-foreground/[0.04]"
          style={{ fontSize: "clamp(4rem, 22vw, 20rem)", lineHeight: 0.8 }}
        >
          hyroo
        </div>
      </footer>

      <WhatsAppFab />
    </main>
  );
}
