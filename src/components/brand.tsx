import Image from "next/image";
import type { SiteContent } from "@/content/site-schema";
/** Reserves the same dimensions for both supplied, unaltered brand variants. */
export function Brand({
  original = false,
  className = "",
  priority = true,
  logo,
}: {
  original?: boolean;
  className?: string;
  priority?: boolean;
  logo: SiteContent["logo"];
}) {
  return (
    <span className={`brand ${className}`}>
      <Image
        className="logo-on-light"
        src={original ? logo.originalLight : logo.light}
        width={1536}
        height={1024}
        sizes="126px"
        alt="Psametra"
        priority={priority}
      />
      <Image
        className="logo-on-dark"
        src={original ? logo.originalDark : logo.dark}
        width={1536}
        height={1024}
        sizes="126px"
        alt="Psametra"
        priority={priority}
      />
    </span>
  );
}
