import type { SVGProps } from "react";

/** Stroke icons drawn on a 24×24 grid. Decorative by default (aria-hidden). */
const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" strokeWidth={2.6} />,
  tick: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3l2.7 2.7L16 9.6" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.4v.1" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.6v.1" />
    </>
  ),
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M6.5 6.5h.01M9 6.5h.01" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  design: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5" />
    </>
  ),
  cloud: <path d="M7 18.5a4.5 4.5 0 01-.6-8.96A6 6 0 0118 10a4.25 4.25 0 01-.5 8.5H7z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  building: (
    <path d="M4 21V5.5A1.5 1.5 0 015.5 4h7A1.5 1.5 0 0114 5.5V21M14 10h4.5a1.5 1.5 0 011.5 1.5V21M3 21h18M7.5 8h3M7.5 12h3M7.5 16h3" />
  ),
  support: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  layers: (
    <>
      <path d="M4 7.5h16M4 12h10M4 16.5h13" />
      <circle cx="19" cy="16.5" r="1.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 9.5-4.4-1.3-7.5-4.9-7.5-9.5V6L12 3z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  phone: <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 005.1 5.1l1.4-2.3L19 14.5V18a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z" />,
  pin: (
    <>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0114 0C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 10.5V16M8 7.8v.1M12 16v-3.2a2.3 2.3 0 014.6 0V16M12 10.5V16" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.3a2.9 2.9 0 00-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 00-1.3-3.2 4.3 4.3 0 00-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 00-6 0C6.5 2.8 5.5 3.1 5.5 3.1a4.3 4.3 0 00-.1 3.2 4.6 4.6 0 00-1.3 3.2c0 4.6 2.8 5.7 5.5 6a2.9 2.9 0 00-.8 2.2V21" />
  ),
  x: <path d="M4 4l16 16M20 4L4 20" />,
} as const;

export type IconName = keyof typeof paths;

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { name: IconName };

export function Icon({ name, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
