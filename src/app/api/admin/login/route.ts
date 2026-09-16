import { authenticateAdmin, createAdminSession } from "@/lib/admin-auth";
import { isSameOrigin } from "@/lib/request-security";

export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  const body = (await request.json().catch(() => null)) as {
    username?: string;
    password?: string;
  } | null;
  if (!body?.username || !body.password)
    return Response.json(
      { error: "Enter both profile name and password." },
      { status: 400 },
    );
  const profile = authenticateAdmin(body.username, body.password);
  if (!profile) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return Response.json(
      { error: "Those details do not match an admin profile." },
      { status: 401 },
    );
  }
  await createAdminSession(profile);
  return Response.json({ ok: true, profile: { name: profile.name } });
}
