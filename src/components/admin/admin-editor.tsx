"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import type { SiteContent } from "@/content/site-schema";

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type Path = Array<string | number>;

const sectionLabels: Record<string, string> = {
  name: "Identity",
  description: "Identity",
  email: "Identity",
  home: "Homepage",
  intros: "Page introductions",
  aboutStory: "About story",
  founders: "Founders",
  logo: "Brand assets",
  navigation: "Navigation",
  services: "Services",
  projects: "Work",
  principles: "Principles",
  process: "Process",
  seo: "SEO",
  appearance: "Appearance",
  copy: "Page copy",
};

const tabs = [
  "Identity",
  "Homepage",
  "Page introductions",
  "Page copy",
  "Services",
  "Work",
  "About story",
  "Principles",
  "Process",
  "Founders",
  "Navigation",
  "Brand assets",
  "SEO",
  "Appearance",
];

function titleCase(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function updateAtPath(root: JsonValue, path: Path, next: JsonValue): JsonValue {
  if (!path.length) return next;
  const [head, ...tail] = path;
  if (Array.isArray(root)) {
    const copy = [...root];
    copy[Number(head)] = updateAtPath(copy[Number(head)], tail, next);
    return copy;
  }
  const copy = { ...(root as { [key: string]: JsonValue }) };
  copy[String(head)] = updateAtPath(copy[String(head)], tail, next);
  return copy;
}

function FieldEditor({
  label,
  value,
  path,
  onChange,
}: {
  label: string;
  value: JsonValue;
  path: Path;
  onChange: (path: Path, value: JsonValue) => void;
}) {
  if (typeof value === "string") {
    const long =
      value.length > 80 ||
      /description|summary|approach|challenge|story/i.test(label);
    const isColor = /^#[0-9a-f]{6}$/i.test(value);
    return (
      <label className="admin-field">
        <span>{titleCase(label)}</span>
        <div className="admin-input-pair">
          {isColor && (
            <input
              aria-label={`${label} color picker`}
              type="color"
              value={value}
              onChange={(event) => onChange(path, event.target.value)}
            />
          )}
          {long ? (
            <textarea
              value={value}
              rows={3}
              onChange={(event) => onChange(path, event.target.value)}
            />
          ) : (
            <input
              value={value}
              onChange={(event) => onChange(path, event.target.value)}
            />
          )}
        </div>
      </label>
    );
  }
  if (typeof value === "boolean")
    return (
      <label className="admin-check">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(path, event.target.checked)}
        />
        {titleCase(label)}
      </label>
    );
  if (typeof value === "number")
    return (
      <label className="admin-field">
        <span>{titleCase(label)}</span>
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(path, Number(event.target.value))}
        />
      </label>
    );
  if (Array.isArray(value)) {
    return (
      <fieldset className="admin-group">
        <legend>{titleCase(label)}</legend>
        {value.map((entry, index) => (
          <div className="admin-array-item" key={`${path.join(".")}-${index}`}>
            <div className="admin-array-actions">
              <strong>
                {titleCase(label)} {index + 1}
              </strong>
              <button
                type="button"
                onClick={() => onChange(path, value.toSpliced(index, 1))}
              >
                Remove
              </button>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const next = [...value];
                    [next[index - 1], next[index]] = [
                      next[index],
                      next[index - 1],
                    ];
                    onChange(path, next);
                  }}
                >
                  Move up
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  onChange(
                    path,
                    value.toSpliced(index + 1, 0, structuredClone(entry)),
                  )
                }
              >
                Duplicate
              </button>
            </div>
            <FieldEditor
              label="details"
              value={entry}
              path={[...path, index]}
              onChange={onChange}
            />
          </div>
        ))}
        <button
          className="admin-add-button"
          type="button"
          onClick={() =>
            onChange(path, [
              ...value,
              value.length ? structuredClone(value.at(-1)!) : "",
            ])
          }
        >
          + Add item
        </button>
      </fieldset>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div className="admin-object">
        {label !== "details" && <h3>{titleCase(label)}</h3>}
        {Object.entries(value).map(([key, child]) => (
          <FieldEditor
            key={key}
            label={key}
            value={child}
            path={[...path, key]}
            onChange={onChange}
          />
        ))}
      </div>
    );
  }
  return null;
}

export function AdminEditor({
  initialContent,
  configured,
}: {
  initialContent: SiteContent;
  configured: boolean;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [tab, setTab] = useState(tabs[0]);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [rawMode, setRawMode] = useState(false);
  const [raw, setRaw] = useState(JSON.stringify(initialContent, null, 2));
  const [uploadedUrl, setUploadedUrl] = useState("");

  const entries = useMemo(
    () => Object.entries(content).filter(([key]) => sectionLabels[key] === tab),
    [content, tab],
  );

  function change(path: Path, value: JsonValue) {
    setContent(
      (current) =>
        updateAtPath(
          current as unknown as JsonValue,
          path,
          value,
        ) as unknown as SiteContent,
    );
    setMessage("Unsaved changes");
  }

  async function save() {
    setPending(true);
    setMessage("");
    let next = content;
    if (rawMode) {
      try {
        next = JSON.parse(raw) as SiteContent;
      } catch {
        setMessage("The JSON has a syntax error.");
        setPending(false);
        return;
      }
    }
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    const result = (await response.json()) as SiteContent & { error?: string };
    if (!response.ok) setMessage(result.error ?? "Could not publish changes.");
    else {
      setContent(result);
      setRaw(JSON.stringify(result, null, 2));
      setMessage("Published. The public site now uses these changes.");
    }
    setPending(false);
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage("Uploading image…");
    const form = new FormData();
    form.set("file", file);
    const response = await fetch("/api/admin/media", {
      method: "POST",
      body: form,
    });
    const result = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !result.url)
      setMessage(result.error ?? "Upload failed.");
    else {
      setUploadedUrl(result.url);
      setMessage("Image uploaded. Copy its URL into any brand asset field.");
    }
    event.target.value = "";
  }

  return (
    <div className="admin-workspace">
      {!configured && (
        <div className="admin-warning">
          <strong>Cloudinary connection required</strong>
          <span>
            The editor is showing repository defaults. Configure CLOUDINARY_URL
            before publishing.
          </span>
        </div>
      )}
      <div className="admin-toolbar">
        <div>
          <h1>Site control</h1>
          <p>Edit Psametra’s live content and presentation.</p>
        </div>
        <div className="admin-toolbar-actions">
          <a href="/" target="_blank">
            Open site ↗
          </a>
          <button
            className="admin-quiet-button"
            type="button"
            onClick={() => {
              setRaw(JSON.stringify(content, null, 2));
              setRawMode((value) => !value);
            }}
          >
            {rawMode ? "Visual editor" : "Advanced JSON"}
          </button>
          <button
            className="admin-primary-button"
            type="button"
            disabled={pending || !configured}
            onClick={save}
          >
            {pending ? "Publishing…" : "Publish changes"}
          </button>
        </div>
      </div>
      <div className="admin-media-bar">
        <label>
          Upload a site image{" "}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={upload}
            disabled={!configured}
          />
        </label>
        {uploadedUrl && (
          <div>
            <input
              readOnly
              value={uploadedUrl}
              aria-label="Uploaded image URL"
            />
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(uploadedUrl)}
            >
              Copy URL
            </button>
          </div>
        )}
      </div>
      <p className="admin-status" role="status">
        {message}
      </p>
      {rawMode ? (
        <div className="admin-raw">
          <label>
            Complete site document
            <textarea
              value={raw}
              spellCheck={false}
              onChange={(event) => {
                setRaw(event.target.value);
                setMessage("Unsaved changes");
              }}
            />
          </label>
        </div>
      ) : (
        <div className="admin-editor-grid">
          <nav aria-label="Content sections">
            {tabs.map((item) => (
              <button
                type="button"
                aria-current={tab === item ? "page" : undefined}
                onClick={() => setTab(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </nav>
          <section className="admin-fields">
            <header>
              <span>Editing</span>
              <h2>{tab}</h2>
            </header>
            {entries.map(([key, value]) => (
              <FieldEditor
                key={key}
                label={key}
                value={value as JsonValue}
                path={[key]}
                onChange={change}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
