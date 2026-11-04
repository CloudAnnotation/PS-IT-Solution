"use server";

import { deliverInquiry } from "@/lib/deliver-inquiry";
import { readValues, validateInquiry } from "@/lib/inquiry";
import type { InquiryState } from "@/lib/inquiry-state";

/**
 * Server Action behind the contact form. Re-validates everything the browser
 * checked, drops obvious bots via a honeypot field, then hands off delivery.
 */
export async function submitInquiry(previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const submissionId = previous.submissionId + 1;
  const values = readValues(formData);

  // Honeypot: real visitors never see or fill this field.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "sent", values, errors: {}, submissionId };
  }

  const errors = validateInquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", values, errors, submissionId };
  }

  const result = await deliverInquiry(values);
  return { status: result, values, errors: {}, submissionId };
}
