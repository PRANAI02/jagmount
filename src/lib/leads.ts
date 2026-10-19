import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { get, list, put } from "@vercel/blob";

/** One enquiry plus the sales team's follow-up fields (the lead tracker / mini-CRM). */
export type Lead = {
  ref: string;
  date: string;
  form: "peb" | "fabrication";
  source: string;
  fields: Record<string, string>;
  files: { name: string; pathname: string; size: number }[];
  notified: boolean;
  // tracker fields, edited on /leads
  status: LeadStatus;
  value: string;
  owner: string;
  followUp: string;
  quote: QuoteStatus;
  outcome: Outcome;
  notes: string;
};

export const STATUSES = ["New", "Contacted", "Qualified", "Not a fit"] as const;
export const QUOTES = ["Not started", "Preparing", "Sent", "Revised", "Accepted", "Rejected"] as const;
export const OUTCOMES = ["Open", "Won", "Lost"] as const;
export type LeadStatus = (typeof STATUSES)[number];
export type QuoteStatus = (typeof QUOTES)[number];
export type Outcome = (typeof OUTCOMES)[number];
export const EDITABLE = ["status", "value", "owner", "followUp", "quote", "outcome", "notes"] as const;

export const storeReady = () => !!process.env.BLOB_READ_WRITE_TOKEN;

const path = (ref: string) => `leads/${ref}.json`;

export async function saveLead(lead: Lead) {
  await put(path(lead.ref), JSON.stringify(lead), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

export async function readLead(ref: string): Promise<Lead | null> {
  const r = await get(path(ref), { access: "private", useCache: false });
  if (!r || !r.stream) return null;
  return JSON.parse(await new Response(r.stream).text()) as Lead;
}

export async function listLeads(): Promise<Lead[]> {
  const out: Lead[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "leads/", cursor, limit: 1000 });
    const got = await Promise.all(page.blobs.map((b) => readLead(b.pathname.replace(/^leads\/|\.json$/g, ""))));
    out.push(...got.filter((x): x is Lead => !!x));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

// ---- tracker auth: one shared password, signed cookie ---------------------
export const COOKIE = "jm_leads";
const sign = (v: string) => createHmac("sha256", process.env.LEADS_SECRET || "dev").update(v).digest("hex");

export function sessionToken() {
  const exp = String(Date.now() + 1000 * 60 * 60 * 24 * 30);
  return `${exp}.${sign(exp)}`;
}

export function validSession(token?: string) {
  if (!token || !process.env.LEADS_PASSWORD) return false;
  const [exp, mac] = token.split(".");
  if (!exp || !mac || Number(exp) < Date.now()) return false;
  const a = Buffer.from(mac);
  const b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function passwordOk(pw: string) {
  const want = process.env.LEADS_PASSWORD;
  if (!want) return false;
  const a = Buffer.from(sign(pw));
  const b = Buffer.from(sign(want));
  return timingSafeEqual(a, b);
}
