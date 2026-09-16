import { requireAdmin } from "@/lib/admin-auth";
import { getSiteContent, saveSiteContent } from "@/lib/content-store";
import { isSameOrigin } from "@/lib/request-security";

export async function GET() {
  try {
    await requireAdmin();
    return Response.json(await getSiteContent(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  if (!isSameOrigin(request))
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    await requireAdmin();
    const content: unknown = await request.json();
    return Response.json(await saveSiteContent(content));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save content.";
    const status = message === "UNAUTHORIZED" ? 401 : 400;
    return Response.json({ error: message }, { status });
  }
}
