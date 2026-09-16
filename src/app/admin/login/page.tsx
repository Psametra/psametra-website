import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { adminProfiles, getAdminSession } from "@/lib/admin-auth";
import { Brand } from "@/components/brand";
import { defaultSite } from "@/content/site";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
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
          profiles={adminProfiles.map(({ name, username }) => ({
            name,
            username,
          }))}
        />
      </section>
    </main>
  );
}
