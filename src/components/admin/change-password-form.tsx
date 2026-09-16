"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ADMIN_PASSWORD_MAX_LENGTH,
  ADMIN_PASSWORD_MIN_LENGTH,
} from "@/lib/admin-password";

export function ChangePasswordForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: form.get("currentPassword"),
        newPassword: form.get("newPassword"),
        confirmation: form.get("confirmation"),
      }),
    });
    const result = (await response.json()) as { error?: string };
    if (!response.ok) {
      setMessage(result.error ?? "Unable to change your password.");
      setPending(false);
      return;
    }
    router.replace("/admin/login?password=changed");
    router.refresh();
  }

  return (
    <form className="admin-security-form" onSubmit={submit}>
      <label>
        Current password
        <input
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          disabled={!configured || pending}
        />
      </label>
      <label>
        New password
        <input
          name="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={ADMIN_PASSWORD_MIN_LENGTH}
          maxLength={ADMIN_PASSWORD_MAX_LENGTH}
          required
          disabled={!configured || pending}
        />
      </label>
      <label>
        Confirm new password
        <input
          name="confirmation"
          type="password"
          autoComplete="new-password"
          minLength={ADMIN_PASSWORD_MIN_LENGTH}
          maxLength={ADMIN_PASSWORD_MAX_LENGTH}
          required
          disabled={!configured || pending}
        />
      </label>
      <p className="admin-password-guidance">
        Use {ADMIN_PASSWORD_MIN_LENGTH}–{ADMIN_PASSWORD_MAX_LENGTH} characters
        and include at least three of these: lowercase, uppercase, numbers, and
        symbols.
      </p>
      <button type="submit" disabled={!configured || pending}>
        {pending ? "Updating password…" : "Change password"}
      </button>
      <p className="admin-form-message" role="alert">
        {message}
      </p>
    </form>
  );
}
