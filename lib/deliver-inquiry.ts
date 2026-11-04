import { FIELD_LABELS, labelFor, serviceOptions, timelineOptions } from "@/lib/inquiry";
import type { InquiryValues } from "@/lib/inquiry";

export type DeliveryResult = "sent" | "not_configured" | "failed";

type DeliveryConfig = { apiKey: string; from: string; to: string };

function readConfig(): DeliveryConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!apiKey || !from || !to) return null;
  return { apiKey, from, to };
}

/** Strip line breaks so user input can never add email headers. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 200);
}

export function formatInquiry(values: InquiryValues): { subject: string; text: string } {
  const service = labelFor(serviceOptions, values.service);
  const timeline = labelFor(timelineOptions, values.timeline);
  const subject = singleLine(`New project inquiry: ${service} — ${values.name}`);
  const text = [
    `${FIELD_LABELS.name}: ${values.name}`,
    `${FIELD_LABELS.email}: ${values.email}`,
    `${FIELD_LABELS.company}: ${values.company || "—"}`,
    `${FIELD_LABELS.service}: ${service}`,
    `${FIELD_LABELS.timeline}: ${timeline}`,
    "",
    `${FIELD_LABELS.message}:`,
    values.message,
  ].join("\n");
  return { subject, text };
}

/**
 * Sends a validated inquiry by email through Resend's REST API.
 * Returns `not_configured` when the environment variables are missing, so the
 * site never claims a message was sent when it was not.
 */
export async function deliverInquiry(values: InquiryValues): Promise<DeliveryResult> {
  const config = readConfig();
  if (!config) {
    console.warn(
      "[contact] Inquiry not sent: set RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL to enable delivery.",
    );
    return "not_configured";
  }

  const { subject, text } = formatInquiry(values);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: values.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`[contact] Email provider responded with ${response.status}.`);
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error("[contact] Email delivery failed.", error);
    return "failed";
  }
}
