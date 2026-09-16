import "server-only";

import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { cache } from "react";
import { defaultSite } from "@/content/site";
import { validateSiteContent, type SiteContent } from "@/content/site-schema";

const CONTENT_PUBLIC_ID = "psametra/cms/site-content";

function isCloudinaryConfigured() {
  return Boolean(process.env.CLOUDINARY_URL);
}

function configureCloudinary() {
  if (!isCloudinaryConfigured()) return false;
  cloudinary.config({ secure: true });
  return true;
}

function contentUrl() {
  const { cloud_name: cloudName } = cloudinary.config();
  if (!cloudName) return null;
  return `https://res.cloudinary.com/${cloudName}/raw/upload/${CONTENT_PUBLIC_ID}.json`;
}

/** Reads the latest public editorial document, falling back safely during setup or outages. */
const readSiteContent = async (): Promise<SiteContent> => {
  if (!configureCloudinary()) return structuredClone(defaultSite);
  const url = contentUrl();
  if (!url) return structuredClone(defaultSite);
  try {
    const response = await fetch(`${url}?fresh=${Date.now()}`, {
      cache: "no-store",
    });
    if (!response.ok) return structuredClone(defaultSite);
    const content: unknown = await response.json();
    return validateSiteContent(content)
      ? content
      : structuredClone(defaultSite);
  } catch {
    return structuredClone(defaultSite);
  }
};

/** React request memoization prevents the layout, metadata, and page from fetching three times. */
export const getSiteContent = cache(readSiteContent);

/** Publishes an atomic, versioned Cloudinary raw asset after schema validation. */
export async function saveSiteContent(content: unknown): Promise<SiteContent> {
  if (!validateSiteContent(content))
    throw new Error("The content document is invalid.");
  if (!configureCloudinary()) throw new Error("Cloudinary is not configured.");
  const file = `data:application/json;base64,${Buffer.from(
    JSON.stringify(content),
  ).toString("base64")}`;
  await cloudinary.uploader.upload(file, {
    resource_type: "raw",
    public_id: CONTENT_PUBLIC_ID,
    format: "json",
    overwrite: true,
    invalidate: true,
    tags: ["psametra-cms", "site-content"],
  });
  return content;
}

export async function seedSiteContent() {
  return saveSiteContent(structuredClone(defaultSite));
}

export async function uploadAdminMedia(file: File): Promise<UploadApiResponse> {
  if (!configureCloudinary()) throw new Error("Cloudinary is not configured.");
  if (!file.type.startsWith("image/"))
    throw new Error("Only image files are supported.");
  if (file.size > 6 * 1024 * 1024)
    throw new Error("Images must be 6 MB or smaller.");
  const source = `data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`;
  return cloudinary.uploader.upload(source, {
    resource_type: "image",
    folder: "psametra/cms/media",
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    tags: ["psametra-cms"],
  });
}

export function contentStoreStatus() {
  return {
    provider: "Cloudinary",
    configured: isCloudinaryConfigured(),
    document: CONTENT_PUBLIC_ID,
  };
}
