export interface ProjectBrief {
  name: string;
  email: string;
  company: string;
  service: string;
  details: string;
}

/** Produces plain text suitable for both a local download and a draft in the visitor’s email client. */
export function formatProjectBrief(brief: ProjectBrief): string {
  return `PSAMETRA — PROJECT BRIEF\n\nName: ${brief.name.trim()}\nEmail: ${brief.email.trim()}\nCompany: ${brief.company.trim() || "Not specified"}\nArea: ${brief.service}\n\n${brief.details.trim()}`;
}
