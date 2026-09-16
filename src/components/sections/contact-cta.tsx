import { SiteLink } from "@/components/navigation/site-link";
import { Arrow, PsametraMark, SectionLabel } from "@/components/ui";
import type { SiteContent } from "@/content/site-schema";

export function ContactCta({ copy }: { copy: SiteContent["copy"]["cta"] }) {
  return (
    <section className="cta-section">
      <PsametraMark className="cta-mark" />
      <div className="container cta-inner">
        <div data-reveal>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2>
            {copy.title}
            <br />
            <span>{copy.accent}</span>
          </h2>
        </div>
        <SiteLink className="button primary" href="/contact">
          {copy.action} <Arrow diagonal />
        </SiteLink>
      </div>
    </section>
  );
}
