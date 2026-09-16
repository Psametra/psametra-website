import { PageIntro } from "@/components/sections/page-intro";
import { ContactForm } from "@/components/contact-form";
import { getSiteContent } from "@/lib/content-store";
import { pageMetadata } from "@/lib/site-metadata";

export async function generateMetadata() {
  return pageMetadata(await getSiteContent(), "contact");
}
export default async function Contact() {
  const site = await getSiteContent();
  return (
    <>
      <PageIntro {...site.intros.contact} />
      <section id="project-brief" className="contact-layout container">
        <aside>
          <h2 style={{ whiteSpace: "pre-line" }}>
            {site.copy.contact.sideTitle}
          </h2>
          <p>{site.copy.contact.sideDescription}</p>
          <div className="contact-direct">
            <span className="eyebrow">{site.copy.contact.emailLabel}</span>
            <a className="text-link email-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <div className="contact-next">
            <span className="eyebrow">{site.copy.contact.nextLabel}</span>
            <p>
              {site.copy.contact.nextSteps.map((step) => (
                <span key={step}>
                  {step}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </aside>
        <ContactForm
          email={site.email}
          services={site.services}
          copy={site.copy.contact}
        />
      </section>
    </>
  );
}
