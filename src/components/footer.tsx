import type { SiteContent } from "@/content/site-schema";
import { Brand } from "./brand";
import { SiteLink } from "./navigation/site-link";
export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="footer dark-surface">
      <div className="container">
        <div className="footer-wordmark" aria-hidden="true">
          psametra
        </div>
        <div className="footer-top">
          <div className="footer-identity">
            <SiteLink href="/" aria-label="Psametra home">
              <Brand logo={content.logo} />
            </SiteLink>
            <p>
              {content.copy.footer.tagline.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className="footer-directory">
            <nav aria-label="Explore Psametra">
              <span>{content.copy.footer.exploreLabel}</span>
              {content.navigation.map((item) => (
                <SiteLink href={item.href} key={item.href}>
                  {item.label}
                </SiteLink>
              ))}
            </nav>
            <nav aria-label="Capabilities">
              <span>{content.copy.footer.capabilitiesLabel}</span>
              {content.services.map((service) => (
                <SiteLink href={`/services#${service.id}`} key={service.id}>
                  {service.title}
                </SiteLink>
              ))}
            </nav>
            <nav aria-label="Company information">
              <span>{content.copy.footer.companyLabel}</span>
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
          <a href={`mailto:${content.email}`}>{content.email}</a>
          <span>{content.copy.footer.closing}</span>
        </div>
      </div>
    </footer>
  );
}
