"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm({
  profiles,
  notice,
}: {
  profiles: Array<{ name: string; username: string }>;
  notice?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });
    const result = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(result.error ?? "Unable to sign in.");
      setPending(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      {notice && (
        <p className="admin-form-notice" role="status">
          {notice}
        </p>
      )}
      <label>
        Admin profile
        <select name="username" autoComplete="username">
          {profiles.map((profile) => (
            <option value={profile.username} key={profile.username}>
              {profile.name} · {profile.username}
            </option>
          ))}
        </select>
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={12}
        />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="admin-form-message" role="alert">
        {error}
      </p>
    </form>
  );
}
