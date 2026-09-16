import { getSiteContent } from "@/lib/content-store";
import { pageMetadata } from "@/lib/site-metadata";
import { Arrow, Eclipse, SectionLabel } from "@/components/ui";
import { SiteLink } from "@/components/navigation/site-link";
import { ProjectCard } from "@/components/sections/project-card";
import { ContactCta } from "@/components/sections/contact-cta";

export async function generateMetadata() {
  return pageMetadata(await getSiteContent(), "home");
}
export default async function Home() {
  const site = await getSiteContent();
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <SectionLabel>{site.copy.home.heroLabel}</SectionLabel>
          <h1>
            {site.copy.home.heroTitle}
            <br />
            {site.copy.home.heroAccent}
          </h1>
          <p className="hero-description">{site.home.description}</p>
          <div className="actions">
            <SiteLink className="button primary" href="/contact">
              {site.copy.home.primaryAction} <Arrow />
            </SiteLink>
            <SiteLink className="text-link" href="/work">
              {site.copy.home.secondaryAction} <Arrow />
            </SiteLink>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true" data-ambient>
          <span className="art-coordinate">{site.copy.home.coordinate}</span>
          <Eclipse />
          <div className="art-caption">
            {site.copy.home.caption.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
        <div className="hero-baseline">
          <span>{site.copy.home.baseline}</span>
          <a href="#capabilities">
            {site.copy.home.discover} <span>↓</span>
          </a>
        </div>
      </section>
      <section className="clarity-section dark-surface">
        <div className="container">
          <div className="section-rule">
            <span>02</span>
            <i />
            <span>A CLEARER TOMORROW</span>
          </div>
          <h2>{site.copy.home.clarityTitle}</h2>
          <p style={{ whiteSpace: "pre-line" }}>
            {site.copy.home.clarityDescription}
          </p>
          <SiteLink className="text-link" href="/about">
            {site.copy.home.clarityAction} <Arrow />
          </SiteLink>
        </div>
        <div className="statement-eclipse" aria-hidden="true" data-ambient>
          <Eclipse />
        </div>
      </section>
      <section id="capabilities" className="capabilities-section dark-surface">
        <div className="section container">
          <div className="section-rule">
            <span>03</span>
            <i />
            <span>{site.copy.home.capabilitiesLabel}</span>
          </div>
          <div className="capabilities-layout">
            <div className="capabilities" data-reveal>
              {site.services.map((service, index) => (
                <SiteLink
                  href={`/services#${service.id}`}
                  className="capability"
                  key={service.id}
                >
                  <span className="index">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <Arrow />
                </SiteLink>
              ))}
            </div>
            <div className="capabilities-art" aria-hidden="true" data-ambient>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three">
                <div className="orbit-point" />
              </div>
              <div className="orbit-axis horizontal" />
              <div className="orbit-axis vertical" />
              <Eclipse />
              <span className="orbit-caption">
                {site.copy.home.capabilitiesCaption}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="work-section dark-surface">
        <div className="container section">
          <div className="section-rule">
            <span>04</span>
            <i />
            <span>{site.copy.home.workLabel}</span>
          </div>
          <div className="section-heading">
            <h2>{site.copy.home.workTitle}</h2>
            <SiteLink className="text-link" href="/work">
              {site.copy.home.workAction} <Arrow diagonal />
            </SiteLink>
          </div>
          <div className="project-grid">
            {site.projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <p className="concept-note">{site.copy.home.workNote}</p>
        </div>
      </section>
      <section className="principles-section light-surface">
        <div className="container section">
          <div className="section-rule">
            <span>05</span>
            <i />
            <span>{site.copy.home.approachLabel}</span>
          </div>
          <div className="principle-intro" data-reveal>
            <h2 style={{ whiteSpace: "pre-line" }}>
              {site.copy.home.approachTitle}
            </h2>
            <p>{site.copy.home.approachDescription}</p>
          </div>
          <div className="principles-grid">
            {site.principles.map((principle, index) => (
              <div key={principle.title} data-reveal>
                <span className="index">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCta copy={site.copy.cta} />
    </>
  );
}
