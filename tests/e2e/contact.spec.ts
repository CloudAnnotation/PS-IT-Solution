import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { trackErrors, waitForHydration } from "./helpers";

const VALID_MESSAGE = "We need a customer portal for 200 wholesale accounts with order tracking.";

async function fillValid(page: Page) {
  await page.getByLabel("Full name").fill("Jordan Avery");
  await page.getByLabel("Business email").fill("jordan@acme.co");
  await page.getByLabel(/Company/).fill("Acme Wholesale");
  await page.getByLabel("Service required").selectOption("cloud-solutions");
  await page.getByLabel(/Ideal timeline/).selectOption("1-3-months");
  await page.getByLabel("Project description").fill(VALID_MESSAGE);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/contact");
  await waitForHydration(page);
});

test("empty submit shows every required error and focuses the summary", async ({ page }) => {
  await page.getByRole("button", { name: /Submit inquiry/ }).click();
  const summary = page.locator(".summary");
  await expect(summary).toHaveAttribute("role", "alert");
  await expect(summary).toBeFocused();
  await expect(summary).toContainText("Please fix 4 fields");
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4);
  await summary.getByRole("link", { name: /Business email/ }).click();
  await expect(page.getByLabel("Business email")).toBeFocused();
});

test("field errors appear on blur and clear as the user fixes them", async ({ page }) => {
  const email = page.getByLabel("Business email");
  await email.fill("not-an-email");
  await email.blur();
  await expect(page.locator("#f-email-err")).toContainText("valid email address");
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await email.fill("jordan@acme.co");
  await expect(page.locator("#f-email-err")).toHaveCount(0);
  await expect(email).not.toHaveAttribute("aria-invalid", "true");
});

test("personal email shows a non-blocking hint", async ({ page }) => {
  await page.getByLabel("Business email").fill("jordan@gmail.com");
  await expect(page.locator("#f-email-hint")).toBeVisible();
  await expect(page.locator("#f-email-err")).toHaveCount(0);
});

test("short description blocks submission and the counter updates", async ({ page }) => {
  await fillValid(page);
  await page.getByLabel("Project description").fill("Too short");
  await expect(page.locator("#f-message-count")).toHaveText("9 / 30 characters minimum");
  await page.getByRole("button", { name: /Submit inquiry/ }).click();
  await expect(page.locator("#f-message-err")).toBeVisible();
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("valid inquiry without email delivery configured says plainly it was not sent", async ({ page }) => {
  const errors = trackErrors(page);
  await fillValid(page);
  await page.getByLabel("Project description").fill(`<b>${VALID_MESSAGE}</b>`);
  await page.getByRole("button", { name: /Submit inquiry/ }).click();
  const result = page.getByRole("status");
  await expect(result).toContainText("Your inquiry has not been sent.");
  await expect(result).not.toContainText("on its way");
  await expect(result).toContainText("Cloud Solutions");
  await expect(result).toContainText("Within 1–3 months");
  // User input is rendered as text, never as HTML.
  await expect(result.locator("dd b")).toHaveCount(0);
  await expect(result).toContainText("<b>");

  await page.getByRole("button", { name: "Back to the form" }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("Jordan Avery");
  await expect(page.getByLabel("Service required")).toHaveValue("cloud-solutions");

  await page.getByRole("button", { name: /Submit inquiry/ }).click();
  await page.getByRole("button", { name: "Start a new inquiry" }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("");
  expect(errors).toEqual([]);
});

test("unknown ?service values are ignored", async ({ page }) => {
  await page.goto("/contact?service=<script>");
  await expect(page.getByLabel("Service required")).toHaveValue("");
});

test.describe("without JavaScript (server-side validation only)", () => {
  // Reduced motion turns off smooth scrolling, which otherwise trips Playwright's stability check.
  test.use({ javaScriptEnabled: false, contextOptions: { reducedMotion: "reduce" } });

  test("the form still submits and the server validates", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Submit inquiry/ }).click();
    await expect(page.locator(".summary")).toContainText("Please fix 4 fields");
    await fillValid(page);
    await page.getByRole("button", { name: /Submit inquiry/ }).click();
    await expect(page.getByRole("status")).toContainText("Your inquiry has not been sent.");
  });
});
