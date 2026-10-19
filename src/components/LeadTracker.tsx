"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Lead = {
  ref: string;
  date: string;
  form: "peb" | "fabrication";
  source: string;
  fields: Record<string, string>;
  files: { name: string; pathname: string; size: number }[];
  notified: boolean;
  status: string;
  value: string;
  owner: string;
  followUp: string;
  quote: string;
  outcome: string;
  notes: string;
};

const STATUSES = ["New", "Contacted", "Qualified", "Not a fit"];
const QUOTES = ["Not started", "Preparing", "Sent", "Revised", "Accepted", "Rejected"];
const OUTCOMES = ["Open", "Won", "Lost"];
const LABELS: Record<string, string> = {
  name: "Contact", company: "Company", phone: "Phone", email: "Email", projectType: "Project type", location: "Location", area: "Area (sq ft)",
  timeline: "Timeline", reference: "Similar to", fileLink: "File link", message: "Notes", workType: "Work type", quantity: "Quantity (MT)",
  drawings: "Drawings", deliveryDate: "Delivery date",
};

/**
 * Lead tracker (brief item 14): every website enquiry with the follow-up fields
 * the sales team maintains. Click = analytics; enquiry = a row here; qualified /
 * quoted / won are set here by the team.
 */
export default function LeadTracker() {
  const [state, setState] = useState<"loading" | "login" | "ready">("loading");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "peb" | "fabrication" | "followup">("all");
  const [saving, setSaving] = useState<string | null>(null);

  const load = useCallback(async () => {
    const r = await fetch("/api/leads", { cache: "no-store" });
    if (r.status === 401) return setState("login");
    const d = (await r.json()) as { leads: Lead[] };
    setLeads(d.leads);
    setState("ready");
  }, []);

  useEffect(() => {
    // initial fetch of server data on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const r = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (!r.ok) return setErr("Wrong password");
    const next = new URLSearchParams(location.search).get("next");
    if (next && next.startsWith(location.origin)) location.href = next;
    else load();
  };

  const update = async (ref: string, patch: Partial<Lead>) => {
    setLeads((ls) => ls.map((l) => (l.ref === ref ? { ...l, ...patch } : l)));
    setSaving(ref);
    await fetch("/api/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref, ...patch }) });
    setSaving(null);
  };

  const today = new Date().toISOString().slice(0, 10);
  const shown = useMemo(
    () =>
      leads.filter((l) =>
        filter === "all" ? true : filter === "followup" ? l.outcome === "Open" && l.status !== "Not a fit" && (!l.followUp || l.followUp <= today) : l.form === filter,
      ),
    [leads, filter, today],
  );
  const stat = {
    total: leads.length,
    qualified: leads.filter((l) => l.status === "Qualified").length,
    quoted: leads.filter((l) => ["Sent", "Revised", "Accepted", "Rejected"].includes(l.quote)).length,
    won: leads.filter((l) => l.outcome === "Won").length,
  };

  if (state === "loading") return <section className="wrap min-h-[60vh] pt-40 text-mute">Loading…</section>;

  if (state === "login")
    return (
      <section className="wrap flex min-h-[70vh] items-center justify-center pt-32">
        <form onSubmit={login} className="w-full max-w-sm border border-[var(--line-strong)] p-8">
          <h1 className="display text-2xl">Lead tracker</h1>
          <p className="mt-2 text-[14px] text-mute">Jagmount sales team only.</p>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" className="field mt-6" autoFocus />
          {err && <p className="mt-2 text-[14px] text-orange">{err}</p>}
          <button className="mt-4 w-full bg-orange py-3 font-medium text-white">Sign in</button>
        </form>
      </section>
    );

  const sel = "border border-[var(--line-strong)] bg-white px-2 py-1.5 text-[13px]";
  return (
    <section className="wrap pb-20 pt-32 md:pt-36">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mono text-[11px] text-orange">Internal</div>
          <h1 className="display text-[clamp(26px,3vw,38px)]">Lead tracker</h1>
        </div>
        <div className="flex gap-2">
          <a href="/api/leads?format=csv" download className="border border-[var(--line-strong)] px-4 py-2.5 text-[14px] hover:border-orange">
            Export CSV
          </a>
          <button onClick={load} className="border border-[var(--line-strong)] px-4 py-2.5 text-[14px] hover:border-orange">
            Refresh
          </button>
          <button
            onClick={async () => {
              await fetch("/api/leads", { method: "DELETE" });
              setState("login");
            }}
            className="px-3 text-[14px] text-mute underline"
          >
            Sign out
          </button>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 border-l border-t border-[var(--line)] md:grid-cols-4">
        {[
          ["Enquiries", stat.total],
          ["Qualified", stat.qualified],
          ["Quoted", stat.quoted],
          ["Won", stat.won],
        ].map(([k, v]) => (
          <div key={k} className="border-b border-r border-[var(--line)] p-4">
            <dt className="text-[13px] text-mute">{k}</dt>
            <dd className="display text-3xl">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["all", "All"],
            ["peb", "PEB projects"],
            ["fabrication", "Fabrication"],
            ["followup", "Follow-up due"],
          ] as const
        ).map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={`border px-3.5 py-2 text-[14px] ${filter === k ? "border-orange bg-orange text-white" : "border-[var(--line-strong)]"}`}>
            {l}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 text-mute">No enquiries here yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto" data-lenis-prevent>
          <table className="w-full min-w-[1100px] border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-[var(--line-strong)] text-left text-[12px] text-mute">
                {["Date", "Service", "Company / contact", "Size", "Source", "Status", "Est. value", "Owner", "Follow-up", "Quotation", "Outcome"].map((h) => (
                  <th key={h} className="py-2 pr-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((l) => (
                <FragmentRow key={l.ref} l={l} open={open === l.ref} toggle={() => setOpen(open === l.ref ? null : l.ref)} update={update} sel={sel} saving={saving === l.ref} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function FragmentRow({
  l,
  open,
  toggle,
  update,
  sel,
  saving,
}: {
  l: Lead;
  open: boolean;
  toggle: () => void;
  update: (ref: string, p: Partial<Lead>) => void;
  sel: string;
  saving: boolean;
}) {
  return (
    <>
      <tr className="border-b border-[var(--line)] align-top">
        <td className="py-3 pr-3">
          <button onClick={toggle} className="text-left">
            <div>{l.date.slice(0, 10)}</div>
            <div className="mono text-[10px] text-orange">{l.ref}</div>
          </button>
        </td>
        <td className="py-3 pr-3">{l.form === "peb" ? "PEB project" : "Fabrication"}</td>
        <td className="py-3 pr-3">
          <button onClick={toggle} className="text-left hover:text-orange">
            <div className="font-medium">{l.fields.company || "-"}</div>
            <div className="text-mute">{l.fields.name}</div>
          </button>
        </td>
        <td className="py-3 pr-3">{l.fields.area ? `${l.fields.area} sq ft` : l.fields.quantity ? `${l.fields.quantity} MT` : "-"}</td>
        <td className="max-w-[140px] truncate py-3 pr-3 text-mute" title={l.source}>
          {l.source}
        </td>
        <td className="py-3 pr-3">
          <select value={l.status} onChange={(e) => update(l.ref, { status: e.target.value })} className={sel}>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </td>
        <td className="py-3 pr-3">
          <input defaultValue={l.value} onBlur={(e) => e.target.value !== l.value && update(l.ref, { value: e.target.value })} placeholder="₹" className={`${sel} w-24`} />
        </td>
        <td className="py-3 pr-3">
          <input defaultValue={l.owner} onBlur={(e) => e.target.value !== l.owner && update(l.ref, { owner: e.target.value })} placeholder="Name" className={`${sel} w-24`} />
        </td>
        <td className="py-3 pr-3">
          <input type="date" value={l.followUp} onChange={(e) => update(l.ref, { followUp: e.target.value })} className={sel} />
        </td>
        <td className="py-3 pr-3">
          <select value={l.quote} onChange={(e) => update(l.ref, { quote: e.target.value })} className={sel}>
            {QUOTES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </td>
        <td className="py-3 pr-3">
          <select value={l.outcome} onChange={(e) => update(l.ref, { outcome: e.target.value })} className={sel}>
            {OUTCOMES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {saving && <span className="ml-2 text-[11px] text-mute">saving</span>}
        </td>
      </tr>
      {open && (
        <tr className="border-b border-[var(--line)] bg-graphite">
          <td colSpan={11} className="p-5">
            <div className="grid gap-6 md:grid-cols-3">
              <dl className="grid grid-cols-[120px_1fr] gap-x-3 gap-y-1.5 md:col-span-2">
                {Object.entries(l.fields).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-mute">{LABELS[k] ?? k}</dt>
                    <dd className="whitespace-pre-wrap">
                      {k === "phone" ? <a href={`tel:${v}`} className="text-orange">{v}</a> : k === "email" ? <a href={`mailto:${v}`} className="text-orange">{v}</a> : k === "fileLink" ? <a href={v} target="_blank" rel="noreferrer" className="text-orange">{v}</a> : v}
                    </dd>
                  </div>
                ))}
                <dt className="text-mute">Emailed to sales</dt>
                <dd>{l.notified ? "Yes" : "No (email not configured)"}</dd>
              </dl>
              <div>
                <div className="text-[13px] text-mute">Drawings</div>
                {l.files.length ? (
                  <ul className="mt-1 space-y-1">
                    {l.files.map((f) => (
                      <li key={f.pathname}>
                        <a href={`/api/leads/file?p=${encodeURIComponent(f.pathname)}`} download className="text-orange underline">
                          {f.name}
                        </a>{" "}
                        <span className="text-mute">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1">None uploaded</p>
                )}
                <div className="mt-4 text-[13px] text-mute">Internal notes</div>
                <textarea
                  defaultValue={l.notes}
                  onBlur={(e) => e.target.value !== l.notes && update(l.ref, { notes: e.target.value })}
                  rows={3}
                  className="field mt-1 text-[14px]"
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
