import "server-only";

import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "psametra-admin";
const SESSION_SECONDS = 60 * 60 * 8;

export const adminProfiles = [
  {
    id: "abdur-rafay-khan",
    name: "Abdur Rafay Khan",
    username: "abdurrafaykhan@psametra.tech",
    passwordEnvironmentKey: "ADMIN_ABDUR_PASSWORD_HASH",
  },
  {
    id: "muhammad-saad",
    name: "Muhammad Saad",
    username: "muhammadsaad@psametra.tech",
    passwordEnvironmentKey: "ADMIN_SAAD_PASSWORD_HASH",
  },
] as const;

export type AdminProfile = (typeof adminProfiles)[number];

interface SessionPayload {
  profileId: AdminProfile["id"];
  expiresAt: number;
}

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function hashAdminPassword(
  password: string,
  salt = randomBytes(16).toString("hex"),
) {
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

function passwordMatches(password: string, stored: string | undefined) {
  if (!stored) return false;
  const [salt, expectedHex] = stored.split(":");
  if (!salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function authenticateAdmin(username: string, password: string) {
  const normalized = username.trim().toLowerCase();
  const profile = adminProfiles.find(
    (candidate) => candidate.username === normalized,
  );
  if (!profile) return null;
  return passwordMatches(password, process.env[profile.passwordEnvironmentKey])
    ? profile
    : null;
}

export async function createAdminSession(profile: AdminProfile) {
  const payload: SessionPayload = {
    profileId: profile.id,
    expiresAt: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
  };
  const encoded = encode(JSON.stringify(payload));
  const signature = sign(encoded);
  if (!signature) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  const store = await cookies();
  store.set(COOKIE_NAME, `${encoded}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const [encoded, receivedSignature] = token.split(".");
  const expectedSignature = encoded && sign(encoded);
  if (!encoded || !receivedSignature || !expectedSignature) return null;
  const received = Buffer.from(receivedSignature);
  const expected = Buffer.from(expectedSignature);
  if (
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  )
    return null;
  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString(),
    ) as SessionPayload;
    if (payload.expiresAt <= Date.now() / 1000) return null;
    return (
      adminProfiles.find((profile) => profile.id === payload.profileId) ?? null
    );
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const profile = await getAdminSession();
  if (!profile) throw new Error("UNAUTHORIZED");
  return profile;
}
