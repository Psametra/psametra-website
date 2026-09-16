import { getSiteContent } from "@/lib/content-store";
import { pageMetadata } from "@/lib/site-metadata";
import { PageIntro } from "@/components/sections/page-intro";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionLabel } from "@/components/ui";
import { ServiceDiagram } from "@/components/sections/service-diagram";
export async function generateMetadata() {
  return pageMetadata(await getSiteContent(), "services");
}
export default async function Services() {
  const site = await getSiteContent();
  return (
    <>
      <PageIntro {...site.intros.services} />
      <section className="service-details container">
        {site.services.map((service, index) => (
          <article
            id={service.id}
            className="service-detail"
            key={service.id}
            data-reveal
          >
            <div className="service-illustration">
              <span className="index">0{index + 1} / CAPABILITY</span>
              <ServiceDiagram type={service.id} />
            </div>
            <div className="service-description">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul>
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="container section">
        <SectionLabel>{site.copy.services.processLabel}</SectionLabel>
        <h2>{site.copy.services.processTitle}</h2>
        <div className="process-grid">
          {site.process.map((step, index) => (
            <article key={step.title}>
              <span className="index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactCta copy={site.copy.cta} />
    </>
  );
}
