import type { IconName } from "@/components/Icon";

/**
 * Service catalogue. The lineup is pending client confirmation: remove or
 * edit entries here and every page (home, services, contact form, footer)
 * updates automatically.
 */
export type Service = {
  /** URL-safe id, used for `/services#<slug>` anchors and `?service=<slug>`. */
  slug: string;
  name: string;
  shortName: string;
  icon: IconName;
  summary: string;
  description: string;
  capabilities: readonly string[];
  benefits: readonly string[];
  cta: string;
};

export const services = [
  {
    slug: "custom-software",
    name: "Custom Software Development",
    shortName: "Custom software",
    icon: "code",
    summary:
      "Purpose-built systems for the workflows off-the-shelf tools can't handle, from internal operations platforms to customer-facing products.",
    description:
      "Purpose-built systems for the workflows off-the-shelf tools can't handle, from internal operations platforms to customer-facing products.",
    capabilities: [
      "Requirements and solution architecture",
      "Internal tools, portals and workflow automation",
      "ERP, CRM and back-office extensions",
      "API design and third-party integrations",
    ],
    benefits: [
      "Software that matches your process",
      "Fewer manual handoffs and spreadsheets",
      "You own the code and the roadmap",
    ],
    cta: "Discuss custom software",
  },
  {
    slug: "web-applications",
    name: "Web Application Development",
    shortName: "Web applications",
    icon: "web",
    summary: "Secure, fast web apps and customer portals that scale with demand.",
    description:
      "Fast, secure web applications and customer portals built on modern frameworks and designed to scale with demand.",
    capabilities: [
      "SaaS products and multi-tenant platforms",
      "Customer and partner portals",
      "Progressive web apps",
      "Performance, SEO and accessibility work",
    ],
    benefits: [
      "Quick load times that keep users engaged",
      "One codebase across browsers and devices",
      "Room to grow without a rebuild",
    ],
    cta: "Discuss a web app",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Application Development",
    shortName: "Mobile apps",
    icon: "mobile",
    summary: "iOS and Android apps customers enjoy using.",
    description:
      "iOS and Android apps your customers and field teams want to use, built native or cross-platform depending on the job.",
    capabilities: [
      "Cross-platform apps with React Native or Flutter",
      "Native iOS (Swift) and Android (Kotlin)",
      "Offline mode, push notifications and device features",
      "App Store and Google Play release management",
    ],
    benefits: [
      "Reach customers on the device they use most",
      "Shared code lowers build and upkeep cost",
      "Store releases handled end to end",
    ],
    cta: "Discuss a mobile app",
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    shortName: "UI/UX design",
    icon: "design",
    summary: "Research-backed product design that makes complex software feel simple.",
    description:
      "Research-backed product design that makes complex software feel simple, from first wireframe to a documented design system.",
    capabilities: [
      "User research and journey mapping",
      "Wireframes, prototypes and usability testing",
      "Visual design and design systems",
      "Accessibility reviews against WCAG 2.2",
    ],
    benefits: [
      "Higher adoption and fewer support requests",
      "Ideas validated before development spend",
      "A consistent experience across products",
    ],
    cta: "Discuss UI/UX design",
  },
  {
    slug: "cloud-solutions",
    name: "Cloud Solutions",
    shortName: "Cloud solutions",
    icon: "cloud",
    summary: "Migration, DevOps and infrastructure with cost control built in.",
    description:
      "Cloud architecture, migration and DevOps on AWS, Microsoft Azure or Google Cloud, with security and cost control built in.",
    capabilities: [
      "Cloud migration and modernization",
      "Infrastructure as code and CI/CD pipelines",
      "Containers and serverless architectures",
      "Monitoring, backups and cost optimization",
    ],
    benefits: ["Reliable uptime as usage grows", "Faster, repeatable releases", "Predictable infrastructure spend"],
    cta: "Discuss cloud solutions",
  },
  {
    slug: "software-consulting",
    name: "Software Consulting",
    shortName: "Software consulting",
    icon: "compass",
    summary: "Independent guidance on what to build, buy or modernize.",
    description: "Independent technical guidance for big decisions: what to build, what to buy, and how to get there.",
    capabilities: [
      "Technology strategy and roadmaps",
      "Architecture and code reviews",
      "Build-versus-buy and vendor evaluation",
      "Project recovery and technical due diligence",
    ],
    benefits: [
      "Clear recommendations backed by evidence",
      "Lower risk on major investments",
      "A plan your team can execute",
    ],
    cta: "Book a consultation",
  },
  {
    slug: "enterprise-solutions",
    name: "Enterprise Solutions",
    shortName: "Enterprise solutions",
    icon: "building",
    summary: "Connect departments, data and legacy platforms.",
    description:
      "Systems that connect departments, data and legacy platforms so larger organizations can operate as one.",
    capabilities: [
      "Legacy system modernization",
      "Data integration and reporting dashboards",
      "Role-based access and audit trails",
      "Single sign-on and identity integration",
    ],
    benefits: [
      "One source of truth across teams",
      "Lower cost of maintaining aging systems",
      "Controls that support compliance needs",
    ],
    cta: "Discuss enterprise needs",
  },
  {
    slug: "it-support",
    name: "IT Support & Maintenance",
    shortName: "IT support & maintenance",
    icon: "support",
    summary: "Monitoring, updates and fixes under a clear agreement.",
    description:
      "Ongoing care for the software you depend on: monitoring, updates, fixes and improvements under a clear service agreement.",
    capabilities: [
      "Application monitoring and incident response",
      "Security patches and dependency updates",
      "Bug fixes and minor enhancements",
      "Defined response times under an SLA",
    ],
    benefits: [
      "Fewer surprises in production",
      "Software that stays secure and current",
      "A team that already knows your system",
    ],
    cta: "Discuss a support plan",
  },
] as const satisfies readonly Service[];

export type ServiceSlug = (typeof services)[number]["slug"];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
