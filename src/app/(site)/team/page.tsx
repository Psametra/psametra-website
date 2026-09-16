import { getSiteContent } from "@/lib/content-store";
import { pageMetadata } from "@/lib/site-metadata";
import { PageIntro } from "@/components/sections/page-intro";
import { ContactCta } from "@/components/sections/contact-cta";
import { Arrow, SectionLabel } from "@/components/ui";

export async function generateMetadata() {
  return pageMetadata(await getSiteContent(), "team");
}

const founderId = (name: string) => name.toLowerCase().replaceAll(" ", "-");

export default async function Team() {
  const site = await getSiteContent();
  return (
    <>
      <PageIntro {...site.intros.team} />
      <section className="team-section container section">
        <SectionLabel>{site.copy.team.sectionLabel}</SectionLabel>
        <div className="team-grid">
          {site.founders.map((founder, index) => (
            <article
              id={founderId(founder.name)}
              className="team-profile"
              key={founder.name}
              data-reveal
            >
              <div className="team-profile-heading">
                <span className="index">
                  0{index + 1} / {founder.role}
                </span>
                <span className="team-monogram" aria-hidden="true">
                  {founder.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              </div>
              <h2>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {founder.name} <Arrow diagonal />
                </a>
              </h2>
              <p className="founder-focus">{founder.focus}</p>
              <p>{founder.description}</p>
              <div className="team-links">
                <a
                  className="text-link"
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <Arrow diagonal />
                </a>
                <a
                  className="text-link"
                  href={founder.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio <Arrow diagonal />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactCta copy={site.copy.cta} />
    </>
  );
}
