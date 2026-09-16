const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "psametratech@gmail.com";

import type { SiteContent } from "./site-schema";

/** The version-controlled fallback and initial content used before Cloudinary is configured. */
export const defaultSite = {
  name: "Psametra",
  intros: {
    services: {
      label: "Our capabilities",
      title: "The right thinking.",
      accent: "The right technology.",
      description:
        "One considered approach, from the first idea to the systems that bring it to life.",
    },
    work: {
      label: "A look at what’s possible",
      title: "Thought made tangible.",
      accent: "Possibility, engineered.",
      description:
        "A collection of concept studies exploring the systems, experiences, and products we can create.",
    },
    about: {
      label: "The thinking behind Psametra",
      title: "Intentional by nature.",
      accent: "Precise by design.",
      description:
        "Psametra is the company Muhammad Saad and Abdur Rafay Khan are building to create focused software products, business systems, and websites.",
    },
    team: {
      label: "The people behind Psametra",
      title: "Two co-founders.",
      accent: "One shared standard.",
      description:
        "Complementary engineering and product perspectives, brought together around clear thinking and careful delivery.",
    },
    contact: {
      label: "Let’s build something that matters",
      title: "A good place",
      accent: "to start.",
      description:
        "A clear idea, a complex challenge, or an early what-if. We’d like to hear what you have in mind.",
    },
  },
  aboutStory: [
    "There is no shortage of technology. What matters is choosing the right approach, understanding the people who will use it, and getting the details right.",
    "We bring complementary strengths to the same work: software engineering, AI and backend systems alongside full-stack development, interfaces, and product delivery.",
    "Our aim is simple: to be a thoughtful partner to ambitious businesses, building systems that make sense today and leave room for tomorrow.",
  ],
  description:
    "Thoughtful software engineering, AI systems, and digital experiences for ambitious businesses.",
  email: contactEmail,
  founders: [
    {
      name: "Abdur Rafay Khan",
      role: "Co-founder",
      focus: "Full-stack development · Interfaces · Product delivery",
      description:
        "Connecting considered interfaces with the systems that bring them to life.",
      linkedin: "https://www.linkedin.com/in/abdur-rafay-khan-266579246/",
      portfolio: "https://abdur-rafay-khan-portfolio.vercel.app/",
    },
    {
      name: "Muhammad Saad",
      role: "Co-founder",
      focus: "Software engineering · AI/ML · Backend systems",
      description:
        "Connecting applied intelligence with dependable software foundations.",
      linkedin: "https://www.linkedin.com/in/muhammad-saad-492853407/",
      portfolio: "https://muhammadsaad-portfolio.vercel.app/",
    },
  ],
  logo: {
    light: "/brand/psametra-logo-dark.webp",
    dark: "/brand/psametra-logo-light.webp",
    originalLight: "/brand/psametra-logo-dark.png",
    originalDark: "/brand/psametra-logo-light.png",
  },
  navigation: [
    {
      label: "Services",
      href: "/services",
      note: "Capabilities",
      summary: "Focused technology for real business needs.",
      links: [
        { label: "Software engineering", href: "/services#software" },
        { label: "AI systems", href: "/services#ai" },
      ],
    },
    {
      label: "Work",
      href: "/work",
      note: "Selected concepts",
      summary: "See how we turn complexity into coherent systems.",
      links: [
        { label: "Software systems", href: "/work#systems" },
        { label: "Applied intelligence", href: "/work#intelligence" },
      ],
    },
    {
      label: "About",
      href: "/about",
      note: "Our perspective",
      summary: "The principles and thinking behind Psametra.",
      links: [
        { label: "Our story", href: "/about#story" },
        { label: "How we work", href: "/about#principles" },
      ],
    },
    {
      label: "Team",
      href: "/team",
      note: "Co-founders",
      summary: "Meet the two people building Psametra.",
      links: [
        { label: "Abdur Rafay Khan", href: "/team#abdur-rafay-khan" },
        { label: "Muhammad Saad", href: "/team#muhammad-saad" },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
      note: "Start a conversation",
      summary: "Bring us an idea, a challenge, or an early what-if.",
      links: [
        { label: "Project brief", href: "/contact#project-brief" },
        {
          label: "Email Psametra",
          href: `mailto:${contactEmail}`,
        },
      ],
    },
  ],
  home: {
    description:
      "We turn ambitious ideas into thoughtful software, intelligent systems, and digital experiences built to last.",
  },
  services: [
    {
      id: "software",
      title: "Software Engineering",
      summary: "Purpose-built systems. Made for your real-world complexity.",
      description:
        "Build around the way your business actually works. We turn complex requirements into clear, dependable software with room to evolve.",
      deliverables: [
        "Custom business applications",
        "Platform architecture & APIs",
        "System integration & modernization",
      ],
    },
    {
      id: "ai",
      title: "AI Systems",
      summary: "Intelligence that works. Beyond the proof of concept.",
      description:
        "Put intelligence where it makes a meaningful difference. We connect AI to your processes with explicit evaluation, human oversight, and a clear purpose.",
      deliverables: [
        "AI workflow automation",
        "Knowledge & retrieval systems",
        "Applied AI product development",
      ],
    },
    {
      id: "web",
      title: "Web Platforms",
      summary: "Fast, intuitive experiences. Without the unnecessary.",
      description:
        "Give your business a digital foundation that feels effortless to use. Accessible, responsive platforms with performance considered from the first decision.",
      deliverables: [
        "Company websites & web applications",
        "Customer & operations portals",
        "Performance & accessibility",
      ],
    },
    {
      id: "product",
      title: "Product Design & Strategy",
      summary: "The right questions. A clearer path from idea to product.",
      description:
        "Find the right thing to build before building it. We connect user needs and business goals to a focused product direction and a coherent experience.",
      deliverables: [
        "Product discovery & technical planning",
        "UX research & interface design",
        "Design systems & prototyping",
      ],
    },
  ],
  projects: [
    {
      id: "systems",
      title: "Custom Software Systems",
      category: "PLATFORM ENGINEERING",
      type: "system",
      summary: "One coherent workspace for the moving parts of a business.",
      challenge:
        "Fragmented tools make everyday operations harder than they need to be.",
      approach:
        "A modular operations platform that brings workflows, permissions, and information into one considered experience.",
      tags: ["Architecture", "Operations", "Custom software"],
    },
    {
      id: "intelligence",
      title: "AI-Enabled Operations",
      category: "APPLIED INTELLIGENCE",
      type: "ai",
      summary: "From scattered information to useful, actionable intelligence.",
      challenge:
        "Useful knowledge is often buried across documents and disconnected processes.",
      approach:
        "A retrieval-led assistant with source references, explicit review points, and well-defined boundaries for automation.",
      tags: ["Retrieval", "Human oversight", "Automation"],
    },
    {
      id: "experiences",
      title: "Digital Experiences",
      category: "DESIGN & DEVELOPMENT",
      type: "web",
      summary: "An expressive digital presence, engineered to feel effortless.",
      challenge:
        "A digital experience should express a business clearly without getting in the visitor’s way.",
      approach:
        "An accessible, performance-minded web platform that balances distinctive design with a clear customer journey.",
      tags: ["Interface design", "Web", "Accessibility"],
    },
    {
      id: "products",
      title: "Product Engineering",
      category: "IDEA TO IMPLEMENTATION",
      type: "product",
      summary: "A focused product foundation, ready for its next chapter.",
      challenge:
        "Early ideas need a clear scope and a reliable foundation before adding complexity.",
      approach:
        "A focused product slice supported by a reusable design system, typed interfaces, and a deliberate path to iteration.",
      tags: ["Discovery", "Design systems", "Engineering"],
    },
  ],
  principles: [
    {
      title: "Clarity before complexity.",
      description:
        "We ask questions, challenge assumptions, and make the path forward clear before we write the first line of code.",
    },
    {
      title: "Quality in the details.",
      description:
        "Good engineering is felt in the experience and found in the foundations. We care about both.",
    },
    {
      title: "Partnership, by design.",
      description:
        "Open conversations, shared context, and thoughtful decisions. We work with you, not around you.",
    },
    {
      title: "Built for the long view.",
      description:
        "Readable code. Documented decisions. Systems your team can understand, maintain, and grow.",
    },
  ],
  process: [
    {
      title: "Understand",
      description:
        "Align on the problem, the people, and what a useful outcome looks like.",
    },
    {
      title: "Define",
      description:
        "Make the scope, experience, and technical direction explicit.",
    },
    {
      title: "Build",
      description:
        "Develop in focused increments, with working software and regular feedback.",
    },
    {
      title: "Refine",
      description:
        "Test the details, document the decisions, and prepare for what comes next.",
    },
  ],
  seo: {
    home: {
      title: "Psametra — Software engineered for what’s next.",
      description:
        "Thoughtful software engineering, AI systems, and digital experiences for ambitious businesses.",
    },
    services: {
      title: "Services",
      description:
        "Software engineering, AI systems, web platforms, and product strategy. Explore what we can build together.",
    },
    work: {
      title: "Work & Concepts",
      description:
        "Explore conceptual directions for custom platforms, applied AI, digital experiences, and product engineering.",
    },
    about: {
      title: "About",
      description:
        "Independent thinking. Thoughtful engineering. Get to know the principles behind Psametra.",
    },
    team: {
      title: "Team",
      description:
        "Meet Psametra co-founders Abdur Rafay Khan and Muhammad Saad.",
    },
    contact: {
      title: "Start a Project",
      description:
        "Tell us what you have in mind. Start a conversation about your next software, AI, or digital product project.",
    },
  },
  appearance: {
    light: {
      surface: "#f7f7f5",
      ink: "#111111",
      muted: "#676b73",
      accent: "#124bea",
    },
    dark: {
      surface: "#050505",
      ink: "#f7f7f5",
      muted: "#969ca8",
      accent: "#306cfe",
    },
  },
  copy: {
    home: {
      heroLabel: "Independent thinking. Exceptional engineering.",
      heroTitle: "Software engineered",
      heroAccent: "for what’s next.",
      primaryAction: "Start a project",
      secondaryAction: "Explore our work",
      coordinate: "PS / 001 — THE POSSIBILITY OF PRECISE",
      caption: ["Built with intention.", "Designed to move you forward."],
      baseline: "SOFTWARE. INTELLIGENCE. POSSIBILITY.",
      discover: "Discover Psametra",
      clarityTitle: "Clarity in every system.",
      clarityDescription:
        "Complexity is everywhere.\nWe build what brings it into focus.",
      clarityAction: "Meet Psametra",
      capabilitiesLabel: "CAPABILITIES",
      capabilitiesCaption: "CONNECTED THINKING. COHERENT SYSTEMS.",
      workLabel: "SELECTED CONCEPTS",
      workTitle: "Possibility, made tangible.",
      workAction: "Explore all concepts",
      workNote:
        "Concept studies that illustrate our thinking. Not commissioned client work.",
      approachLabel: "OUR APPROACH",
      approachTitle: "A clearer path\nfrom insight to impact.",
      approachDescription:
        "Technology is only as valuable as the problem it solves. We bring clarity, care, and a long-term perspective to every decision.",
    },
    services: {
      processLabel: "A clear way forward",
      processTitle: "Deliberate at every step.",
    },
    about: {
      artCaption: "CLARITY / CARE / CRAFT",
      storyLabel: "A considered perspective",
      storyTitle: "More than what we build.\nHow we think.",
      principlesLabel: "Our operating principles",
      principlesTitle: "The foundations don’t change.",
    },
    team: { sectionLabel: "Co-founders" },
    contact: {
      sideTitle: "Every project starts\nwith a conversation.",
      sideDescription:
        "Tell us about your business, what you want to change, and where you’d like to go. A few thoughtful details are all we need to get started.",
      emailLabel: "Prefer email?",
      nextLabel: "What comes next",
      nextSteps: [
        "Align on your goals.",
        "Explore the right approach.",
        "Define a clear next step.",
      ],
      formServiceLabel: "What are you thinking about?",
      formDetailsLabel: "A little about your project",
      formNote:
        "This opens your email app. You review and send the message yourself. No email app? Download your brief instead.",
      emailAction: "Open email draft",
      downloadAction: "Download brief",
    },
    footer: {
      tagline: ["Thoughtfully built.", "For what comes next."],
      exploreLabel: "Explore",
      capabilitiesLabel: "Capabilities",
      companyLabel: "Company",
      closing: "Precision is a practice.",
    },
    cta: {
      label: "The next chapter starts here",
      title: "Something in mind?",
      accent: "Let’s make it matter.",
      action: "Start a conversation",
    },
  },
} satisfies SiteContent;

/** Client-only components use the fallback; server-rendered pages receive Cloudinary content. */
export const site: SiteContent = defaultSite;
export type { Project } from "./site-schema";
