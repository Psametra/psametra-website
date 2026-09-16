import {
  destroyAdminSession,
  hashAdminPassword,
  requireAdmin,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { saveAdminPasswordHash } from "@/lib/admin-credential-store";
import { validatePasswordChange } from "@/lib/admin-password";
import { isSameOrigin } from "@/lib/request-security";

export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return Response.json({ error: "Invalid request origin." }, { status: 403 });

  const profile = await requireAdmin().catch(() => null);
  if (!profile)
    return Response.json(
      { error: "Your session has expired." },
      { status: 401 },
    );

  const body = (await request.json().catch(() => null)) as {
    currentPassword?: string;
    newPassword?: string;
    confirmation?: string;
  } | null;
  const currentPassword = body?.currentPassword ?? "";
  const newPassword = body?.newPassword ?? "";
  const confirmation = body?.confirmation ?? "";
  const validationError = validatePasswordChange(
    currentPassword,
    newPassword,
    confirmation,
  );
  if (validationError)
    return Response.json({ error: validationError }, { status: 400 });

  if (!(await verifyAdminPassword(profile, currentPassword))) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return Response.json(
      { error: "Your current password is incorrect." },
      { status: 401 },
    );
  }

  try {
    await saveAdminPasswordHash(profile.id, hashAdminPassword(newPassword));
    await destroyAdminSession();
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        error:
          "Password storage is unavailable. Check the Cloudinary connection and try again.",
      },
      { status: 503 },
    );
  }
}
