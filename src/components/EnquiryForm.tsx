"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { company, mailHref, projects, telHref, whatsapp, workTypes } from "@/lib/content";
import { track } from "@/lib/track";

export type FormKind = "peb" | "fabrication";

const MAX_BYTES = 4 * 1024 * 1024; // Vercel functions accept ~4.5 MB per request
const ACCEPT = ".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.xls,.xlsx,.zip";

const projectTypes = ["Factory / manufacturing plant", "Warehouse / logistics", "Industrial shed", "Commercial building", "Other"];
const timelines = ["Within 1 month", "1 to 3 months", "3 to 6 months", "6+ months / planning stage"];
const drawingStates = ["Fabrication / shop drawings ready", "GA / design drawings only", "No drawings yet"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; ref: string; confirmed: boolean } | { kind: "fallback"; summary: string };

/**
 * One component, two distinct forms: "Tell Us About Your Project" (PEB) and
 * "Send Your Drawings for a Fabrication Quote" (jobwork). Submissions go to
 * /api/enquiry; if the mail service isn't configured yet the visitor is offered
 * a pre-filled email or WhatsApp message instead, so no enquiry is lost.
 */
export default function EnquiryForm({ kind }: { kind: FormKind }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [works, setWorks] = useState<string[]>([]);
  const [ref, setRef] = useState("");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = new URLSearchParams(location.search).get("ref");
    const p = projects.find((x) => x.slug === r);
    // the page is prerendered, so the ?ref= deep link can only be read after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (p) setRef(`${p.name}, ${p.place}`);
  }, []);

  useEffect(() => {
    if (status.kind === "sent" || status.kind === "fallback") {
      root.current?.scrollIntoView({ block: "start" });
      gsap.from(root.current!.querySelectorAll("[data-done] > *"), { y: 16, autoAlpha: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" });
    }
  }, [status.kind]);

  const pickFiles = (list: FileList | null) => {
    const next = [...files, ...Array.from(list ?? [])];
    const total = next.reduce((a, f) => a + f.size, 0);
    if (total > MAX_BYTES) {
      setFileError("Attachments are limited to 4 MB in total. For larger drawings, paste a Google Drive, WeTransfer or Dropbox link below, or email them to us.");
      return;
    }
    setFileError("");
    setFiles(next);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("form", kind);
    fd.delete("files");
    files.forEach((f) => fd.append("files", f));
    if (kind === "fabrication") fd.set("workType", works.join(", ") || "Not specified");
    if (ref) fd.set("reference", ref);
    setStatus({ kind: "sending" });
    const hasDrawings = files.length > 0 || !!String(fd.get("fileLink") || "").trim();
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; ref?: string; confirmationSent?: boolean };
      if (res.ok && data.ok) {
        track("generate_lead", { form: kind, has_drawings: hasDrawings });
        if (hasDrawings) track("drawing_upload", { form: kind, files: files.length });
        setStatus({ kind: "sent", ref: data.ref ?? "", confirmed: !!data.confirmationSent });
        return;
      }
    } catch {
      /* fall through to the manual route */
    }
    setStatus({ kind: "fallback", summary: summarise(fd, kind, files) });
  };

  if (status.kind === "sent")
    return (
      <div ref={root} data-done className="scroll-mt-32 border border-orange bg-white p-6 md:p-10">
        <div className="mono text-[11px] text-orange">Enquiry received{status.ref ? ` · Ref ${status.ref}` : ""}</div>
        <h2 className="display mt-3 text-[clamp(26px,3vw,38px)]">Thank you. We have your enquiry.</h2>
        <p className="mt-4 max-w-lg text-bone/75">
          {kind === "peb"
            ? "Our projects team will review your requirement and contact you, usually within one working day."
            : "Our estimating team will review your drawings and come back with pricing or questions, usually within one working day."}
          {status.confirmed ? " A confirmation has been sent to your email." : ""}
        </p>
        <p className="mt-4 text-bone/75">
          Need to add something? Call{" "}
          <a href={telHref} className="font-medium text-orange underline">
            {company.phone}
          </a>{" "}
          or{" "}
          <a href={whatsapp(`Hi Jagmount, adding to my enquiry ${status.ref}`)} target="_blank" rel="noreferrer" className="font-medium text-orange underline">
            WhatsApp us
          </a>
          .
        </p>
      </div>
    );

  if (status.kind === "fallback")
    return (
      <div ref={root} data-done className="scroll-mt-32 border border-[var(--line-strong)] bg-white p-6 md:p-10">
        <div className="mono text-[11px] text-orange">One more step</div>
        <h2 className="display mt-3 text-[clamp(24px,2.8vw,34px)]">Send your enquiry by email or WhatsApp</h2>
        <p className="mt-4 max-w-lg text-bone/75">
          We couldn&apos;t submit the form automatically. Your details are filled in below, so just choose how to send them.
          {files.length > 0 && " Please attach your drawings to the email before sending."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`${mailHref}?subject=${encodeURIComponent(kind === "peb" ? "PEB project enquiry" : "Fabrication quote request")}&body=${encodeURIComponent(status.summary)}`}
            className="bg-orange px-5 py-3.5 font-medium text-white hover:bg-night"
          >
            Send by email
          </a>
          <a href={whatsapp(status.summary)} target="_blank" rel="noreferrer" className="bg-night px-5 py-3.5 font-medium text-white hover:bg-orange">
            Send on WhatsApp
          </a>
          <button onClick={() => setStatus({ kind: "idle" })} className="px-3 text-sm text-mute underline">
            Back to the form
          </button>
        </div>
      </div>
    );

  return (
    <div ref={root}>
      <form onSubmit={submit} className="grid gap-5 md:grid-cols-2" noValidate={false}>
        {/* honeypot */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        {ref && (
          <div className="bg-graphite px-4 py-3 text-[14px] md:col-span-2">
            Enquiring about a project similar to <span className="font-medium">{ref}</span>
          </div>
        )}

        {kind === "peb" ? (
          <>
            <label>
              <L req>Contact name</L>
              <input name="name" required autoComplete="name" className="field" />
            </label>
            <label>
              <L>Company</L>
              <input name="company" autoComplete="organization" className="field" />
            </label>
          </>
        ) : (
          <>
            <label>
              <L req>Company name</L>
              <input name="company" required autoComplete="organization" className="field" />
            </label>
            <label>
              <L req>Contact person</L>
              <input name="name" required autoComplete="name" className="field" />
            </label>
          </>
        )}
        <label>
          <L req>Phone</L>
          <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9+\-\s()]{8,}" className="field" />
        </label>
        <label>
          <L req>Email</L>
          <input name="email" type="email" required autoComplete="email" className="field" />
        </label>

        {kind === "peb" ? (
          <>
            <label>
              <L req>Project type</L>
              <select name="projectType" required className="field" defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {projectTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              <L req>Project location</L>
              <input name="location" required placeholder="City, state" autoComplete="address-level2" className="field" />
            </label>
            <label>
              <L req>Approx. built-up area (sq ft)</L>
              <input name="area" required inputMode="numeric" placeholder="e.g. 40,000" className="field" />
            </label>
            <label>
              <L req>Expected timeline</L>
              <select name="timeline" required className="field" defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {timelines.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </>
        ) : (
          <>
            <fieldset className="md:col-span-2">
              <legend className="mb-2 text-[14px] font-medium">
                Work type <span className="font-normal text-mute">(select all that apply)</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {workTypes.map((w) => {
                  const on = works.includes(w);
                  return (
                    <button
                      type="button"
                      key={w}
                      aria-pressed={on}
                      onClick={() => setWorks((x) => (on ? x.filter((y) => y !== w) : [...x, w]))}
                      className={`border px-3.5 py-2.5 text-[14px] transition-colors ${on ? "border-orange bg-orange text-white" : "border-[var(--line-strong)] hover:border-orange"}`}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <label>
              <L req>Estimated quantity (MT)</L>
              <input name="quantity" required inputMode="decimal" placeholder="e.g. 120" className="field" />
            </label>
            <label>
              <L req>Drawing availability</L>
              <select name="drawings" required className="field" defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {drawingStates.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              <L req>Required delivery date</L>
              <input name="deliveryDate" type="date" required className="field" />
            </label>
            <label>
              <L req>Delivery location</L>
              <input name="location" required placeholder="City, state" className="field" />
            </label>
          </>
        )}

        <div className="md:col-span-2">
          <L>{kind === "peb" ? "Drawings or documents" : "Drawings / specifications"}</L>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-1 border border-dashed border-[var(--line-strong)] bg-graphite px-4 py-6 text-center transition-colors hover:border-orange">
            <span className="text-[15px] font-medium">Choose files to upload</span>
            <span className="text-[13px] text-mute">PDF, DWG, DXF, images, Excel or ZIP · up to 4 MB in total</span>
            <input type="file" name="files" multiple accept={ACCEPT} className="sr-only" onChange={(e) => pickFiles(e.target.files)} />
          </label>
          {files.length > 0 && (
            <ul className="mt-2 space-y-1 text-[14px]">
              {files.map((f, i) => (
                <li key={f.name + i} className="flex items-center justify-between bg-graphite px-3 py-2">
                  <span className="truncate">
                    {f.name} <span className="text-mute">· {(f.size / 1024 / 1024).toFixed(1)} MB</span>
                  </span>
                  <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-mute hover:text-orange" aria-label={`Remove ${f.name}`}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {fileError && <p className="mt-2 text-[14px] text-orange">{fileError}</p>}
        </div>
        <label className="md:col-span-2">
          <L>Large files: share link</L>
          <input name="fileLink" type="url" placeholder="Google Drive, WeTransfer or Dropbox link" className="field" />
          <span className="mt-1.5 block text-[13px] text-mute">
            Or email large files to{" "}
            <a href={mailHref} className="underline">
              {company.email}
            </a>{" "}
            or send them on{" "}
            <a href={whatsapp()} target="_blank" rel="noreferrer" className="underline">
              WhatsApp
            </a>
            .
          </span>
        </label>
        <label className="md:col-span-2">
          <L>{kind === "peb" ? "Anything else (span, height, crane, mezzanine)" : "Notes (grades, finishing, inspection needs)"}</L>
          <textarea name="message" rows={3} className="field resize-y" />
        </label>

        <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-mute">
            <span className="text-orange">*</span> Required. We only use your details to respond to this enquiry.
          </p>
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="flex items-center justify-center gap-3 bg-orange px-7 py-4 font-medium text-white transition-colors hover:bg-night disabled:opacity-60"
          >
            {status.kind === "sending" ? "Sending…" : kind === "peb" ? "Send project enquiry" : "Send for a fabrication quote"}
          </button>
        </div>
      </form>
    </div>
  );
}

function L({ children, req }: { children: React.ReactNode; req?: boolean }) {
  return (
    <span className="mb-1.5 block text-[14px] font-medium">
      {children}
      {req ? <span className="text-orange"> *</span> : <span className="font-normal text-mute"> (optional)</span>}
    </span>
  );
}

function summarise(fd: FormData, kind: FormKind, files: File[]) {
  const g = (k: string) => String(fd.get(k) || "").trim() || "-";
  const lines =
    kind === "peb"
      ? [
          "PEB project enquiry",
          `Name: ${g("name")}`,
          `Company: ${g("company")}`,
          `Phone: ${g("phone")}`,
          `Email: ${g("email")}`,
          `Project type: ${g("projectType")}`,
          `Location: ${g("location")}`,
          `Built-up area: ${g("area")} sq ft`,
          `Timeline: ${g("timeline")}`,
        ]
      : [
          "Fabrication quote request",
          `Company: ${g("company")}`,
          `Contact: ${g("name")}`,
          `Phone: ${g("phone")}`,
          `Email: ${g("email")}`,
          `Work type: ${g("workType")}`,
          `Quantity: ${g("quantity")} MT`,
          `Drawings: ${g("drawings")}`,
          `Delivery date: ${g("deliveryDate")}`,
          `Delivery location: ${g("location")}`,
        ];
  if (fd.get("reference")) lines.push(`Similar to: ${g("reference")}`);
  if (fd.get("fileLink")) lines.push(`Files: ${g("fileLink")}`);
  if (files.length) lines.push(`Attachments: ${files.map((f) => f.name).join(", ")} (attaching to this email)`);
  if (fd.get("message")) lines.push("", g("message"));
  return lines.join("\n");
}
