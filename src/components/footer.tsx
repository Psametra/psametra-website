import { site } from "@/content/site";
import { Brand } from "./brand";
import { SiteLink } from "./navigation/site-link";
export function Footer() {
  return (
    <footer className="footer dark-surface">
      <div className="container">
        <div className="footer-wordmark" aria-hidden="true">
          psametra
        </div>
        <div className="footer-top">
          <div className="footer-identity">
            <SiteLink href="/" aria-label="Psametra home">
              <Brand />
            </SiteLink>
            <p>
              Thoughtfully built.
              <br />
              For what comes next.
            </p>
          </div>
          <div className="footer-directory">
            <nav aria-label="Explore Psametra">
              <span>Explore</span>
              {site.navigation.map((item) => (
                <SiteLink href={item.href} key={item.href}>
                  {item.label}
                </SiteLink>
              ))}
            </nav>
            <nav aria-label="Capabilities">
              <span>Capabilities</span>
              {site.services.map((service) => (
                <SiteLink href={`/services#${service.id}`} key={service.id}>
                  {service.title}
                </SiteLink>
              ))}
            </nav>
            <nav aria-label="Company information">
              <span>Company</span>
              <SiteLink href="/about#story">Our story</SiteLink>
              <SiteLink href="/about#principles">Our principles</SiteLink>
              <SiteLink href="/team">Co-founders</SiteLink>
              <SiteLink href="/contact#project-brief">Project brief</SiteLink>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} Psametra. All rights reserved.
          </span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>Precision is a practice.</span>
        </div>
      </div>
    </footer>
  );
}
