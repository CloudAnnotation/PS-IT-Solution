# Test report

**Date:** 4 November 2026  
**Build:** Next.js 16.4.2, React 19.3.1, TypeScript 5.9.3, Node.js 22.23  
**Browser:** Chromium (Playwright 1.63.0), desktop 1280×720 and Pixel 7 emulation

## Summary

| Check | Command | Result |
| --- | --- | --- |
| TypeScript (strict, `noUncheckedIndexedAccess`) | `npm run typecheck` | Pass, 0 errors |
| ESLint (Next core-web-vitals + TypeScript, `no-explicit-any` as error) | `npm run lint` | Pass, 0 errors, 0 warnings |
| Production build | `npm run build` | Pass; 10 static routes, `/contact` server-rendered |
| Unit tests | `npm run test:unit` | 14 passed |
| End-to-end, desktop | `npx playwright test --project=chromium` | 35 passed, 3 skipped (mobile-only) |
| End-to-end, mobile | `npx playwright test --project=mobile` | 30 passed, 8 skipped (desktop-only) |
| **Total** | `npm test` | **79 passed, 0 failed, 11 skipped by design** |

No `any`, no `@ts-ignore`, and no lint rules disabled in application code.

## Tests performed

| Area | Test | Expected | Actual | Result |
| --- | --- | --- | --- | --- |
| Pages | Home, About, Services, Contact return 200, correct `<title>`, exactly one `<h1>` | As expected | As expected | Pass |
| Pages | No console errors or uncaught exceptions on any page | None | None | Pass |
| Pages | Unknown URL | 404 page with working link home | As expected | Pass |
| Navigation | Each primary nav link routes and sets `aria-current="page"` | As expected | As expected | Pass |
| Navigation | Header "Let's talk" and logo links | Contact page / Home | As expected | Pass |
| Links | Every internal link on every page returns 200; every `#anchor` target exists | All resolve | All resolve | Pass |
| Links | No empty or `#` links | None | None | Pass |
| Links | Home service tiles, footer service links and Services index jump to the right section | Section in viewport | As expected | Pass |
| Links | "See how we work" scrolls to the process timeline | Section in viewport | As expected | Pass |
| Links | Service "Discuss…" CTA preselects that service on the contact form | `?service=` preselected | As expected | Pass |
| Keyboard | First Tab focuses "Skip to content"; Enter moves focus to `<main>` | As expected | As expected | Pass |
| Mobile menu | Opens; Escape closes and returns focus to the button; scroll lock released | As expected | As expected | Pass |
| Mobile menu | Menu link routes and closes the menu | As expected | As expected | Pass |
| Mobile menu | Closed menu is `inert` (not focusable) | As expected | As expected | Pass |
| Form | Empty submit: 4 field errors, focusable error summary, summary links focus the field | As expected | As expected | Pass |
| Form | Errors appear on blur and clear as the field is fixed | As expected | As expected | Pass |
| Form | Personal email (e.g. gmail.com) shows a hint without blocking | As expected | As expected | Pass |
| Form | Description under 30 characters blocks submission; counter updates | As expected | As expected | Pass |
| Form | Valid submission with no email provider configured | Says "Your inquiry has not been sent." and never "on its way" | As expected | Pass |
| Form | User input containing HTML is shown as text, not rendered | Escaped | Escaped | Pass |
| Form | "Back to the form" keeps values; "Start a new inquiry" clears them | As expected | As expected | Pass |
| Form | Unknown `?service=` value (e.g. `<script>`) is ignored | No preselection | As expected | Pass |
| Form | JavaScript disabled: server validates, then shows the honest not-sent result | As expected | As expected | Pass |
| Validation (unit) | Required fields, email format, length limits, allowed services and timelines, whitespace | As expected | As expected | Pass |
| Delivery (unit) | No env vars → `not_configured`, no network call | As expected | As expected | Pass |
| Delivery (unit) | Configured → POST to Resend with auth header, `reply_to` = visitor, correct subject and body | As expected | As expected | Pass |
| Delivery (unit) | Provider error (500) or network failure → `failed` | As expected | As expected | Pass |
| Security (unit) | Line breaks in the name can't add email headers | Stripped from subject | As expected | Pass |
| Responsive | No horizontal scroll on 4 pages × 9 widths (320, 360, 390, 430, 768, 1024, 1280, 1440, 1920 px) | 0 px overflow | 0 px | Pass |
| Accessibility | axe-core WCAG 2.0/2.1 A + AA on all 4 pages, desktop and mobile | 0 violations | 0 violations | Pass |
| Accessibility | axe on the contact form in its error state | 0 violations | 0 violations | Pass |
| Motion | `prefers-reduced-motion: reduce` stops animations and the hero pipeline | As expected | As expected | Pass |
| Motion | Hero pipeline advances when motion is allowed | As expected | As expected | Pass |
| Fonts | Self-hosted Plus Jakarta Sans loads | Loaded | Loaded | Pass |
| SEO | Each page: meta description, canonical URL, `og:title`, `og:image`, favicon | Present | Present | Pass |
| SEO | `/sitemap.xml` lists all pages; `/robots.txt`, `/opengraph-image` (PNG), `/apple-icon`, `/icon.svg` return 200 | As expected | As expected | Pass |

## Issues found and fixed during testing

| Issue | Fix |
| --- | --- |
| Coral text failed WCAG AA contrast in five places (e.g. 3.85:1 on lilac, 4.39:1 on coral tint) | `--coral-ink` darkened from `#C23E2B` to `#B03626` (4.55:1 or better everywhere); new `--coral-light` for small coral text on plum; success green darkened |
| Logo link's spoken name ("PS IT Solutions home") didn't match its visible text (WCAG 2.5.3) | Removed the override; the link is now named by its visible text |
| Inner pages had no `og:image`, because a page-level `openGraph` replaces the layout's | Added `lib/metadata.ts` so every page gets the same complete Open Graph and Twitter data |
| `@axe-core/playwright` pulled in a second, newer `playwright-core`, breaking types | Pinned `playwright-core` with an npm `overrides` entry |
| On narrow phones the hero caption ran under the release toast | Caption hidden below 560 px; the "Sample data" label still marks the illustration |

## Remaining limitations

- **Email delivery hasn't been tested against the real Resend API**, because no account or key was
  available. The request format is covered by unit tests with a stubbed provider. Send one live test
  inquiry after setting the environment variables.
- **Only Chromium was tested.** Safari (WebKit) and Firefox weren't run. Add them in
  `playwright.config.ts` (`devices["Desktop Safari"]`, `devices["Desktop Firefox"]`) and run
  `npx playwright install` to include them.
- Scroll-reveal effects use CSS scroll-driven animations. Browsers without support (currently
  Firefox and older Safari) show the content without that effect, by design.
- No rate limiting or CAPTCHA on the contact form yet; only a honeypot. See README → Contact form.
- Automated accessibility checks catch roughly a third to a half of real-world issues. A manual
  screen-reader pass (VoiceOver, NVDA) is recommended before launch.
- Content placeholders (contact details, proof points, team, case studies, privacy policy) must be
  replaced before launch. See README → Before launch.
