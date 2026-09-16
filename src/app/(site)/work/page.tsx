import { getSiteContent } from "@/lib/content-store";
import { pageMetadata } from "@/lib/site-metadata";
import { PageIntro } from "@/components/sections/page-intro";
import { ProjectVisual } from "@/components/sections/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
export async function generateMetadata() {
  return pageMetadata(await getSiteContent(), "work");
}
export default async function Work() {
  const site = await getSiteContent();
  return (
    <>
      <PageIntro {...site.intros.work} />
      <section className="container work-details">
        {site.projects.map((project) => (
          <article id={project.id} key={project.id} className="work-detail">
            <ProjectVisual project={project} />
            <div className="work-detail-copy" data-reveal>
              <p className="eyebrow">{project.category} / CONCEPT</p>
              <h2>{project.title}</h2>
              <p className="work-lead">{project.summary}</p>
              <div className="work-context">
                <h3>The challenge</h3>
                <p>{project.challenge}</p>
              </div>
              <div className="work-context">
                <h3>The direction</h3>
                <p>{project.approach}</p>
              </div>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
      <ContactCta copy={site.copy.cta} />
    </>
  );
}
