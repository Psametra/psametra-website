import { getSiteContent } from "@/lib/content-store";
import { pageMetadata } from "@/lib/site-metadata";
import { PageIntro } from "@/components/sections/page-intro";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionLabel } from "@/components/ui";
import { Brand } from "@/components/brand";
export async function generateMetadata() {
  return pageMetadata(await getSiteContent(), "about");
}
export default async function About() {
  const site = await getSiteContent();
  return (
    <>
      <PageIntro {...site.intros.about} />
      <section id="story" className="about-story container" data-reveal>
        <div className="about-art">
          <Brand
            logo={site.logo}
            original
            priority={false}
            className="about-brand"
          />
          <span>{site.copy.about.artCaption}</span>
        </div>
        <div>
          <SectionLabel>{site.copy.about.storyLabel}</SectionLabel>
          <h2 style={{ whiteSpace: "pre-line" }}>
            {site.copy.about.storyTitle}
          </h2>
          {site.aboutStory.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section id="principles" className="container section" data-reveal>
        <SectionLabel>{site.copy.about.principlesLabel}</SectionLabel>
        <h2>{site.copy.about.principlesTitle}</h2>
        <div className="about-principles">
          {site.principles.map((principle, index) => (
            <article key={principle.title}>
              <span className="index">0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactCta copy={site.copy.cta} />
    </>
  );
}
