import { expect, test } from "@playwright/test";
import { formatInquiry } from "../../lib/deliver-inquiry";
import { LIMITS, emptyValues, isPersonalEmail, validateField, validateInquiry } from "../../lib/inquiry";
import type { InquiryValues } from "../../lib/inquiry";

const valid: InquiryValues = {
  name: "Jordan Avery",
  email: "jordan@acme.co",
  company: "Acme",
  service: "cloud-solutions",
  timeline: "1-3-months",
  message: "We need a customer portal for 200 wholesale accounts with order tracking.",
};

test.describe("validateInquiry", () => {
  test("accepts a complete, valid inquiry", () => {
    expect(validateInquiry(valid)).toEqual({});
  });

  test("flags every required field when empty", () => {
    const errors = validateInquiry(emptyValues);
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "service"]);
  });

  test("company and timeline are optional", () => {
    expect(validateInquiry({ ...valid, company: "", timeline: "" })).toEqual({});
  });

  test("rejects malformed email addresses", () => {
    for (const email of ["jordan", "jordan@", "@acme.co", "jordan@acme", "jo rdan@acme.co"]) {
      expect(validateField("email", email), email).toMatch(/valid email/);
    }
  });

  test("rejects services and timelines not in the list", () => {
    expect(validateField("service", "hacking")).toBeDefined();
    expect(validateField("timeline", "yesterday")).toBeDefined();
    expect(validateField("service", "not-sure")).toBeUndefined();
  });

  test("enforces message length limits", () => {
    expect(validateField("message", "x".repeat(LIMITS.messageMin - 1))).toMatch(/more detail/);
    expect(validateField("message", "x".repeat(LIMITS.messageMin))).toBeUndefined();
    expect(validateField("message", "x".repeat(LIMITS.messageMax + 1))).toMatch(/under/);
  });

  test("ignores surrounding whitespace", () => {
    expect(validateField("name", "   ")).toMatch(/Enter your full name/);
    expect(validateField("name", "  Al  ")).toBeUndefined();
  });

  test("enforces name and company maximums", () => {
    expect(validateField("name", "x".repeat(LIMITS.nameMax + 1))).toBeDefined();
    expect(validateField("company", "x".repeat(LIMITS.companyMax + 1))).toBeDefined();
  });
});

test("isPersonalEmail recognises common free providers", () => {
  expect(isPersonalEmail("a@gmail.com")).toBe(true);
  expect(isPersonalEmail("a@GMAIL.com")).toBe(true);
  expect(isPersonalEmail("a@acme.co")).toBe(false);
});

test("formatInquiry keeps user input out of the subject's line breaks", () => {
  const { subject, text } = formatInquiry({ ...valid, name: "Eve\r\nBcc: victim@example.com" });
  expect(subject).not.toMatch(/[\r\n]/);
  expect(text).toContain("Cloud Solutions");
  expect(text).toContain(valid.message);
});
