import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

const TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/zip",
  "application/x-zip-compressed",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/acad",
  "image/vnd.dwg",
  "image/vnd.dxf",
  "application/dxf",
  "application/octet-stream",
];

/** Issues short-lived tokens so the browser uploads drawings straight to the private Blob store (up to 100 MB each). */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("enquiries/") || pathname.includes("..")) throw new Error("bad path");
        return { allowedContentTypes: TYPES, maximumSizeInBytes: 100 * 1024 * 1024, addRandomSuffix: true };
      },
      onUploadCompleted: async () => {},
    });
    return Response.json(json);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 400 });
  }
}
