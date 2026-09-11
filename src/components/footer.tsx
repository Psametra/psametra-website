import { site } from "@/content/site";
import { Brand } from "./brand";
import { SiteLink } from "./navigation/site-link";
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <SiteLink href="/" aria-label="Psametra home">
          <Brand />
        </SiteLink>
        <p>
          Thoughtfully built.
          <br />
          For what comes next.
        </p>
        <nav aria-label="Footer navigation">
          {site.navigation.map((item) => (
            <SiteLink href={item.href} key={item.href}>
              {item.label}
            </SiteLink>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getUTCFullYear()} Psametra. All rights reserved.
        </span>
        <span>{site.email}</span>
        <span>Precision is a practice.</span>
      </div>
    </footer>
  );
}
