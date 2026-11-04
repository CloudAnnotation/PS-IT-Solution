/**
 * Site-wide content and settings.
 *
 * Anything wrapped in `placeholder()` is shown on the site with a dashed
 * "placeholder" style so nobody mistakes it for real company information.
 * Replace each one with `confirmed("real value")` once the client approves it.
 */

export type Editable = {
  readonly value: string;
  readonly placeholder: boolean;
};

export const placeholder = (value: string): Editable => ({ value, placeholder: true });
export const confirmed = (value: string): Editable => ({ value, placeholder: false });

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export const site = {
  name: "PS IT Solutions",
  shortName: "PS IT",
  tagline: "Software & IT",
  description:
    "PS IT Solutions plans, designs, builds and supports custom software, web and mobile applications, and cloud systems for growing US businesses.",
  url: resolveSiteUrl(),
  locale: "en_US",

  contact: {
    email: placeholder("hello@yourcompany.com"),
    phone: placeholder("+1 (000) 000-0000"),
    hours: placeholder("Mon–Fri, 9am–6pm ET"),
    address: placeholder("Street address, City, State ZIP"),
    city: placeholder("City, State"),
    responseTime: placeholder("response time, e.g. one business day"),
  },

  /** Social profiles. Leave `href` null until the real profile URL is known. */
  social: [
    { label: "LinkedIn", icon: "linkedin", href: null },
    { label: "GitHub", icon: "github", href: null },
    { label: "X", icon: "x", href: null },
  ] as const satisfies ReadonlyArray<{ label: string; icon: "linkedin" | "github" | "x"; href: string | null }>,

  /** Set to a real URL once a privacy policy is published. */
  privacyPolicyHref: null as string | null,

  /**
   * Proof points on the home page. Replace with verified figures, or set
   * `showProofPoints` to false to hide the row entirely.
   */
  showProofPoints: true,
  proofPoints: [
    { value: placeholder("00+"), label: "Projects delivered" },
    { value: placeholder("00"), label: "Years in business" },
    { value: placeholder("00%"), label: "Repeat clients" },
    { value: placeholder("00"), label: "Industries served" },
  ],
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
