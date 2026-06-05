"use client";

import { Block } from "@/lib/types";

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!)
  );
}

// Build a tiled, semi-transparent diagonal watermark as an inline SVG.
// Rendered over the document so it also appears in screenshots/screen recordings.
function watermarkStyle(label: string): React.CSSProperties {
  const text = escapeXml((label || "Hyroo").toUpperCase().slice(0, 28)) + " · PREVIEW";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='340' height='210'>
    <text x='12' y='120' font-family='Inter, Arial, sans-serif' font-size='19' font-weight='700'
      fill='rgba(38,36,29,0.085)' transform='rotate(-27 170 105)'>${text}</text>
  </svg>`;
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundRepeat: "repeat",
  };
}

const block = (e: React.SyntheticEvent) => {
  e.preventDefault();
  return false;
};

export function DocumentPreview({
  blocks,
  watermark = "Hyroo",
  logoUrl,
}: {
  blocks: Block[];
  watermark?: string;
  logoUrl?: string;
}) {
  return (
    <div
      className="preview-protected relative"
      onCopy={block}
      onCut={block}
      onContextMenu={block}
      onDragStart={block}
    >
      <div className="document-paper text-[15px] leading-relaxed text-zinc-800">
        {logoUrl ? (
          <div className="mb-4 border-b border-slate-200 pb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="" className="h-10 w-auto max-w-[160px] object-contain" />
          </div>
        ) : null}
        {blocks.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>
      {/* Watermark overlay — sits above the text, never intercepts clicks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={watermarkStyle(watermark)}
      />
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h1":
      return (
        <h1 className="mb-5 mt-1 text-center text-2xl font-bold uppercase tracking-tight text-zinc-900">
          {block.text}
        </h1>
      );
    case "h2":
      return <h2 className="mb-2 mt-6 text-base font-bold text-ink">{block.text}</h2>;
    case "p":
      return <p className="mb-3 whitespace-pre-line text-justify">{block.text}</p>;
    case "ul":
      return (
        <ul className="mb-3 ml-5 list-disc space-y-1">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-3 ml-5 list-decimal space-y-1">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "kv":
      return (
        <table className="mb-4 w-full border-collapse text-sm">
          <tbody>
            {block.rows.map(([k, v], i) => (
              <tr key={i}>
                <th className="w-2/5 border border-slate-200 bg-slate-50 px-3 py-2 text-left align-top font-semibold">
                  {k}
                </th>
                <td className="border border-slate-200 px-3 py-2 align-top">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "hr":
      return <hr className="my-4 border-slate-200" />;
    case "sign":
      return (
        <div className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 sm:gap-8">
          <SignCol lines={block.left} />
          <SignCol lines={block.right} />
        </div>
      );
    case "note":
      return (
        <p className="mt-6 border-t border-slate-200 pt-3 font-sans text-xs italic text-slate-500">
          {block.text}
        </p>
      );
  }
}

function SignCol({ lines }: { lines: string[] }) {
  if (!lines.length) return <div />;
  return (
    <div className="whitespace-pre-line">
      {lines.map((l, i) => (
        <div key={i} className={l.startsWith("_") ? "text-slate-400" : ""}>
          {l || " "}
        </div>
      ))}
    </div>
  );
}
