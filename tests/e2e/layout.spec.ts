import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ROUTES, trackErrors, waitForHydration } from "./helpers";

const WIDTHS = [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920];

test.describe("responsive layout", () => {
  test.skip(({ isMobile }) => isMobile, "Widths are set explicitly in the desktop project");

  for (const route of ROUTES) {
    test(`${route.path} has no horizontal overflow at common widths`, async ({ page }) => {
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${route.path} at ${width}px`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test.describe("accessibility (axe, WCAG 2.1 AA)", () => {
  for (const route of ROUTES) {
    test(`${route.path} has no detectable violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route.path);
      await waitForHydration(page);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(summary).toEqual([]);
    });
  }

  test("contact form error state has no violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact");
    await waitForHydration(page);
    await page.getByRole("button", { name: /Submit inquiry/ }).click();
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

test.describe("motion", () => {
  test("reduced motion stops animations and the hero pipeline", async ({ page }) => {
    const errors = trackErrors(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await waitForHydration(page);
    const duration = await page.locator(".hero .ld").first().evaluate((el) => getComputedStyle(el).animationDuration);
    expect(parseFloat(duration)).toBeLessThan(0.01);
    const before = await page.locator(".steps-ui").innerText();
    await page.waitForTimeout(2600);
    expect(await page.locator(".steps-ui").innerText()).toBe(before);
    expect(errors).toEqual([]);
  });

  test("hero pipeline advances when motion is allowed", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await waitForHydration(page);
    const running = page.locator(".steps-ui li.run");
    await expect(running).toHaveText(/Security scan/);
    await expect(running).toHaveText(/Deploy to staging/, { timeout: 5000 });
  });
});

test("fonts are self-hosted and load", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const families = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family));
  expect(families.join(" ")).toMatch(/jakarta/i);
});
