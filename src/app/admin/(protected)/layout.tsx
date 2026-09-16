import { redirect } from "next/navigation";
import { AdminLogout } from "@/components/admin/admin-logout";
import { getAdminSession } from "@/lib/admin-auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getAdminSession();
  if (!profile) redirect("/admin/login");
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-mark" href="/admin">
          p.
        </a>
        <div>
          <span>Signed in as</span>
          <strong>{profile.name}</strong>
          <small>{profile.username}</small>
        </div>
        <AdminLogout />
      </aside>
      {children}
    </main>
  );
}
