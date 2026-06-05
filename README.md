# Hyroo

**HR & legal paperwork for Indian startups — a full document kit at ₹499.**

A first-time founder answers a few questions about their company (legal name, entity
type, industry, address, team size, signatory). Hyroo instantly generates a complete
kit of **editable, India-ready documents**, fills them with the company's details and
jurisdiction, lets the user preview each one live, and — after a ₹499 payment — download
them all as `.docx` in a single zip.

## What's inside the kit (12 documents)

| Category | Documents |
| --- | --- |
| **Hiring & HR** | Offer Letter · Appointment Letter / Employment Agreement · Internship Agreement · Experience / Relieving Letter |
| **Policies** | POSH Policy · Leave Policy |
| **Agreements** | Employee NDA & IP Assignment · Mutual NDA · Consultant / Freelancer Agreement · Founders' Agreement |
| **Website** | Privacy Policy · Terms of Service |

### Why these, and why they're "thought hard"

- **Appointment letter** — mandatory in writing under the Shops & Establishments Act.
- **POSH policy** — required for every workplace under the 2013 Act. The generated policy
  **adapts to team size**: at 10+ employees it constitutes an Internal Committee (with the
  statutory composition — Presiding Officer, two members, one external member, ≥½ women);
  below 10 it routes complaints to the District Local Committee.
- **Employee NDA + IP assignment** — the single most important doc for a startup; includes
  an India-aware note that post-employment non-competes are generally unenforceable under
  §27 of the Contract Act, while confidentiality and non-solicitation are enforced.
- **Founders' agreement** — equity, 4-year vesting with 1-year cliff, leaver provisions.
- **Industry-aware clauses** — Fintech/HealthTech get DPDP Act 2023 + sensitive-data language;
  SaaS gets source-code/IP confidentiality, etc.
- **Jurisdiction-aware** — governing law, courts and arbitration seat use the chosen state/city.

## Tech

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- Each document is authored **once** as a list of typed content `Block`s
  (`lib/templates/*`). The same blocks render to (a) the live on-screen preview and
  (b) an editable `.docx` via the [`docx`](https://docx.js.org) library.
- The whole kit is zipped client-side with `jszip` + `file-saver`.
- Payment via **Dodo Payments** (hosted Checkout Session + server-side verification),
  with a graceful **demo mode** fallback so it runs with no keys.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Then open `/generate`, fill the form, pick documents, and "Pay ₹499" (demo mode unlocks
instantly — no card charged).

### Go live with payments (Dodo Payments)

1. Put your API key + mode in `.env.local`:
   ```
   DODO_PAYMENTS_API_KEY=...
   DODO_MODE=live            # or test
   ```
2. Create the ₹499 one-time product and copy its id:
   ```
   npm run dodo:setup
   ```
3. Complete `.env.local` and restart the dev server:
   ```
   DODO_PRODUCT_ID=pdt_xxx
   NEXT_PUBLIC_DODO_ENABLED=1
   ```

**Flow:** the client calls `/api/checkout` to create a hosted **Checkout Session**, persists
the kit to `localStorage`, and redirects to Dodo's checkout. On return to
`/generate?dodo=return&payment_id=...`, the app verifies the payment server-side via
`/api/checkout/verify` (`GET /payments/{id}` → `status === "succeeded"`) before unlocking the
downloads. Without keys, the UI falls back to a demo checkout.

### Deploy on Vercel

Import the repo into Vercel (it auto-detects Next.js — no extra config). Set these
**Environment Variables** in the Vercel project (Production + Preview):

```
DODO_PAYMENTS_API_KEY=...
DODO_MODE=live            # or test
DODO_PRODUCT_ID=pdt_xxx
NEXT_PUBLIC_DODO_ENABLED=1
```

The checkout `return_url` is derived from the request origin, so it points at your Vercel
domain automatically. `.env.local` is gitignored and never deploys — set the vars in Vercel.

### Smoke test the document engine

```bash
npx tsx scripts/smoke.ts   # generates & validates all 12 .docx files
```

## Project layout

```
app/
  page.tsx                 Landing page (hero, docs, pricing)
  generate/page.tsx        3-step wizard: company → select → pay & download
  api/razorpay/order/      Server route to create a Razorpay order
lib/
  types.ts                 Domain types + the Block content model
  documents.ts             Registry of all documents
  templates/               One file per category; the actual legal text
  render/docx.ts           Block → editable .docx
  render/bundle.ts         Zip the kit / single-file download
components/
  DocumentPreview.tsx      Block → styled on-screen preview
  PaymentModal.tsx         Razorpay + demo checkout
  Logo.tsx
```

## Disclaimer

The generated documents are **customisable templates for general informational use and
are not legal advice**. Laws and stamp-duty requirements vary by state and change over
time. Have key contracts reviewed by an advocate and executed on appropriate stamp paper
/ e-stamp before relying on them. Hyroo is not a law firm.
