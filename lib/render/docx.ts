import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, TableLayoutType,
  Header, Footer, PageNumber, ImageRun,
} from "docx";
import { Block, DocumentDef, CompanyData } from "../types";

// Decode a base64 data URL into bytes for embedding (browser + Node have atob).
function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1] ?? "";
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

// --- Palette (print-safe; documents are strictly black + greys) -----------
const INK = "000000"; // body & headings - pure black
const GREY = "6B7280"; // secondary (header/footer/notes)
const RULE = "D9D9D9"; // light hairline divider
const TABLE_BORDER = "BFBFBF"; // table gridlines
const TABLE_HEAD = "F2F2F2"; // label column shading
const PURPLE = "7C3AED"; // placeholders the user must fill in

// Anything the user must replace: [brackets], <angles>, or ___ blanks.
const PH_RE = /(\[[^\]\n]*\]|<[^>\n]+>|_{3,})/g;

// Build TextRuns from a string, colouring fill-in placeholders purple and
// preserving explicit line breaks.
function inkRuns(
  text: string,
  opts: { bold?: boolean; italics?: boolean; size?: number; color?: string } = {}
): TextRun[] {
  const base = opts.color ?? INK;
  const size = opts.size ?? 22;
  const runs: TextRun[] = [];
  text.split("\n").forEach((line, li) => {
    const segs: { t: string; ph: boolean }[] = [];
    let last = 0;
    PH_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = PH_RE.exec(line))) {
      if (m.index > last) segs.push({ t: line.slice(last, m.index), ph: false });
      segs.push({ t: m[0], ph: true });
      last = m.index + m[0].length;
    }
    if (last < line.length || segs.length === 0) segs.push({ t: line.slice(last), ph: false });
    segs.forEach((s, si) => {
      runs.push(
        new TextRun({
          text: s.t,
          bold: opts.bold,
          italics: opts.italics,
          color: s.ph ? PURPLE : base,
          size,
          break: li > 0 && si === 0 ? 1 : undefined,
        })
      );
    });
  });
  return runs;
}

const BODY_FONT = "Calibri";
const HEAD_FONT = "Calibri";

// A4 geometry (twips). 1 inch = 1440.
const PAGE = { width: 11906, height: 16838 };
const MARGIN = 1440; // 1" all round
const CONTENT_WIDTH = PAGE.width - MARGIN * 2; // 9026

interface ParaOpts {
  bold?: boolean;
  italics?: boolean;
  color?: string;
  size?: number; // half-points
  spacingAfter?: number;
  align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  line?: number;
}

function para(text: string, opts: ParaOpts = {}) {
  const lines = text.split("\n");
  const children = lines.map(
    (line, i) =>
      new TextRun({
        text: line,
        bold: opts.bold,
        italics: opts.italics,
        color: opts.color ?? INK,
        size: opts.size ?? 22, // 11pt
        break: i > 0 ? 1 : undefined,
      })
  );
  return new Paragraph({
    children,
    alignment: opts.align,
    spacing: { after: opts.spacingAfter ?? 160, line: opts.line ?? 276 },
  });
}

// Fixed column widths (twips) keep Word from auto-collapsing the columns.
const KV_COLS = [Math.round(CONTENT_WIDTH * 0.36), Math.round(CONTENT_WIDTH * 0.64)];
const SIGN_COLS = [Math.floor(CONTENT_WIDTH / 2), Math.floor(CONTENT_WIDTH / 2)];

function kvTable(rows: [string, string][]): Table {
  const border = { style: BorderStyle.SINGLE, size: 2, color: TABLE_BORDER };
  const cellMargins = { top: 80, bottom: 80, left: 140, right: 140 };
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: KV_COLS,
    borders: {
      top: border, bottom: border, left: border, right: border,
      insideHorizontal: border, insideVertical: border,
    },
    rows: rows.map(
      ([k, v]) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: KV_COLS[0], type: WidthType.DXA },
              shading: { fill: TABLE_HEAD },
              margins: cellMargins,
              children: [para(k, { bold: true, size: 21 })],
            }),
            new TableCell({
              width: { size: KV_COLS[1], type: WidthType.DXA },
              margins: cellMargins,
              children: [new Paragraph({ children: inkRuns(v, { size: 21 }), spacing: { after: 0, line: 276 } })],
            }),
          ],
        })
    ),
  });
}

// Multi-column table (e.g. salary structure / F&F computation annexures).
function multiTable(headers: string[], rows: string[][]): Table {
  const border = { style: BorderStyle.SINGLE, size: 2, color: TABLE_BORDER };
  const cols = headers.length || (rows[0]?.length ?? 1);
  const colW = Math.floor(CONTENT_WIDTH / cols);
  const widths = Array.from({ length: cols }, () => colW);
  const margins = { top: 70, bottom: 70, left: 120, right: 120 };

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(
      (h, i) =>
        new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          shading: { fill: TABLE_HEAD },
          margins,
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, color: INK })], spacing: { after: 0, line: 264 } })],
        })
    ),
  });

  const bodyRows = rows.map(
    (r) =>
      new TableRow({
        children: r.map(
          (cell, i) =>
            new TableCell({
              width: { size: widths[i], type: WidthType.DXA },
              margins,
              children: [new Paragraph({ children: inkRuns(cell, { size: 20 }), spacing: { after: 0, line: 264 } })],
            })
        ),
      })
  );

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: widths,
    borders: {
      top: border, bottom: border, left: border, right: border,
      insideHorizontal: border, insideVertical: border,
    },
    rows: headers.length ? [headerRow, ...bodyRows] : bodyRows,
  });
}

const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

function signTable(left: string[], right: string[]): Table {
  const col = (lines: string[], i: number) =>
    new TableCell({
      width: { size: SIGN_COLS[i], type: WidthType.DXA },
      margins: { top: 0, bottom: 0, left: 0, right: i === 0 ? 240 : 0 },
      borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER },
      children: lines.length
        ? lines.map((l) => para(l || " ", { size: 21, spacingAfter: 40 }))
        : [para(" ")],
    });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: SIGN_COLS,
    borders: {
      top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER,
      insideHorizontal: NO_BORDER, insideVertical: NO_BORDER,
    },
    rows: [new TableRow({ children: [col(left, 0), col(right, 1)] })],
  });
}

function blockToDocx(block: Block): (Paragraph | Table)[] {
  switch (block.type) {
    case "h1":
      return [
        new Paragraph({
          children: [
            new TextRun({ text: block.text.toUpperCase(), bold: true, color: INK, size: 30, font: HEAD_FONT }),
          ],
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 60, before: 120 },
        }),
        // thin centered rule under the title
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 1 } },
          alignment: AlignmentType.CENTER,
          spacing: { after: 260 },
          children: [],
        }),
      ];
    case "h2":
      return [
        new Paragraph({
          children: [new TextRun({ text: block.text, bold: true, color: INK, size: 24, font: HEAD_FONT })],
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 100, before: 260 },
          keepNext: true,
        }),
      ];
    case "h3":
      return [
        new Paragraph({
          children: [new TextRun({ text: block.text, bold: true, color: INK, size: 22, font: HEAD_FONT })],
          spacing: { after: 60, before: 160 },
          keepNext: true,
        }),
      ];
    case "p":
      return [
        new Paragraph({
          children: inkRuns(block.text),
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 160, line: 276 },
        }),
      ];
    case "ul":
      return block.items.map(
        (it) =>
          new Paragraph({
            children: inkRuns(it),
            bullet: { level: 0 },
            spacing: { after: 90, line: 276 },
            alignment: AlignmentType.JUSTIFIED,
          })
      );
    case "ol":
      return block.items.map(
        (it) =>
          new Paragraph({
            children: inkRuns(it),
            numbering: { reference: "ordered-list", level: 0 },
            spacing: { after: 90, line: 276 },
            alignment: AlignmentType.JUSTIFIED,
          })
      );
    case "kv":
      return [kvTable(block.rows), para(" ", { spacingAfter: 80 })];
    case "table":
      return [multiTable(block.headers, block.rows), para(" ", { spacingAfter: 80 })];
    case "hr":
      return [
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE } },
          spacing: { after: 160 },
          children: [],
        }),
      ];
    case "sign":
      return [para(" ", { spacingAfter: 120 }), signTable(block.left, block.right)];
    case "note":
      return [
        new Paragraph({
          children: [new TextRun({ text: block.text, italics: true, color: GREY, size: 17 })],
          spacing: { before: 280, after: 80, line: 252 },
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 8 } },
        }),
      ];
  }
}

// Page-1 letterhead built from the company profile.
function letterhead(c: CompanyData): Paragraph[] {
  const name = c.legalName || c.brandName || "[Company Name]";
  const addr = [c.address, c.city, c.state, c.pincode].filter(Boolean).join(", ");
  const idLabel = c.entityType?.includes("LLP") ? "LLPIN" : "CIN";
  const contact = [
    c.cin ? `${idLabel}: ${c.cin}` : "",
    c.email,
    c.phone,
    c.website,
  ].filter(Boolean).join("   ·   ");

  const out: Paragraph[] = [];

  // Optional logo at the very top of the letterhead.
  if (c.logoDataUrl && c.logoW > 0 && c.logoH > 0) {
    try {
      out.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new ImageRun({
              data: dataUrlToBytes(c.logoDataUrl),
              transformation: { width: c.logoW, height: c.logoH },
            }),
          ],
        })
      );
    } catch {
      /* ignore malformed image data */
    }
  }

  out.push(
    new Paragraph({
      children: [new TextRun({ text: name, bold: true, color: INK, size: 30, font: HEAD_FONT })],
      spacing: { after: addr || contact ? 40 : 120 },
    })
  );
  if (addr) out.push(para(addr, { size: 17, color: GREY, spacingAfter: contact ? 20 : 40 }));
  if (contact) out.push(para(contact, { size: 17, color: GREY, spacingAfter: 40 }));
  out.push(
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: INK, space: 1 } },
      spacing: { after: 220 },
      children: [],
    })
  );
  return out;
}

function runningHeader(c: CompanyData): Header {
  const name = c.legalName || c.brandName || "";
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 6 } },
        spacing: { after: 120 },
        children: [new TextRun({ text: name, size: 16, color: GREY })],
      }),
    ],
  });
}

function pageFooter(): Footer {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 6 } },
        spacing: { before: 60 },
        children: [
          new TextRun({ text: "Page ", size: 15, color: GREY }),
          new TextRun({ children: [PageNumber.CURRENT], size: 15, color: GREY }),
          new TextRun({ text: " of ", size: 15, color: GREY }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 15, color: GREY }),
        ],
      }),
    ],
  });
}

export async function buildDocxBlob(def: DocumentDef, company: CompanyData): Promise<Blob> {
  const blocks = def.build(company);
  const children: (Paragraph | Table)[] = [...letterhead(company)];
  for (const b of blocks) children.push(...blockToDocx(b));

  const doc = new Document({
    creator: "Hyroo",
    title: def.name,
    description: `${def.name} for ${company.legalName || company.brandName || "company"}`,
    numbering: {
      config: [
        {
          reference: "ordered-list",
          levels: [
            {
              level: 0,
              format: "decimal",
              text: "%1.",
              alignment: AlignmentType.START,
              style: { paragraph: { indent: { left: 460, hanging: 280 } } },
            },
          ],
        },
      ],
    },
    styles: {
      default: {
        document: { run: { font: BODY_FONT, size: 22, color: INK } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE.width, height: PAGE.height },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
          titlePage: true, // first page omits the running header (letterhead only)
        },
        headers: {
          first: new Header({ children: [new Paragraph({ children: [] })] }),
          default: runningHeader(company),
        },
        footers: {
          first: pageFooter(),
          default: pageFooter(),
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

export function slugFilename(def: DocumentDef, company: CompanyData): string {
  const co = (company.brandName || company.legalName || "company")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `${co}-${def.id}.docx`;
}
