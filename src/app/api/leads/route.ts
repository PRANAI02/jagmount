import { cookies } from "next/headers";
import { COOKIE, EDITABLE, OUTCOMES, QUOTES, STATUSES, listLeads, passwordOk, readLead, saveLead, sessionToken, validSession, type Lead } from "@/lib/leads";

async function authed() {
  return validSession((await cookies()).get(COOKIE)?.value);
}

/** GET: all leads (JSON, or CSV with ?format=csv). */
export async function GET(request: Request) {
  if (!(await authed())) return Response.json({ error: "unauthorised" }, { status: 401 });
  const leads = await listLeads();
  if (new URL(request.url).searchParams.get("format") !== "csv") return Response.json({ leads });
  const cols: [string, (l: Lead) => string][] = [
    ["Ref", (l) => l.ref],
    ["Enquiry date", (l) => l.date.slice(0, 10)],
    ["Service", (l) => (l.form === "peb" ? "PEB project" : "Fabrication / jobwork")],
    ["Source", (l) => l.source],
    ["Company", (l) => l.fields.company || ""],
    ["Contact", (l) => l.fields.name || ""],
    ["Phone", (l) => l.fields.phone || ""],
    ["Email", (l) => l.fields.email || ""],
    ["Location", (l) => l.fields.location || ""],
    ["Area (sq ft) / Qty (MT)", (l) => l.fields.area || l.fields.quantity || ""],
    ["Est. value", (l) => l.value],
    ["Status", (l) => l.status],
    ["Follow-up owner", (l) => l.owner],
    ["Follow-up date", (l) => l.followUp],
    ["Quotation", (l) => l.quote],
    ["Outcome", (l) => l.outcome],
    ["Notes", (l) => l.notes],
  ];
  const q = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const csv = [cols.map(([h]) => q(h)).join(","), ...leads.map((l) => cols.map(([, f]) => q(f(l))).join(","))].join("\n");
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="jagmount-leads-${new Date().toISOString().slice(0, 10)}.csv"` },
  });
}

/** POST {password}: log in. */
export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };
  if (!password || !passwordOk(password)) return Response.json({ ok: false }, { status: 401 });
  (await cookies()).set(COOKIE, sessionToken(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return Response.json({ ok: true });
}

/** PATCH {ref, ...tracker fields}: update the follow-up fields of one lead. */
export async function PATCH(request: Request) {
  if (!(await authed())) return Response.json({ error: "unauthorised" }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as Record<string, string>;
  const lead = body.ref && (await readLead(body.ref));
  if (!lead) return Response.json({ error: "not found" }, { status: 404 });
  for (const k of EDITABLE) {
    if (typeof body[k] !== "string") continue;
    const val = body[k].slice(0, 2000);
    if (k === "status" && !(STATUSES as readonly string[]).includes(val)) continue;
    if (k === "quote" && !(QUOTES as readonly string[]).includes(val)) continue;
    if (k === "outcome" && !(OUTCOMES as readonly string[]).includes(val)) continue;
    (lead as Record<string, unknown>)[k] = val;
  }
  await saveLead(lead);
  return Response.json({ ok: true, lead });
}

/** DELETE: log out. */
export async function DELETE() {
  (await cookies()).delete(COOKIE);
  return Response.json({ ok: true });
}
