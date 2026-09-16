import type { ReactNode } from "react";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}

/** Canonical Psametra symbol for decorative contexts that need a scalable mark. */
export function PsametraMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M43 10a41 41 0 0 0 0 80V76a27 27 0 0 1 0-52ZM57 10a41 41 0 0 1 0 80V76a27 27 0 0 0 0-52Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Decorative geometry; the original company logo is rendered separately and remains intact. */
export function Eclipse() {
  return (
    <div className="eclipse">
      <div className="eclipse-half left" />
      <div className="eclipse-half right" />
    </div>
  );
}
