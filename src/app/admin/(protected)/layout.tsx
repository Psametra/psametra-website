import { redirect } from "next/navigation";
import Link from "next/link";
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
        <nav className="admin-sidebar-nav" aria-label="Admin workspace">
          <Link href="/admin">Content</Link>
          <Link href="/admin/security">Security</Link>
          <Link href="/" target="_blank">
            View site ↗
          </Link>
        </nav>
        <div className="admin-profile-summary">
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
