import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers";

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile only");

  test("menu opens, closes with Escape and returns focus", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
    const button = page.getByRole("button", { name: "Open menu" });
    await button.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav.getByRole("link", { name: /About/ })).toBeVisible();
    await expect(page.locator("html")).toHaveClass(/lock/);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    await expect(page.locator("html")).not.toHaveClass(/lock/);
  });

  test("menu link routes and closes the menu", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: /Services/ }).click();
    await expect(page).toHaveURL("/services");
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("html")).not.toHaveClass(/lock/);
    await expect(page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: /About/ })).toBeHidden();
  });

  test("closed menu links are not focusable", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await expect(page.locator("#mobile-nav")).toHaveAttribute("inert", "");
  });
});
