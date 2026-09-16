import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import {
  adminProfiles,
  type AdminProfile,
  type AdminProfileId,
} from "@/lib/admin-profiles";
import { isAdminPasswordHash } from "@/lib/admin-password";

const CREDENTIALS_PUBLIC_ID = "psametra/cms/admin-credentials";

interface CredentialDocument {
  version: 1;
  credentials: Record<AdminProfileId, string>;
}

interface EncryptedEnvelope {
  version: 1;
  iv: string;
  tag: string;
  ciphertext: string;
}

function configureCloudinary() {
  if (!process.env.CLOUDINARY_URL) return false;
  cloudinary.config({ secure: true });
  return true;
}

function encryptionKey() {
  const secret = process.env.ADMIN_CREDENTIALS_SECRET;
  if (!secret || secret.length < 32) return null;
  return createHash("sha256").update(secret).digest();
}

function credentialsUrl() {
  const { cloud_name: cloudName } = cloudinary.config();
  if (!cloudName) return null;
  return `https://res.cloudinary.com/${cloudName}/raw/upload/${CREDENTIALS_PUBLIC_ID}.json`;
}

function isCredentialDocument(value: unknown): value is CredentialDocument {
  if (!value || typeof value !== "object") return false;
  const document = value as Partial<CredentialDocument>;
  return (
    document.version === 1 &&
    Boolean(document.credentials) &&
    adminProfiles.every((profile) =>
      isAdminPasswordHash(document.credentials?.[profile.id]),
    )
  );
}

function isEncryptedEnvelope(value: unknown): value is EncryptedEnvelope {
  if (!value || typeof value !== "object") return false;
  const envelope = value as Partial<EncryptedEnvelope>;
  return (
    envelope.version === 1 &&
    typeof envelope.iv === "string" &&
    typeof envelope.tag === "string" &&
    typeof envelope.ciphertext === "string"
  );
}

function encryptDocument(document: CredentialDocument) {
  const key = encryptionKey();
  if (!key) throw new Error("Admin credential encryption is not configured.");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(document), "utf8"),
    cipher.final(),
  ]);
  return {
    version: 1,
    iv: iv.toString("base64url"),
    tag: cipher.getAuthTag().toString("base64url"),
    ciphertext: ciphertext.toString("base64url"),
  } satisfies EncryptedEnvelope;
}

function decryptDocument(envelope: EncryptedEnvelope) {
  const key = encryptionKey();
  if (!key) return null;
  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(envelope.iv, "base64url"),
    );
    decipher.setAuthTag(Buffer.from(envelope.tag, "base64url"));
    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(envelope.ciphertext, "base64url")),
      decipher.final(),
    ]).toString("utf8");
    const document: unknown = JSON.parse(plaintext);
    return isCredentialDocument(document) ? document : null;
  } catch {
    return null;
  }
}

function fallbackCredentials() {
  return Object.fromEntries(
    adminProfiles.map((profile) => [
      profile.id,
      process.env[profile.passwordEnvironmentKey],
    ]),
  ) as Record<AdminProfileId, string | undefined>;
}

async function readStoredCredentials() {
  if (!configureCloudinary() || !encryptionKey()) return null;
  const url = credentialsUrl();
  if (!url) return null;
  try {
    const response = await fetch(`${url}?fresh=${Date.now()}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    const envelope: unknown = await response.json();
    return isEncryptedEnvelope(envelope) ? decryptDocument(envelope) : null;
  } catch {
    return null;
  }
}

/** Resolves the mutable Cloudinary credential first, then the Vercel recovery hash. */
export async function getAdminPasswordHash(profile: AdminProfile) {
  const stored = await readStoredCredentials();
  return (
    stored?.credentials[profile.id] ??
    process.env[profile.passwordEnvironmentKey]
  );
}

/** Atomically replaces one founder hash while preserving the other founder's login. */
export async function saveAdminPasswordHash(
  profileId: AdminProfileId,
  passwordHash: string,
) {
  if (!isAdminPasswordHash(passwordHash))
    throw new Error("The generated password credential is invalid.");
  if (!configureCloudinary() || !encryptionKey())
    throw new Error("Cloudinary credential storage is not configured.");

  const existing = await readStoredCredentials();
  const fallbacks = fallbackCredentials();
  const credentials = Object.fromEntries(
    adminProfiles.map((profile) => [
      profile.id,
      profile.id === profileId
        ? passwordHash
        : (existing?.credentials[profile.id] ?? fallbacks[profile.id]),
    ]),
  ) as Record<AdminProfileId, string>;
  if (
    !adminProfiles.every((profile) =>
      isAdminPasswordHash(credentials[profile.id]),
    )
  )
    throw new Error("The founder recovery credentials are incomplete.");

  const envelope = encryptDocument({ version: 1, credentials });
  const source = `data:application/json;base64,${Buffer.from(
    JSON.stringify(envelope),
  ).toString("base64")}`;
  await cloudinary.uploader.upload(source, {
    resource_type: "raw",
    public_id: CREDENTIALS_PUBLIC_ID,
    format: "json",
    overwrite: true,
    invalidate: true,
    tags: ["psametra-cms", "admin-credentials"],
  });
}

export function credentialStoreStatus() {
  return {
    provider: "Cloudinary",
    configured: Boolean(process.env.CLOUDINARY_URL && encryptionKey()),
    document: CREDENTIALS_PUBLIC_ID,
  };
}
