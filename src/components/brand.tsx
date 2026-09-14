import Image from "next/image";
import { site } from "@/content/site";
/** Reserves the same dimensions for both supplied, unaltered brand variants. */
export function Brand({
  original = false,
  className = "",
  priority = true,
}: {
  original?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`brand ${className}`}>
      <Image
        className="logo-on-light"
        src={original ? site.logo.originalLight : site.logo.light}
        width={1536}
        height={1024}
        sizes="126px"
        alt="Psametra"
        priority={priority}
      />
      <Image
        className="logo-on-dark"
        src={original ? site.logo.originalDark : site.logo.dark}
        width={1536}
        height={1024}
        sizes="126px"
        alt="Psametra"
        priority={priority}
      />
    </span>
  );
}
