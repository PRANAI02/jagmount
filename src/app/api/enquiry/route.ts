/**
 * Enquiry endpoint for the two website forms.
 *
 * Environment (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY        Resend API key (https://resend.com). Required to email enquiries.
 *   ENQUIRY_FROM          Sender, on a domain verified in Resend, e.g. "Jagmount Website <enquiries@jagmount.com>"
 *   ENQUIRY_TO            Sales inbox for PEB enquiries (default info@jagmount.com)
 *   FABRICATION_TO        Estimating inbox for fabrication enquiries (defaults to ENQUIRY_TO)
 *   LEADS_WEBHOOK_URL     Optional: every lead is POSTed here as JSON (Google Sheets Apps Script, Zapier, a CRM)
 *
 * With neither RESEND_API_KEY nor LEADS_WEBHOOK_URL set the route answers 503 and the
 * form offers the visitor a pre-filled email / WhatsApp instead, so nothing is lost.
 */

const MAX_BYTES = 4 * 1024 * 1024;

const FIELDS: Record<string, [string, string][]> = {
  peb: [
    ["name", "Contact name"],
    ["company", "Company"],
    ["phone", "Phone"],
    ["email", "Email"],
    ["projectType", "Project type"],
    ["location", "Project location"],
    ["area", "Approx. built-up area (sq ft)"],
    ["timeline", "Expected timeline"],
    ["reference", "Similar to project"],
    ["fileLink", "Large-file link"],
    ["message", "Notes"],
  ],
  fabrication: [
    ["company", "Company"],
    ["name", "Contact person"],
    ["phone", "Phone"],
    ["email", "Email"],
    ["workType", "Work type"],
    ["quantity", "Estimated quantity (MT)"],
    ["drawings", "Drawing availability"],
    ["deliveryDate", "Required delivery date"],
    ["location", "Delivery location"],
    ["fileLink", "Large-file link"],
    ["message", "Notes"],
  ],
};
const REQUIRED: Record<string, string[]> = {
  peb: ["name", "phone", "email", "projectType", "location", "area", "timeline"],
  fabrication: ["company", "name", "phone", "email", "quantity", "drawings", "deliveryDate", "location"],
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(request: Request) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return Response.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }
  const form = String(fd.get("form"));
  if (!(form in FIELDS)) return Response.json({ ok: false, reason: "bad_form" }, { status: 400 });
  // bots fill the hidden field; pretend success
  if (String(fd.get("website") || "")) return Response.json({ ok: true, ref: "" });

  const v = (k: string) => String(fd.get(k) ?? "").trim().slice(0, 4000);
  const missing = REQUIRED[form].filter((k) => !v(k));
  if (missing.length) return Response.json({ ok: false, reason: "missing", fields: missing }, { status: 422 });

  const files = fd.getAll("files").filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f && f.size > 0);
  if (files.reduce((a, f) => a + f.size, 0) > MAX_BYTES) return Response.json({ ok: false, reason: "too_large" }, { status: 413 });

  const now = new Date();
  const ref = `JM-${form === "peb" ? "P" : "F"}${now.toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const rows = FIELDS[form].map(([k, label]) => [label, v(k)] as const).filter(([, val]) => val);
  const title = form === "peb" ? "PEB project enquiry" : "Fabrication quote request";
  const who = v("company") || v("name");

  const key = process.env.RESEND_API_KEY;
  const hook = process.env.LEADS_WEBHOOK_URL;
  if (!key && !hook) return Response.json({ ok: false, reason: "not_configured" }, { status: 503 });

  let delivered = false;
  let confirmationSent = false;

  if (key) {
    const from = process.env.ENQUIRY_FROM || "Jagmount Website <onboarding@resend.dev>";
    const salesTo = process.env.ENQUIRY_TO || "info@jagmount.com";
    const to = form === "fabrication" ? process.env.FABRICATION_TO || salesTo : salesTo;
    const attachments = await Promise.all(
      files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()).toString("base64") })),
    );
    const table = rows
      .map(([l, val]) => `<tr><td style="padding:6px 12px 6px 0;color:#63666d;vertical-align:top">${esc(l)}</td><td style="padding:6px 0">${esc(val).replace(/\n/g, "<br>")}</td></tr>`)
      .join("");
    const send = (body: object) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    const sales = await send({
      from,
      to: [to],
      reply_to: v("email") || undefined,
      subject: `[${ref}] ${title}: ${who}`,
      html: `<h2 style="font-family:Arial">${title}</h2><p style="font-family:Arial;color:#63666d">Ref ${ref} · ${now.toUTCString()}</p><table style="font-family:Arial;font-size:14px">${table}</table>${files.length ? `<p style="font-family:Arial">${files.length} file(s) attached.</p>` : ""}`,
      attachments: attachments.length ? attachments : undefined,
    });
    delivered = sales.ok;
    if (!sales.ok) console.error("enquiry: sales email failed", sales.status, await sales.text());

    if (delivered && v("email")) {
      const conf = await send({
        from,
        to: [v("email")],
        reply_to: to,
        subject: `We've received your enquiry (${ref}) · Jagmount Projects`,
        html: `<div style="font-family:Arial;font-size:15px;line-height:1.5"><p>Hello ${esc(v("name"))},</p><p>Thank you for contacting Jagmount Projects. We have received your ${form === "peb" ? "project enquiry" : "fabrication quote request"} (reference <b>${ref}</b>) and our ${form === "peb" ? "projects" : "estimating"} team will be in touch, usually within one working day.</p><table style="font-size:14px">${table}</table><p>To add drawings or details, reply to this email or call / WhatsApp +91 98712 08401.</p><p>Jagmount Projects<br>Jagwati Metals Engineering LLP<br>Faridabad · Palwal, Haryana</p></div>`,
      });
      confirmationSent = conf.ok;
    }
  }

  if (hook) {
    try {
      const r = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref,
          date: now.toISOString(),
          source: request.headers.get("referer") || "",
          form,
          ...Object.fromEntries(FIELDS[form].map(([k]) => [k, v(k)])),
          attachments: files.map((f) => f.name).join(", "),
          status: "New",
        }),
      });
      delivered = delivered || r.ok;
    } catch (e) {
      console.error("enquiry: webhook failed", e);
    }
  }

  if (!delivered) return Response.json({ ok: false, reason: "delivery_failed" }, { status: 502 });
  return Response.json({ ok: true, ref, confirmationSent });
}
