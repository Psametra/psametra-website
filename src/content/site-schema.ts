export type PageKey =
  "home" | "services" | "work" | "about" | "team" | "contact";

export interface PageIntroContent {
  label: string;
  title: string;
  accent: string;
  description: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  note: string;
  summary: string;
  links: Array<{ label: string; href: string }>;
}

export interface ServiceContent {
  id: "software" | "ai" | "web" | "product";
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
}

export interface ProjectContent {
  id: string;
  title: string;
  category: string;
  type: "system" | "ai" | "web" | "product";
  summary: string;
  challenge: string;
  approach: string;
  tags: string[];
  status: "concept" | "live-concept";
  href?: string;
  image?: string;
}

export interface WorkStatContent {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
}

export interface SiteContent {
  name: string;
  description: string;
  email: string;
  home: { description: string };
  intros: Record<Exclude<PageKey, "home">, PageIntroContent>;
  aboutStory: string[];
  founders: Array<{
    name: string;
    role: string;
    focus: string;
    description: string;
    linkedin: string;
    portfolio: string;
  }>;
  logo: {
    light: string;
    dark: string;
    originalLight: string;
    originalDark: string;
  };
  navigation: NavigationItem[];
  services: ServiceContent[];
  projects: ProjectContent[];
  workStats: WorkStatContent[];
  principles: Array<{ title: string; description: string }>;
  process: Array<{ title: string; description: string }>;
  seo: Record<PageKey, { title: string; description: string }>;
  appearance: {
    light: { surface: string; ink: string; muted: string; accent: string };
    dark: { surface: string; ink: string; muted: string; accent: string };
  };
  copy: {
    home: {
      heroLabel: string;
      heroTitle: string;
      heroAccent: string;
      primaryAction: string;
      secondaryAction: string;
      coordinate: string;
      caption: string[];
      baseline: string;
      discover: string;
      clarityTitle: string;
      clarityDescription: string;
      clarityAction: string;
      capabilitiesLabel: string;
      capabilitiesCaption: string;
      workLabel: string;
      workTitle: string;
      workAction: string;
      workNote: string;
      approachLabel: string;
      approachTitle: string;
      approachDescription: string;
    };
    services: { processLabel: string; processTitle: string };
    about: {
      artCaption: string;
      storyLabel: string;
      storyTitle: string;
      principlesLabel: string;
      principlesTitle: string;
    };
    team: { sectionLabel: string };
    contact: {
      sideTitle: string;
      sideDescription: string;
      emailLabel: string;
      nextLabel: string;
      nextSteps: string[];
      formServiceLabel: string;
      formDetailsLabel: string;
      formNote: string;
      emailAction: string;
      downloadAction: string;
    };
    footer: {
      tagline: string[];
      exploreLabel: string;
      capabilitiesLabel: string;
      companyLabel: string;
      closing: string;
    };
    cta: { label: string; title: string; accent: string; action: string };
  };
}

const hexColor = /^#[0-9a-f]{6}$/i;
const contentId = /^[a-z0-9-]{1,60}$/;
const publicHref = /^(\/|mailto:|https:\/\/)/;
const imageHref = /^(\/|https:\/\/res\.cloudinary\.com\/)/;

/** Rejects malformed or unexpectedly large content before it reaches the public site. */
export function validateSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as SiteContent;
  if (JSON.stringify(value).length > 200_000) return false;
  if (
    !candidate.name ||
    !candidate.description ||
    !candidate.email ||
    !candidate.home?.description ||
    !candidate.intros ||
    !candidate.logo ||
    !candidate.seo ||
    !candidate.appearance ||
    !candidate.copy
  )
    return false;
  const arrays = [
    candidate.aboutStory,
    candidate.founders,
    candidate.navigation,
    candidate.services,
    candidate.projects,
    candidate.workStats,
    candidate.principles,
    candidate.process,
  ];
  if (arrays.some((entry) => !Array.isArray(entry) || entry.length > 50))
    return false;
  if (
    candidate.services.some(
      (service) =>
        !["software", "ai", "web", "product"].includes(service.id) ||
        !service.title ||
        !service.description ||
        !Array.isArray(service.deliverables),
    ) ||
    candidate.projects.some(
      (project) =>
        !contentId.test(project.id) ||
        !["system", "ai", "web", "product"].includes(project.type) ||
        !["concept", "live-concept"].includes(project.status) ||
        !Array.isArray(project.tags) ||
        (project.href !== undefined && !/^https:\/\//.test(project.href)) ||
        (project.image !== undefined && !imageHref.test(project.image)),
    ) ||
    candidate.workStats.some(
      (stat) =>
        !stat ||
        typeof stat.label !== "string" ||
        !stat.label ||
        stat.label.length > 80 ||
        typeof stat.value !== "number" ||
        !Number.isFinite(stat.value) ||
        stat.value < 0 ||
        stat.value > 1_000_000 ||
        typeof stat.prefix !== "string" ||
        typeof stat.suffix !== "string" ||
        stat.prefix.length > 10 ||
        stat.suffix.length > 10,
    ) ||
    candidate.navigation.some(
      (item) =>
        !publicHref.test(item.href) ||
        !Array.isArray(item.links) ||
        item.links.some((link) => !publicHref.test(link.href)),
    ) ||
    candidate.founders.some(
      (founder) =>
        !founder.name ||
        !founder.linkedin.startsWith("https://") ||
        !founder.portfolio.startsWith("https://"),
    ) ||
    Object.values(candidate.logo).some((source) => !imageHref.test(source))
  )
    return false;
  const themes = [candidate.appearance.light, candidate.appearance.dark];
  return themes.every(
    (theme) =>
      theme &&
      [theme.surface, theme.ink, theme.muted, theme.accent].every((color) =>
        hexColor.test(color),
      ),
  );
}

export type Project = ProjectContent;
