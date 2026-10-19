import { cookies } from "next/headers";
import { get } from "@vercel/blob";
import { COOKIE, validSession } from "@/lib/leads";

/** Streams an uploaded drawing from the private store to a logged-in tracker user. */
export async function GET(request: Request) {
  const p = new URL(request.url).searchParams.get("p") || "";
  if (!validSession((await cookies()).get(COOKIE)?.value)) return Response.redirect(new URL(`/leads?next=${encodeURIComponent(request.url)}`, request.url));
  if (!p.startsWith("enquiries/") || p.includes("..")) return new Response("Not found", { status: 404 });
  const r = await get(p, { access: "private" });
  if (!r || !r.stream) return new Response("Not found", { status: 404 });
  const name = p.split("/").pop() || "file";
  return new Response(r.stream, {
    headers: { "Content-Type": r.blob.contentType || "application/octet-stream", "Content-Disposition": `attachment; filename="${name}"`, "Cache-Control": "private, no-store" },
  });
}
