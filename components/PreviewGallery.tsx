"use client";

import { Lock, FileText } from "lucide-react";
import { CompanyData, DocumentDef } from "@/lib/types";
import { DocumentPreview } from "./DocumentPreview";

export function PreviewGallery({
  company,
  teasers,
  remaining,
  onUnlock,
}: {
  company: CompanyData;
  teasers: DocumentDef[];
  remaining: number;
  onUnlock: () => void;
}) {
  const wm = company.brandName || company.legalName || "Hyroo";
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar sm:mx-0 sm:px-0">
      {teasers.map((def, i) => (
        <TeaseCard key={def.id} def={def} company={company} watermark={wm} index={i + 1} />
      ))}
      <LockCard remaining={remaining} onUnlock={onUnlock} />
    </div>
  );
}

function TeaseCard({
  def, company, watermark, index,
}: {
  def: DocumentDef;
  company: CompanyData;
  watermark: string;
  index: number;
}) {
  const blocks = def.build(company);
  return (
    <div className="relative flex w-[82vw] max-w-[340px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lift ring-1 ring-white/5 sm:w-[340px]">
      {/* Crisp heading */}
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-3">
        <span className="text-xs font-bold text-zinc-300">
          {String(index).padStart(2, "0")}
        </span>
        <FileText className="h-4 w-4 shrink-0 text-brand-600" />
        <p className="truncate text-sm font-semibold text-zinc-900">{def.name}</p>
        <Lock className="ml-auto h-3.5 w-3.5 shrink-0 text-zinc-400" />
      </div>

      {/* Real, readable live preview — watermarked & copy-protected */}
      <div className="max-h-[360px] overflow-y-auto bg-white px-5 py-5">
        <DocumentPreview blocks={blocks} watermark={watermark} logoUrl={company.logoDataUrl} />
      </div>
      <div className="flex items-center justify-center gap-1.5 border-t border-zinc-200 bg-zinc-50 py-2 text-[11px] text-zinc-500">
        <Lock className="h-3 w-3" /> Watermarked preview · editable file after checkout
      </div>
    </div>
  );
}

function LockCard({ remaining, onUnlock }: { remaining: number; onUnlock: () => void }) {
  return (
    <div className="relative flex w-[80vw] max-w-[340px] shrink-0 snap-center flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-card p-6 text-center sm:w-[330px]">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lift">
        <Lock className="h-6 w-6" />
      </span>
      <p className="text-4xl font-bold leading-none text-foreground">+{remaining}</p>
      <p className="text-sm font-semibold text-foreground">more documents inside</p>
      <p className="text-xs text-muted-foreground">HR · Policies · Legal · Compliance</p>
      <button onClick={onUnlock} className="btn-accent mt-2 w-full">
        Unlock the full kit · ₹499
      </button>
    </div>
  );
}
