"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import Link from "next/link";
import { Arrow } from "@/components/ui";

/** A native modal provides focus containment, Escape dismissal, and background exclusion. */
export function MobileMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);
  return (
    <div className="mobile-menu">
      <button
        className="icon-button"
        aria-label="Open menu"
        onClick={() => dialog.current?.showModal()}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 8h16M4 16h16" />
        </svg>
      </button>
      <dialog ref={dialog} className="menu-dialog" aria-label="Navigation menu">
        <div className="menu-top">
          <span>PSAMETRA / EXPLORE</span>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {site.navigation.map((item, index) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => dialog.current?.close()}
            >
              <span>0{index + 1}</span>
              {item.label}
              <Arrow diagonal />
            </Link>
          ))}
        </nav>
        <p>Good things begin with a conversation.</p>
        <Link
          className="button primary"
          href="/contact"
          onClick={() => dialog.current?.close()}
        >
          Start a project <Arrow />
        </Link>
      </dialog>
    </div>
  );
}
