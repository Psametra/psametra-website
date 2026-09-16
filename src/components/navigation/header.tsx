import type { SiteContent } from "@/content/site-schema";
import { Brand } from "@/components/brand";
import { SiteLink } from "./site-link";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { HeaderBehavior } from "./header-behavior";
export function Header({ content }: { content: SiteContent }) {
  return (
    <HeaderBehavior>
      <div className="header-inner container">
        <SiteLink href="/" aria-label="Psametra home">
          <Brand logo={content.logo} />
        </SiteLink>
        <nav aria-label="Main navigation">
          {content.navigation.map((item) => (
            <div className="nav-item" key={item.href}>
              <SiteLink href={item.href}>{item.label}</SiteLink>
              <div className="nav-dropdown">
                <span>{item.note}</span>
                <p>{item.summary}</p>
                <div>
                  {item.links.map((link) => (
                    <SiteLink href={link.href} key={link.href}>
                      {link.label} <span aria-hidden="true">↗</span>
                    </SiteLink>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <SiteLink
            className="icon-button profile-link"
            href="/admin"
            aria-label="Open founder admin"
            title="Founder admin"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.25" />
              <path d="M5.75 19c.55-3.4 2.63-5.1 6.25-5.1s5.7 1.7 6.25 5.1" />
            </svg>
          </SiteLink>
          <ThemeToggle />
          <MobileMenu navigation={content.navigation} />
        </div>
      </div>
    </HeaderBehavior>
  );
}
