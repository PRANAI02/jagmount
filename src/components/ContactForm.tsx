"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { company } from "@/lib/content";

const types = ["Pre-Engineered Building", "Structural Fabrication", "Secondary Members", "PEB Accessories", "Solar / Green Building", "Other"];
const modes = [
  { id: "quote", label: "Project quote", hint: "Budgetary quote and design concept for a new building or steel package." },
  {
    id: "vendor",
    label: "Vendor empanelment",
    hint: "EPC contractors and developers: we'll send our registration documents, credentials and completion certificates.",
  },
  { id: "visit", label: "Plant visit", hint: "Audit our Palwal lines, processes and quality checks before you award a package." },
] as const;
type Mode = (typeof modes)[number]["id"];

const timelines = ["Immediately", "1 to 3 months", "3 to 6 months", "Planning stage"];

/**
 * Enquiry form. There is no mail backend yet, so submitting composes the
 * enquiry into the visitor's email app addressed to the sales inbox.
 */
export default function ContactForm() {
  const [mode, setMode] = useState<Mode>("quote");
  const [type, setType] = useState(types[0]);
  const [area, setArea] = useState(25000);
  const [sent, setSent] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const t = new URLSearchParams(location.search).get("type");
    // the page is statically prerendered, so the ?type= deep link can only be read after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t === "vendor" || t === "visit") setMode(t);
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const m = modes.find((x) => x.id === mode)!;
    const body = [
      `Enquiry: ${m.label}`,
      `Name: ${d.get("name")}`,
      `Company: ${d.get("company") || "-"}`,
      `Phone: ${d.get("phone")}`,
      `Email: ${d.get("email") || "-"}`,
      ...(mode === "quote"
        ? [
            `Requirement: ${type}`,
            `Approx. covered area: ${area.toLocaleString("en-IN")} sq ft`,
            `Site location: ${d.get("location") || "-"}`,
            `Timeline: ${d.get("timeline")}`,
          ]
        : mode === "visit"
          ? [`Preferred date: ${d.get("date") || "-"}`, `Visitors: ${d.get("visitors") || "-"}`]
          : [`Location: ${d.get("location") || "-"}`]),
      "",
      String(d.get("message") || ""),
    ].join("\n");
    const subject =
      mode === "quote"
        ? `Project enquiry: ${type}, ${area.toLocaleString("en-IN")} sq ft`
        : mode === "vendor"
          ? `Vendor empanelment request: ${d.get("company") || d.get("name")}`
          : `Plant visit request: ${d.get("company") || d.get("name")}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    gsap.to(form.current, {
      autoAlpha: 0,
      y: -30,
      duration: 0.5,
      onComplete: () => {
        setSent(true);
        requestAnimationFrame(() => gsap.from("[data-sent] > *", { y: 40, autoAlpha: 0, stagger: 0.08, duration: 0.8, ease: "expo.out" }));
      },
    });
  };

  if (sent)
    return (
      <div data-sent className="border border-orange bg-graphite p-8 md:p-12">
        <div className="mono text-[11px] text-orange">Enquiry ready</div>
        <h3 className="display mt-4 text-[clamp(32px,4vw,56px)]">Thank you.</h3>
        <p className="mt-4 max-w-md text-bone/70">
          Your email app should have opened with the enquiry filled in. Hit send and our team will reply within one working day. If nothing opened, write to{" "}
          <a className="text-orange underline" href={`mailto:${company.email}`}>
            {company.email}
          </a>{" "}
          or call {company.phones[0]}.
        </p>
        <button onClick={() => setSent(false)} className="mono mt-8 text-[11px] text-mute underline hover:text-orange">
          Start a new enquiry
        </button>
      </div>
    );

  const field =
    "peer w-full border-0 border-b border-[var(--line-strong)] bg-transparent px-0 pb-3 pt-6 text-lg text-bone outline-none transition-colors focus:border-orange placeholder:text-transparent";
  const label =
    "mono pointer-events-none absolute left-0 top-6 text-[11px] text-mute transition-all duration-300 peer-focus:top-0 peer-focus:text-orange peer-[:not(:placeholder-shown)]:top-0";

  return (
    <form ref={form} onSubmit={submit} className="space-y-10">
      <div>
        <div className="grid grid-cols-3 border border-[var(--line-strong)]" role="tablist" aria-label="Enquiry type">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`mono relative px-2 py-4 text-[10px] transition-colors duration-300 md:text-[11px] ${mode === m.id ? "bg-bone text-ink" : "text-mute hover:text-bone"}`}
            >
              {m.label}
              {mode === m.id && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-orange" />}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-bone/60">{modes.find((m) => m.id === mode)!.hint}</p>
      </div>

      {mode === "quote" && (
        <>
          <fieldset>
            <legend className="mono mb-4 text-[11px] text-mute">What do you need?</legend>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                  className={`border px-4 py-3 text-sm transition-colors duration-300 ${type === t ? "border-orange bg-orange text-ink" : "border-[var(--line-strong)] hover:border-orange"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mono mb-4 flex w-full items-baseline justify-between text-[11px] text-mute">
              <span>Approximate covered area</span>
              <span className="display text-2xl text-bone md:text-3xl">
                {area.toLocaleString("en-IN")} <span className="mono text-[11px] text-orange">sq ft</span>
              </span>
            </legend>
            <input
              type="range"
              min={2000}
              max={200000}
              step={1000}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="jm-range w-full"
              aria-label="Approximate covered area in square feet"
              style={{ ["--v" as string]: `${((area - 2000) / 198000) * 100}%` }}
            />
            <div className="mono mt-2 flex justify-between text-[10px] text-mute">
              <span>2,000</span>
              <span>2,00,000+</span>
            </div>
          </fieldset>
        </>
      )}

      <fieldset className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <legend className="mono mb-2 text-[11px] text-mute">Your details</legend>
        {[
          { n: "name", l: "Full name", req: true, type: "text", ac: "name" },
          { n: "company", l: "Company", type: "text", ac: "organization" },
          { n: "phone", l: "Phone", req: true, type: "tel", ac: "tel" },
          { n: "email", l: "Email", type: "email", ac: "email" },
          ...(mode === "visit"
            ? [
                { n: "date", l: "Preferred date", type: "text", ac: "off" },
                { n: "visitors", l: "Number of visitors", type: "text", ac: "off" },
              ]
            : [{ n: "location", l: mode === "vendor" ? "Company location" : "Site location", type: "text", ac: "address-level2" }]),
        ].map((f) => (
          <label key={f.n} className="relative block">
            <input name={f.n} type={f.type} required={f.req} autoComplete={f.ac} placeholder={f.l} className={field} />
            <span className={label}>
              {f.l}
              {f.req && <span className="text-orange"> *</span>}
            </span>
          </label>
        ))}
        {mode === "quote" && (
          <label className="relative block">
            <select name="timeline" className={`${field} appearance-none`} defaultValue={timelines[1]}>
              {timelines.map((t) => (
                <option key={t} className="bg-graphite">
                  {t}
                </option>
              ))}
            </select>
            <span className="mono pointer-events-none absolute left-0 top-0 text-[11px] text-mute">Timeline</span>
          </label>
        )}
        <label className="relative block md:col-span-2">
          <textarea name="message" rows={3} placeholder="Tell us about the project" className={`${field} resize-none`} />
          <span className={label}>
            {mode === "quote"
              ? "Span, height, crane, mezzanine, anything we should know"
              : mode === "vendor"
                ? "Packages you award, documents you need"
                : "What would you like to see?"}
          </span>
        </label>
      </fieldset>

      <button
        type="submit"
        className="group/btn mono flex w-full items-center justify-between bg-orange px-6 py-5 text-[12px] font-medium text-ink transition-colors hover:bg-bone md:w-auto md:gap-16"
      >
        {mode === "quote" ? "Send enquiry" : mode === "vendor" ? "Request documents" : "Request a visit"}
        <svg width="16" height="16" viewBox="0 0 14 14" className="transition-transform duration-500 group-hover/btn:rotate-45" aria-hidden>
          <path d="M2 12 12 2M4 2h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
    </form>
  );
}
