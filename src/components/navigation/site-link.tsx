"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
/** Adds active-route semantics; transition interception is owned centrally by TransitionProvider. */
export function SiteLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      aria-current={pathname === props.href ? "page" : undefined}
      {...props}
    />
  );
}
