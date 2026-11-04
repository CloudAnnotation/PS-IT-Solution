import { services } from "@/lib/services";

/**
 * Contact-form rules shared by the browser (instant feedback) and the
 * Server Action (the authoritative check). Keep all validation here.
 */

export const NOT_SURE = "not-sure";

export const serviceOptions: ReadonlyArray<{ value: string; label: string }> = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: NOT_SURE, label: "Not sure yet, need advice" },
];

export const timelineOptions: ReadonlyArray<{ value: string; label: string }> = [
  { value: "", label: "Not sure yet" },
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

export const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  companyMax: 120,
  messageMin: 30,
  messageMax: 5000,
} as const;

export type InquiryField = "name" | "email" | "company" | "service" | "timeline" | "message";
export type RequiredField = "name" | "email" | "service" | "message";

export type InquiryValues = Record<InquiryField, string>;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const REQUIRED_FIELDS: readonly RequiredField[] = ["name", "email", "service", "message"];

export const FIELD_LABELS: Record<InquiryField, string> = {
  name: "Full name",
  email: "Business email",
  company: "Company",
  service: "Service required",
  timeline: "Ideal timeline",
  message: "Project description",
};

export const emptyValues: InquiryValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  timeline: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "live.com",
  "msn.com",
  "proton.me",
  "protonmail.com",
]);

/** Trim and collapse a raw form value. Never trust raw input length or type. */
export function normalize(raw: unknown): string {
  return typeof raw === "string" ? raw.trim() : "";
}

export function readValues(formData: FormData): InquiryValues {
  return {
    name: normalize(formData.get("name")),
    email: normalize(formData.get("email")),
    company: normalize(formData.get("company")),
    service: normalize(formData.get("service")),
    timeline: normalize(formData.get("timeline")),
    message: normalize(formData.get("message")),
  };
}

export function validateField(field: InquiryField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "Enter your full name.";
      if (value.length < LIMITS.nameMin) return `Name must be at least ${LIMITS.nameMin} characters.`;
      if (value.length > LIMITS.nameMax) return `Name must be ${LIMITS.nameMax} characters or fewer.`;
      return undefined;
    case "email":
      if (!value) return "Enter your business email.";
      if (value.length > LIMITS.emailMax || !EMAIL_PATTERN.test(value)) {
        return "Enter a valid email address, like name@company.com.";
      }
      return undefined;
    case "company":
      if (value.length > LIMITS.companyMax) return `Company must be ${LIMITS.companyMax} characters or fewer.`;
      return undefined;
    case "service":
      if (!value) return "Choose the service closest to your project.";
      if (!serviceOptions.some((o) => o.value === value)) return "Choose a service from the list.";
      return undefined;
    case "timeline":
      if (!timelineOptions.some((o) => o.value === value)) return "Choose a timeline from the list.";
      return undefined;
    case "message":
      if (!value) return "Describe your project in a few sentences.";
      if (value.length < LIMITS.messageMin) {
        return `Add a little more detail (at least ${LIMITS.messageMin} characters).`;
      }
      if (value.length > LIMITS.messageMax) {
        return `Keep the description under ${LIMITS.messageMax} characters.`;
      }
      return undefined;
  }
}

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  (Object.keys(values) as InquiryField[]).forEach((field) => {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  });
  return errors;
}

export function isPersonalEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  return Boolean(domain && PERSONAL_EMAIL_DOMAINS.has(domain));
}

export function labelFor(options: ReadonlyArray<{ value: string; label: string }>, value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}
