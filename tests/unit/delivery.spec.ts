import { expect, test } from "@playwright/test";
import { deliverInquiry } from "../../lib/deliver-inquiry";
import type { InquiryValues } from "../../lib/inquiry";

const values: InquiryValues = {
  name: "Jordan Avery",
  email: "jordan@acme.co",
  company: "",
  service: "it-support",
  timeline: "",
  message: "We need ongoing support for an internal ordering system.",
};

const ENV_KEYS = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"] as const;
const realFetch = globalThis.fetch;
const realEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));

test.describe.configure({ mode: "serial" });

test.afterEach(() => {
  globalThis.fetch = realFetch;
  for (const k of ENV_KEYS) {
    if (realEnv[k] === undefined) delete process.env[k];
    else process.env[k] = realEnv[k];
  }
});

function configure() {
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_FROM_EMAIL = "Website <web@example.com>";
  process.env.CONTACT_TO_EMAIL = "sales@example.com";
}

test("returns not_configured and makes no request when env vars are missing", async () => {
  for (const k of ENV_KEYS) delete process.env[k];
  let called = false;
  globalThis.fetch = (async () => {
    called = true;
    return new Response(null, { status: 200 });
  }) as typeof fetch;
  expect(await deliverInquiry(values)).toBe("not_configured");
  expect(called).toBe(false);
});

test("sends the inquiry to Resend with reply-to set to the visitor", async () => {
  configure();
  let request: { url: string; init?: RequestInit } | undefined;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    request = { url: String(url), init };
    return new Response(JSON.stringify({ id: "1" }), { status: 200 });
  }) as typeof fetch;
  expect(await deliverInquiry(values)).toBe("sent");
  expect(request?.url).toBe("https://api.resend.com/emails");
  expect((request?.init?.headers as Record<string, string>).Authorization).toBe("Bearer re_test");
  const body = JSON.parse(String(request?.init?.body));
  expect(body).toMatchObject({ from: "Website <web@example.com>", to: ["sales@example.com"], reply_to: "jordan@acme.co" });
  expect(body.subject).toContain("IT Support & Maintenance");
  expect(body.text).toContain(values.message);
});

test("returns failed when the provider responds with an error", async () => {
  configure();
  globalThis.fetch = (async () => new Response("bad", { status: 500 })) as typeof fetch;
  expect(await deliverInquiry(values)).toBe("failed");
});

test("returns failed when the network request throws", async () => {
  configure();
  globalThis.fetch = (async () => {
    throw new Error("network down");
  }) as typeof fetch;
  expect(await deliverInquiry(values)).toBe("failed");
});
