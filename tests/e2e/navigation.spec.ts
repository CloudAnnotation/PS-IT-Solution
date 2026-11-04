import { expect, test } from "@playwright/test";
import { ROUTES, trackErrors, waitForHydration } from "./helpers";

test.describe("pages", () => {
  for (const route of ROUTES) {
    test(`${route.path} renders with correct title, one h1 and no errors`, async ({ page }) => {
      const errors = trackErrors(page);
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await waitForHydration(page);
      await expect(page).toHaveTitle(route.title);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(route.h1);
      expect(errors).toEqual([]);
    });
  }

  test("unknown URL returns the 404 page", async ({ page }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn't");
    await page.getByRole("link", { name: "Go to the home page" }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("primary navigation (desktop)", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop navigation only");

  test("each nav link routes and marks the current page", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const { label, path } of [
      { label: "About", path: "/about" },
      { label: "Services", path: "/services" },
      { label: "Contact", path: "/contact" },
      { label: "Home", path: "/" },
    ]) {
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(path);
      await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    }
  });

  test("header CTA opens the contact page", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("banner").getByRole("link", { name: /Let's talk/ }).click();
    await expect(page).toHaveURL("/contact");
  });

  test("logo returns home", async ({ page }) => {
    await page.goto("/services");
    await page.getByRole("banner").getByRole("link", { name: /^PS IT Solutions/ }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("in-page and cross-page links", () => {
  test("home service tile jumps to that service on the services page", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.locator('a.tile[href="/services#cloud-solutions"]').click();
    await expect(page).toHaveURL("/services#cloud-solutions");
    await expect(page.locator("#cloud-solutions")).toBeInViewport();
  });

  test("services index jumps to a section", async ({ page }) => {
    await page.goto("/services");
    await waitForHydration(page);
    await page.getByRole("navigation", { name: "Jump to a service" }).getByRole("link", { name: "IT support & maintenance" }).click();
    await expect(page.locator("#it-support")).toBeInViewport();
  });

  test("'See how we work' scrolls to the process section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "See how we work" }).click();
    await expect(page.locator("#process")).toBeInViewport();
  });

  test("footer service link opens the matching service", async ({ page }) => {
    await page.goto("/about");
    await waitForHydration(page);
    await page.getByRole("contentinfo").getByRole("link", { name: "UI/UX design" }).click();
    await expect(page).toHaveURL("/services#ui-ux-design");
    await expect(page.locator("#ui-ux-design")).toBeInViewport();
  });

  test("service CTA preselects the service on the contact form", async ({ page }) => {
    await page.goto("/services");
    await page.locator("#mobile-apps").getByRole("link", { name: "Discuss a mobile app" }).click();
    await expect(page).toHaveURL("/contact?service=mobile-apps");
    await expect(page.getByLabel("Service required")).toHaveValue("mobile-apps");
  });

  test("skip link moves focus to the main content", async ({ page, isMobile }) => {
    test.skip(isMobile, "Keyboard test on desktop");
    await page.goto("/");
    await waitForHydration(page);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });
});

test("every internal link resolves and every #anchor exists", async ({ page, request }) => {
  const checked = new Set<string>();
  for (const route of ROUTES) {
    await page.goto(route.path);
    const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((a) => a.getAttribute("href") ?? ""));
    expect(hrefs.filter((h) => h === "" || h === "#")).toEqual([]);
    for (const href of hrefs) {
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const url = new URL(href, `http://x${route.path}`);
      const key = url.pathname + url.search;
      if (!checked.has(key)) {
        checked.add(key);
        const res = await request.get(key);
        expect(res.status(), `${href} on ${route.path}`).toBe(200);
      }
      if (url.hash) {
        const target = url.pathname === route.path ? page : await page.context().newPage();
        if (target !== page) await target.goto(url.pathname);
        await expect(target.locator(url.hash), `${href} anchor on ${route.path}`).toHaveCount(1);
        if (target !== page) await target.close();
      }
    }
  }
});

test("SEO metadata, sitemap and robots", async ({ page, request }) => {
  for (const route of ROUTES) {
    await page.goto(route.path);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{60,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${route.path === "/" ? "/?$" : `${route.path}$`}`));
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /PS IT Solutions/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
    await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", /icon/);
  }
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const route of ["/about", "/services", "/contact"]) expect(xml).toContain(route);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
  expect((await request.get("/apple-icon")).status()).toBe(200);
  expect((await request.get("/icon.svg")).status()).toBe(200);
});
