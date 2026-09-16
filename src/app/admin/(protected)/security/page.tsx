import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { requireAdmin } from "@/lib/admin-auth";
import { credentialStoreStatus } from "@/lib/admin-credential-store";

export const dynamic = "force-dynamic";

export default async function AdminSecurityPage() {
  const profile = await requireAdmin();
  const status = credentialStoreStatus();

  return (
    <section className="admin-security admin-workspace">
      <div className="admin-toolbar">
        <div>
          <span className="admin-kicker">ACCOUNT SECURITY</span>
          <h1>Change password</h1>
          <p>Update the password for {profile.username}.</p>
        </div>
      </div>
      {!status.configured && (
        <div className="admin-warning">
          <strong>Cloudinary connection required</strong>
          <span>
            Password changes will become available after the RMS Cloudinary
            account and credential encryption secret are connected.
          </span>
        </div>
      )}
      <div className="admin-security-grid">
        <div className="admin-security-card">
          <span className="admin-kicker">ACTIVE PROFILE</span>
          <h2>{profile.name}</h2>
          <p>{profile.username}</p>
          <dl>
            <div>
              <dt>Storage</dt>
              <dd>{status.provider}</dd>
            </div>
            <div>
              <dt>Session handling</dt>
              <dd>Signed out after change</dd>
            </div>
          </dl>
        </div>
        <div className="admin-security-card">
          <h2>Set a new password</h2>
          <p>
            Confirm your current password first. Only a one-way hash is kept;
            the password itself is never stored.
          </p>
          <ChangePasswordForm configured={status.configured} />
        </div>
      </div>
    </section>
  );
}
