import { site } from "@/content/site";
import { Brand } from "@/components/brand";
import { SiteLink } from "./site-link";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { HeaderBehavior } from "./header-behavior";
export function Header() {
  return (
    <HeaderBehavior>
      <div className="header-inner container">
        <SiteLink href="/" aria-label="Psametra home">
          <Brand />
        </SiteLink>
        <nav aria-label="Main navigation">
          {site.navigation.map((item) => (
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
          <MobileMenu />
        </div>
      </div>
    </HeaderBehavior>
  );
}
