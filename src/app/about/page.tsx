import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageIntro } from "@/components/sections/page-intro";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionLabel } from "@/components/ui";
import { Brand } from "@/components/brand";
export const metadata: Metadata = {
  title: "About",
  description:
    "Independent thinking. Thoughtful engineering. Get to know the principles behind Psametra.",
};
export default function About() {
  return (
    <>
      <PageIntro {...site.intros.about} />
      <section id="story" className="about-story container" data-reveal>
        <div className="about-art">
          <Brand original priority={false} className="about-brand" />
          <span>CLARITY / CARE / CRAFT</span>
        </div>
        <div>
          <SectionLabel>A considered perspective</SectionLabel>
          <h2>
            More than what we build.
            <br />
            How we think.
          </h2>
          {site.aboutStory.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section id="principles" className="container section" data-reveal>
        <SectionLabel>Our operating principles</SectionLabel>
        <h2>The foundations don’t change.</h2>
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
      <ContactCta />
    </>
  );
}
