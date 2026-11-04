"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import { submitInquiry } from "@/app/contact/actions";
import { Icon } from "@/components/Icon";
import { Ph } from "@/components/ui";
import {
  FIELD_LABELS,
  LIMITS,
  REQUIRED_FIELDS,
  emptyValues,
  isPersonalEmail,
  labelFor,
  serviceOptions,
  timelineOptions,
  validateInquiry,
} from "@/lib/inquiry";
import type { InquiryField, InquiryValues } from "@/lib/inquiry";
import { initialInquiryState } from "@/lib/inquiry-state";
import { site } from "@/lib/site";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span className="err" id={id}>
      <Icon name="alert" />
      <span>{message}</span>
    </span>
  );
}

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [state, formAction, isPending] = useActionState(submitInquiry, {
    ...initialInquiryState,
    values: { ...emptyValues, service: defaultService },
  });

  const [values, setValues] = useState<InquiryValues>(state.values);
  const [touched, setTouched] = useState<Partial<Record<InquiryField, boolean>>>({});
  const [attempted, setAttempted] = useState(state.status === "invalid");
  const [dismissedId, setDismissedId] = useState<number | null>(null);

  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Errors are derived from the current values with the same rules the server uses.
  const allErrors = validateInquiry(values);
  const showAll = attempted || state.status === "invalid";
  const errors: Partial<Record<InquiryField, string>> = {};
  (Object.keys(allErrors) as InquiryField[]).forEach((field) => {
    if (showAll || touched[field]) errors[field] = allErrors[field];
  });
  const summaryErrors = REQUIRED_FIELDS.filter((f) => allErrors[f]);
  const showSummary = showAll && summaryErrors.length > 0;

  const resultStatus = state.status === "sent" || state.status === "not_configured" || state.status === "failed";
  const showResult = resultStatus && dismissedId !== state.submissionId;

  // Move focus when a new server response arrives (each response is a new state object).
  useEffect(() => {
    if (state.submissionId === 0) return;
    if (state.status === "invalid") {
      summaryRef.current?.focus();
    } else if (state.status !== "idle") {
      resultRef.current?.focus({ preventScroll: true });
      cardRef.current?.scrollIntoView({ block: "start" });
    }
  }, [state]);

  const update =
    (field: InquiryField) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = event.target.value;
      setValues((v) => ({ ...v, [field]: next }));
      if (field === "service" || field === "timeline") setTouched((t) => ({ ...t, [field]: true }));
    };
  const blur = (field: InquiryField) => () => setTouched((t) => ({ ...t, [field]: true }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    setAttempted(true);
    if (Object.keys(validateInquiry(values)).length > 0) {
      event.preventDefault();
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  };

  const focusField = (field: InquiryField) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const el = document.getElementById(`f-${field}`);
    el?.focus();
    el?.scrollIntoView({ block: "center" });
  };

  const backToForm = () => setDismissedId(state.submissionId);
  const startOver = () => {
    setValues({ ...emptyValues });
    setTouched({});
    setAttempted(false);
    setDismissedId(state.submissionId);
  };

  const describedBy = (field: InquiryField, ...extra: string[]) =>
    [errors[field] ? `f-${field}-err` : "", ...extra].filter(Boolean).join(" ") || undefined;

  const messageLength = values.message.trim().length;
  const emailHint = !allErrors.email && isPersonalEmail(values.email);

  if (showResult) {
    const v = state.values;
    const rows: Array<[string, string]> = [
      [FIELD_LABELS.name, v.name],
      [FIELD_LABELS.email, v.email],
      [FIELD_LABELS.company, v.company || "—"],
      [FIELD_LABELS.service, labelFor(serviceOptions, v.service)],
      [FIELD_LABELS.timeline, labelFor(timelineOptions, v.timeline)],
      [FIELD_LABELS.message, v.message],
    ];
    return (
      <div className="formcard" ref={cardRef} id="inquiry">
        <div className="result" ref={resultRef} tabIndex={-1} role="status" aria-live="polite">
          {state.status === "sent" ? (
            <div className="result-head">
              <span className="ri ok">
                <Icon name="tick" />
              </span>
              <div>
                <h2>Thanks, your inquiry is on its way.</h2>
                <p>
                  We reply within <Ph item={site.contact.responseTime} />. Here is a copy of what you sent.
                </p>
              </div>
            </div>
          ) : state.status === "not_configured" ? (
            <div className="result-head">
              <span className="ri">
                <Icon name="info" />
              </span>
              <div>
                <h2>Your inquiry has not been sent.</h2>
                <p>
                  Online inquiries aren&apos;t connected yet, so nothing left this page. Please email the details below
                  to <Ph item={site.contact.email} /> and we&apos;ll take it from there.
                </p>
              </div>
            </div>
          ) : (
            <div className="result-head">
              <span className="ri">
                <Icon name="alert" />
              </span>
              <div>
                <h2>We couldn&apos;t send your inquiry.</h2>
                <p>
                  Something went wrong on our side. Your details are kept below: try again in a moment, or email{" "}
                  <Ph item={site.contact.email} />.
                </p>
              </div>
            </div>
          )}
          <dl>
            {rows.map(([label, value]) => (
              <div key={label} style={{ display: "contents" }}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="btn-row">
            {state.status === "sent" ? (
              <button className="btn btn-sm" type="button" onClick={startOver}>
                Send another inquiry
              </button>
            ) : (
              <>
                <button className="btn btn-sm" type="button" onClick={backToForm}>
                  {state.status === "failed" ? "Try again" : "Back to the form"}
                </button>
                <button className="btn btn-ghost btn-sm" type="button" onClick={startOver}>
                  Start a new inquiry
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="formcard" ref={cardRef} id="inquiry">
      <h2>Project inquiry</h2>
      <p className="sub">Fields marked optional can be left blank. Everything else helps us prepare.</p>
      <form className="form" action={formAction} onSubmit={onSubmit} noValidate>
        {showSummary ? (
          <div className="summary" ref={summaryRef} tabIndex={-1} role="alert">
            <h3>
              Please fix {summaryErrors.length === 1 ? "1 field" : `${summaryErrors.length} fields`} before submitting:
            </h3>
            <ul>
              {summaryErrors.map((field) => (
                <li key={field}>
                  <a href={`#f-${field}`} onClick={focusField(field)}>
                    {FIELD_LABELS[field]}: {allErrors[field]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="frow">
          <div className="field">
            <label htmlFor="f-name">{FIELD_LABELS.name}</label>
            <input
              id="f-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jordan Avery"
              required
              maxLength={LIMITS.nameMax}
              value={values.name}
              onChange={update("name")}
              onBlur={blur("name")}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
            />
            <FieldError id="f-name-err" message={errors.name} />
          </div>
          <div className="field">
            <label htmlFor="f-email">{FIELD_LABELS.email}</label>
            <input
              id="f-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="jordan@company.com"
              required
              maxLength={LIMITS.emailMax}
              value={values.email}
              onChange={update("email")}
              onBlur={blur("email")}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email", emailHint ? "f-email-hint" : "")}
            />
            <FieldError id="f-email-err" message={errors.email} />
            {emailHint ? (
              <span className="hint" id="f-email-hint">
                This looks like a personal address. A company email helps us route your inquiry.
              </span>
            ) : null}
          </div>
        </div>

        <div className="frow">
          <div className="field">
            <label htmlFor="f-company">
              {FIELD_LABELS.company} <span className="opt">Optional</span>
            </label>
            <input
              id="f-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Company name"
              maxLength={LIMITS.companyMax}
              value={values.company}
              onChange={update("company")}
              onBlur={blur("company")}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={describedBy("company")}
            />
            <FieldError id="f-company-err" message={errors.company} />
          </div>
          <div className="field">
            <label htmlFor="f-service">{FIELD_LABELS.service}</label>
            <select
              id="f-service"
              name="service"
              required
              value={values.service}
              onChange={update("service")}
              onBlur={blur("service")}
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy("service")}
            >
              <option value="">Select a service</option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <FieldError id="f-service-err" message={errors.service} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="f-timeline">
            {FIELD_LABELS.timeline} <span className="opt">Optional</span>
          </label>
          <select id="f-timeline" name="timeline" value={values.timeline} onChange={update("timeline")}>
            {timelineOptions.map((o) => (
              <option key={o.value || "none"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="f-message">{FIELD_LABELS.message}</label>
          <textarea
            id="f-message"
            name="message"
            placeholder="What are you building, who is it for, and what problem should it solve?"
            required
            maxLength={LIMITS.messageMax}
            value={values.message}
            onChange={update("message")}
            onBlur={blur("message")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", "f-message-count")}
          />
          <FieldError id="f-message-err" message={errors.message} />
          <span className="count" id="f-message-count">
            {messageLength >= LIMITS.messageMin
              ? `${messageLength} characters`
              : `${messageLength} / ${LIMITS.messageMin} characters minimum`}
          </span>
        </div>

        {/* Honeypot for bots: hidden from people and assistive technology. */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <div className="form-foot">
          <p>
            By submitting, you agree to be contacted about your inquiry.{" "}
            {site.privacyPolicyHref ? (
              <a href={site.privacyPolicyHref}>Privacy policy</a>
            ) : (
              <span className="ph">[Link to privacy policy]</span>
            )}
          </p>
          <button className="btn" type="submit" disabled={isPending} aria-disabled={isPending}>
            {isPending ? "Sending…" : "Submit inquiry"} <Icon name="arrow" />
          </button>
        </div>
      </form>
    </div>
  );
}
