# PS IT Solutions — website

Marketing website for PS IT Solutions: Home, About, Services and Contact pages,
built with **Next.js 16 (App Router)**, **React 19** and **TypeScript**, using
plain CSS with design tokens (no UI framework).

## Quick start

Requires **Node.js 20.9 or newer** (Node 22 recommended, see `.nvmrc`).

```bash
npm install
cp .env.example .env.local      # then fill in values (see "Environment variables")
npm run dev                     # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript, strict mode |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm test` | All Playwright tests (unit + desktop + mobile); run `npm run build` first |
| `npm run check` | Typecheck, lint, build and test in one go |

First time running tests on a new machine: `npx playwright install chromium`.

## Project structure

```
app/
  layout.tsx            Root layout: fonts, header, footer, default metadata, JSON-LD
  page.tsx              Home
  about/page.tsx        About Us
  services/page.tsx     Services (one section per service, anchored by slug)
  contact/page.tsx      Contact page (reads ?service= to preselect a service)
  contact/actions.ts    Server Action for the contact form
  not-found.tsx         404 page
  sitemap.ts, robots.ts, manifest.ts
  opengraph-image.tsx   Generated 1200×630 social sharing image
  icon.svg, apple-icon.tsx   Favicon and Apple touch icon (Interlock logo)
  globals.css           Design tokens + shared components (buttons, header, footer, CTA)
  styles/               Page-level styles: home.css, pages.css (About/Services), contact.css
  fonts/                Self-hosted fonts (SIL Open Font License, see OFL.txt)
components/
  SiteHeader.tsx        Header + mobile menu (client component)
  SiteFooter.tsx        Footer
  Logo.tsx              Interlock logo mark + wordmark
  Icon.tsx              Inline stroke icon set
  ui.tsx                Small shared pieces: ButtonLink, SectionHead, CtaPanel, Tag, Ph, ...
  home/                 Home page sections (HeroVisual is the only client component)
  contact/ContactForm.tsx   Contact form (client component, uses the Server Action)
lib/
  site.ts               Company details, contact info, social links, proof points
  services.ts           Service catalogue (drives Home, Services, Contact form, Footer)
  inquiry.ts            Contact-form rules, shared by browser and server
  deliver-inquiry.ts    Email delivery through Resend
  metadata.ts           Per-page SEO / Open Graph helper
public/brand/           Logo SVGs for use outside the site
tests/
  unit/                 Validation and email formatting tests
  e2e/                  Browser tests: navigation, links, contact form, mobile menu,
                        responsive layout, accessibility (axe), motion, SEO
```

Only three components run in the browser (`SiteHeader`, `HeroVisual`,
`ContactForm`). Everything else is a Server Component, and every page except
Contact is pre-rendered as static HTML.

## Before launch: content to replace

Placeholder content is displayed with a dashed "placeholder" style so it can't be
mistaken for real information. Nothing about the company has been invented.

| Item | Where to change it |
| --- | --- |
| Email, phone, hours, address, city, response time | `lib/site.ts` → `contact` (swap `placeholder("…")` for `confirmed("…")`) |
| Social profile URLs | `lib/site.ts` → `social[].href` |
| Privacy policy link (required before collecting inquiries) | `lib/site.ts` → `privacyPolicyHref` |
| Proof points (projects, years, repeat clients, industries) | `lib/site.ts` → `proofPoints`, or set `showProofPoints: false` |
| Service lineup and wording | `lib/services.ts` |
| Featured work (three **fictional** concepts) | `components/home/FeaturedWork.tsx` |
| Company story, mission, vision | `app/about/page.tsx` |
| Technology stack (example list) | `app/about/page.tsx` → `stack` |
| Team names, roles, photos | `app/about/page.tsx` → team section |
| Engagement models | `app/services/page.tsx` → `engagements` |
| Map | `app/contact/page.tsx` → replace the illustrated placeholder with a static map image or a link to the address |

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | Public URL, e.g. `https://www.psitsolutions.com`. Used for canonical URLs, sitemap and social images. Defaults to `http://localhost:3000`. |
| `RESEND_API_KEY` | For the contact form | API key from [Resend](https://resend.com). |
| `CONTACT_FROM_EMAIL` | For the contact form | Sender address on a domain verified in Resend, e.g. `Website <website@psitsolutions.com>`. |
| `CONTACT_TO_EMAIL` | For the contact form | Inbox that receives inquiries. |

## Contact form: how it works and what it needs

1. The browser checks each field as the visitor types and on submit (rules in `lib/inquiry.ts`).
2. The **Server Action** (`app/contact/actions.ts`) re-validates everything with the same rules,
   rejects bots via a hidden honeypot field, then calls `deliverInquiry`.
3. `deliverInquiry` emails the inquiry through Resend's REST API (no extra npm package), with the
   visitor's address as `reply_to`.

**Without the three `RESEND_*` / `CONTACT_*` variables, nothing is sent**, and the visitor sees a clear
"Your inquiry has not been sent" message with their details and the email address to use instead.
The site never claims a message was sent when it wasn't.

The form also works with JavaScript disabled (the Server Action handles a normal form post).

Recommended before go-live:

- Set the three environment variables and send a test inquiry.
- Publish a privacy policy and set `privacyPolicyHref`.
- Add rate limiting and stronger bot protection, e.g. Cloudflare Turnstile plus a per-IP limit
  (Vercel Firewall, Upstash Ratelimit or similar). This needs a shared store, so it isn't included.
- Optional: send inquiries to a CRM (HubSpot, Salesforce) by adding a second call in `lib/deliver-inquiry.ts`.

## Design system

- **Colors** (tokens in `app/globals.css`): Plum `#3B1C5A`, Coral `#FF6B57`, Lilac `#E8D9E3`,
  Blush `#FBF7F5`, Muted `#625A6B`. Coral *text* on light backgrounds uses `--coral-ink` `#B03626`
  so it meets WCAG AA contrast; bright coral is for fills, buttons and dark backgrounds.
- **Type**: Plus Jakarta Sans (headings and body), Instrument Serif Italic (one accent phrase per
  headline), JetBrains Mono (labels). All self-hosted with `next/font/local`, so the build needs no
  network access and visitors make no third-party font requests.
- **Logo**: the Interlock mark, two overlapping rounded squares in plum and coral. Use
  `<LogoMark variant="reversed" />` on plum backgrounds. Standalone SVGs are in `public/brand/`.
- **Motion**: load-in animations, scroll reveals (CSS scroll-driven animations; browsers without
  support simply show content without the effect), and a live hero illustration. Everything respects
  `prefers-reduced-motion`. Scroll reveals only move content, so nothing is ever hidden while waiting
  for an animation.

## Deployment

Any Node.js host works (`npm run build && npm start`). On **Vercel**: import the repository, set the
environment variables above, deploy. No other configuration is needed.

Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`)
are set in `next.config.ts`. Consider adding a Content Security Policy once analytics or other
third-party scripts are chosen.

## Testing

See `TEST-REPORT.md` for the latest results. CI runs the same checks on every push
(`.github/workflows/ci.yml`).
