import { destroyAdminSession, requireAdmin } from "@/lib/admin-auth";
import { isSameOrigin } from "@/lib/request-security";

export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    await requireAdmin();
    await destroyAdminSession();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
}
