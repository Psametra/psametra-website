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
          <ThemeToggle />
          <MobileMenu navigation={content.navigation} />
        </div>
      </div>
    </HeaderBehavior>
  );
}
