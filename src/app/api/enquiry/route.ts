import { saveLead, storeReady, type Lead } from "@/lib/leads";

/**
 * Enquiry endpoint for the two website forms.
 *
 * Every enquiry is saved to the private Blob store and appears in the lead tracker at /leads.
 * Drawings are uploaded by the browser straight into the same private store (see ./upload).
 *
 * Environment (Vercel → Project → Settings → Environment Variables):
 *   BLOB_READ_WRITE_TOKEN  set by the linked "jagmount-leads" Blob store (lead + drawing storage)
 *   LEADS_PASSWORD         password for /leads; LEADS_SECRET signs its cookie
 *   RESEND_API_KEY         Resend API key. Needed to email enquiries to sales and confirm to the buyer.
 *   ENQUIRY_FROM           Sender on a domain verified in Resend, e.g. "Jagmount Website <enquiries@jagmount.com>"
 *   ENQUIRY_TO             Sales inbox for PEB enquiries (default info@jagmount.com)
 *   FABRICATION_TO         Estimating inbox for fabrication enquiries (defaults to ENQUIRY_TO)
 *   LEADS_WEBHOOK_URL      Optional: each lead is also POSTed here as JSON (Google Sheet, Zapier, a CRM)
 */

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

  let files: Lead["files"] = [];
  try {
    files = (JSON.parse(v("uploads") || "[]") as Lead["files"])
      .filter((f) => typeof f.pathname === "string" && f.pathname.startsWith("enquiries/"))
      .slice(0, 20)
      .map((f) => ({ name: String(f.name).slice(0, 200), pathname: f.pathname, size: Number(f.size) || 0 }));
  } catch {
    /* ignore malformed upload list */
  }

  const now = new Date();
  const ref = `JM-${form === "peb" ? "P" : "F"}${now.toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const fields = Object.fromEntries(FIELDS[form].map(([k]) => [k, v(k)]).filter(([, val]) => val));
  const rows = FIELDS[form].map(([k, label]) => [label, v(k)] as const).filter(([, val]) => val);
  const title = form === "peb" ? "PEB project enquiry" : "Fabrication quote request";
  const who = v("company") || v("name");
  const origin = new URL(request.url).origin;

  const key = process.env.RESEND_API_KEY;
  const hook = process.env.LEADS_WEBHOOK_URL;
  if (!key && !hook && !storeReady()) return Response.json({ ok: false, reason: "not_configured" }, { status: 503 });

  let stored = false;
  let notified = false;
  let confirmationSent = false;

  const lead: Lead = {
    ref,
    date: now.toISOString(),
    form: form as Lead["form"],
    source: v("source") || "unknown",
    fields,
    files,
    notified: false,
    status: "New",
    value: "",
    // client: website enquiries go first to Pulkit Mangla, who assigns them on
    owner: "Pulkit Mangla",
    followUp: "",
    quote: "Not started",
    outcome: "Open",
    notes: "",
  };

  if (key) {
    const from = process.env.ENQUIRY_FROM || "Jagmount Website <onboarding@resend.dev>";
    const salesTo = process.env.ENQUIRY_TO || "info@jagmount.com";
    const to = form === "fabrication" ? process.env.FABRICATION_TO || salesTo : salesTo;
    const table = rows
      .map(([l, val]) => `<tr><td style="padding:6px 12px 6px 0;color:#63666d;vertical-align:top">${esc(l)}</td><td style="padding:6px 0">${esc(val).replace(/\n/g, "<br>")}</td></tr>`)
      .join("");
    const fileList = files.length
      ? `<p style="font-family:Arial"><b>Drawings (${files.length})</b>, open via the lead tracker login:</p><ul style="font-family:Arial">${files
          .map((f) => `<li><a href="${origin}/api/leads/file?p=${encodeURIComponent(f.pathname)}">${esc(f.name)}</a></li>`)
          .join("")}</ul>`
      : "";
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
      html: `<h2 style="font-family:Arial">${title}</h2><p style="font-family:Arial;color:#63666d">Ref ${ref} · ${now.toUTCString()} · Source: ${esc(lead.source)}</p><table style="font-family:Arial;font-size:14px">${table}</table>${fileList}<p style="font-family:Arial"><a href="${origin}/leads">Open the lead tracker</a></p>`,
    });
    notified = sales.ok;
    if (!sales.ok) console.error("enquiry: sales email failed", sales.status, await sales.text());

    if (notified && v("email")) {
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

  if (storeReady()) {
    try {
      lead.notified = notified;
      await saveLead(lead);
      stored = true;
    } catch (e) {
      console.error("enquiry: lead store failed", e);
    }
  }

  if (hook) {
    try {
      const r = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref, date: lead.date, source: lead.source, form, ...fields, attachments: files.map((f) => f.name).join(", "), status: "New" }),
      });
      stored = stored || r.ok;
    } catch (e) {
      console.error("enquiry: webhook failed", e);
    }
  }

  if (!stored && !notified) return Response.json({ ok: false, reason: "delivery_failed" }, { status: 502 });
  return Response.json({ ok: true, ref, notified, confirmationSent });
}
