import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

/**
 * Unit tests run without a browser. End-to-end tests run against the
 * production server (`next start`), so run `npm run build` first.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "unit", testDir: "./tests/unit" },
    { name: "chromium", testDir: "./tests/e2e", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", testDir: "./tests/e2e", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npx next start -p ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
