import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CompanyData } from "@/lib/types";
import { DOCUMENTS } from "@/lib/documents";
import { buildDocxBlob, slugFilename } from "@/lib/render/docx";
import { WHATSAPP_DISPLAY, WHATSAPP_HREF } from "@/lib/support";

// Generates all kit documents server-side and emails them as attachments.
// Called by the client after a successful payment. When Dodo is configured,
// the payment is re-verified here so the endpoint can't be abused.

export const runtime = "nodejs";
export const maxDuration = 60;

function dodoBase() {
  return process.env.DODO_MODE === "live"
    ? "https://live.dodopayments.com"
    : "https://test.dodopayments.com";
}

const PAID = new Set(["succeeded", "paid", "completed", "active"]);

async function paymentIsValid(paymentId: string | undefined): Promise<boolean> {
  const key = process.env.DODO_PAYMENTS_API_KEY;
  if (!key) return true; // demo mode: no gateway to check against
  if (!paymentId) return false;
  const res = await fetch(`${dodoBase()}/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!res.ok) return false;
  const data = await res.json();
  return PAID.has(String(data.status || "").toLowerCase());
}

function emailHtml(c: CompanyData): string {
  const company = c.brandName || c.legalName || "your company";
  const docsList = DOCUMENTS.map(
    (d) => `<tr>
      <td style="padding:6px 0;border-bottom:1px solid #f1f1f4;font-size:14px;color:#27272a;">${d.name}</td>
    </tr>`
  ).join("");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">
        <tr>
          <td style="background:#09090b;padding:28px 32px;">
            <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">hyroo<span style="color:#818cf8;">.</span></span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 8px;font-size:22px;color:#09090b;letter-spacing:-0.3px;">Your document kit is ready 🎉</h1>
            <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#52525b;">
              Thank you for your purchase. All ${DOCUMENTS.length} documents for <strong>${company}</strong> are attached
              to this email as editable Word (.docx) files, filled with your company's details.
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
              <tr><td style="padding:10px 14px;background:#fafafa;border:1px solid #e4e4e7;border-radius:10px 10px 0 0;font-size:12px;font-weight:700;letter-spacing:1px;color:#71717a;">WHAT'S ATTACHED</td></tr>
              <tr><td style="padding:6px 14px 12px;border:1px solid #e4e4e7;border-top:none;border-radius:0 0 10px 10px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${docsList}</table>
              </td></tr>
            </table>
            <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#09090b;">How to use your kit</p>
            <ol style="margin:0 0 20px;padding-left:18px;font-size:14px;line-height:1.7;color:#52525b;">
              <li>Open any document in Microsoft Word or Google Docs.</li>
              <li>Replace anything in [square brackets] with your specific details.</li>
              <li>Execute on appropriate stamp paper / e-stamp where required.</li>
            </ol>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#52525b;">
              Questions or need help? Reach us on
              <a href="${WHATSAPP_HREF}" style="color:#16a34a;font-weight:600;text-decoration:none;">WhatsApp at ${WHATSAPP_DISPLAY}</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;background:#fafafa;border-top:1px solid #e4e4e7;">
            <p style="margin:0;font-size:11px;line-height:1.6;color:#a1a1aa;">
              © ${new Date().getFullYear()} Hyroo.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Diagnostic: reports effective (non-secret) email config; ?probe=send
// attempts a real send to Resend's test inbox and returns the exact error.
export async function GET(req: NextRequest) {
  const from = process.env.RESEND_FROM || "Hyroo <kit@hyroo.in>";
  const replyTo = process.env.RESEND_REPLY_TO || "hello@hyroo.in";
  const info: Record<string, unknown> = {
    resendKeyPresent: Boolean(process.env.RESEND_API_KEY),
    from,
    replyTo,
    dodoKeyPresent: Boolean(process.env.DODO_PAYMENTS_API_KEY),
    dodoMode: process.env.DODO_MODE || "test",
    productIdPresent: Boolean(process.env.DODO_PRODUCT_ID),
  };

  if (new URL(req.url).searchParams.get("probe") === "send" && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from,
      replyTo,
      to: "delivered@resend.dev", // Resend's always-accept test inbox
      subject: "[probe] Hyroo production email config check",
      html: "<p>Probe send from production.</p>",
    });
    info.probeSent = Boolean(data?.id);
    info.probeError = error ? error.message || JSON.stringify(error) : null;
  }

  return NextResponse.json(info);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ sent: false, error: "email_not_configured" }, { status: 501 });
  }

  const body = await req.json().catch(() => null);
  const company = body?.company as CompanyData | undefined;
  const paymentId = body?.payment_id as string | undefined;

  const email = company?.email?.trim();
  if (!company || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ sent: false, error: "invalid_request" }, { status: 400 });
  }

  if (!(await paymentIsValid(paymentId))) {
    return NextResponse.json({ sent: false, error: "payment_not_verified" }, { status: 402 });
  }

  // Generate all documents server-side.
  const attachments: { filename: string; content: string }[] = [];
  for (const def of DOCUMENTS) {
    const blob = await buildDocxBlob(def, company);
    const buf = Buffer.from(await blob.arrayBuffer());
    attachments.push({ filename: slugFilename(def, company), content: buf.toString("base64") });
  }

  const resend = new Resend(apiKey);
  // hyroo.in is verified in Resend, so any @hyroo.in sender works (no mailbox
  // needed). Replies go to the real, monitored GoDaddy inbox.
  const from = process.env.RESEND_FROM || "Hyroo <kit@hyroo.in>";
  const replyTo = process.env.RESEND_REPLY_TO || "hello@hyroo.in";
  const companyName = company.brandName || company.legalName || "your company";

  const { error } = await resend.emails.send({
    from,
    replyTo,
    to: email,
    subject: `Your Hyroo document kit for ${companyName} (${DOCUMENTS.length} documents)`,
    html: emailHtml(company),
    attachments,
  });

  if (error) {
    return NextResponse.json({ sent: false, error: error.message || "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ sent: true });
}
