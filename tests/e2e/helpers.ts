import type { Page } from "@playwright/test";

export const ROUTES = [
  { path: "/", title: /PS IT Solutions \| Custom Software & IT Solutions/, h1: /software your business can/i },
  { path: "/about", title: /About Us \| PS IT Solutions/, h1: /Engineers and designers/i },
  { path: "/services", title: /Services \| PS IT Solutions/, h1: /Software services built around/i },
  { path: "/contact", title: /Contact Us \| PS IT Solutions/, h1: /Tell us what you/i },
] as const;

/** Collects console errors and uncaught exceptions for the lifetime of the page. */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  return errors;
}

/** Returns true when the app has hydrated (client components are interactive). */
export async function waitForHydration(page: Page) {
  await page.waitForLoadState("networkidle");
}
