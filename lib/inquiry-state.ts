import type { InquiryErrors, InquiryValues } from "@/lib/inquiry";
import { emptyValues } from "@/lib/inquiry";

/**
 * - `idle`: nothing submitted yet
 * - `invalid`: the server rejected the input (errors per field)
 * - `sent`: the inquiry was delivered
 * - `not_configured`: input was valid but no email provider is set up, so nothing was sent
 * - `failed`: the provider returned an error
 */
export type InquiryStatus = "idle" | "invalid" | "sent" | "not_configured" | "failed";

export type InquiryState = {
  status: InquiryStatus;
  values: InquiryValues;
  errors: InquiryErrors;
  /** Increments on every server response so the client can react to repeat results. */
  submissionId: number;
};

export const initialInquiryState: InquiryState = {
  status: "idle",
  values: emptyValues,
  errors: {},
  submissionId: 0,
};
