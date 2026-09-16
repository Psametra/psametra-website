import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { adminProfiles, getAdminSession } from "@/lib/admin-auth";
import { Brand } from "@/components/brand";
import { defaultSite } from "@/content/site";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ password?: string }>;
}) {
  if (await getAdminSession()) redirect("/admin");
  const passwordChanged = (await searchParams).password === "changed";
  return (
    <main className="admin-login-shell">
      <section className="admin-login-card">
        <Brand logo={defaultSite.logo} priority={false} />
        <div>
          <span className="admin-kicker">PRIVATE WORKSPACE</span>
          <h1>Psametra admin</h1>
          <p>Sign in with one of the two founder profiles.</p>
        </div>
        <AdminLoginForm
          notice={
            passwordChanged
              ? "Password updated. Sign in again with your new password."
              : undefined
          }
          profiles={adminProfiles.map(({ name, username }) => ({
            name,
            username,
          }))}
        />
      </section>
    </main>
  );
}
