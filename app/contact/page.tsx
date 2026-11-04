import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/Icon";
import { Accent, Breadcrumbs, Ph } from "@/components/ui";
import { serviceOptions } from "@/lib/inquiry";
import { site } from "@/lib/site";

const description = "Tell PS IT Solutions about your software project. Share a few details and the right person will follow up.";

export const metadata: Metadata = pageMetadata({ title: "Contact Us", description, path: "/contact" });

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const requested = typeof params.service === "string" ? params.service : "";
  // Only accept known services so the query string cannot inject arbitrary values.
  const defaultService = serviceOptions.some((o) => o.value === requested) ? requested : "";

  return (
    <>
      <section className="phero" style={{ paddingBottom: "clamp(32px, 3vw, 48px)" }} aria-labelledby="contact-title">
        <div className="wrap">
          <Breadcrumbs current="Contact" />
          <h1 className="ld" id="contact-title" style={{ ...delay(80), maxWidth: "16ch" }}>
            Tell us what you&apos;re <Accent>building.</Accent>
          </h1>
          <p className="lede ld" style={delay(160)}>
            Share a few details and the right person from our team will follow up. No obligation and no sales script.
          </p>
        </div>
      </section>

      <section className="section flush-top" aria-label="Contact form and details">
        <div className="wrap contact-grid">
          <div className="ld" style={delay(220)}>
            <ContactForm defaultService={defaultService} />
          </div>

          <aside className="aside" aria-label="Contact details">
            <div className="abox ld" style={delay(280)}>
              <h2>What happens next</h2>
              <ol className="next">
                <li>
                  <span>
                    <b>We review your request</b>A member of our team reads every inquiry.
                  </span>
                </li>
                <li>
                  <span>
                    <b>A short discovery call</b>We talk through goals, constraints and timing.
                  </span>
                </li>
                <li>
                  <span>
                    <b>A clear proposal</b>Scope, approach and estimate, in plain language.
                  </span>
                </li>
              </ol>
            </div>
            <div className="abox ld" style={delay(340)}>
              <h2>Contact details</h2>
              <ul className="cinfo">
                <li>
                  <span className="ci">
                    <Icon name="mail" />
                  </span>
                  <span>
                    <small>Email</small>
                    <Ph item={site.contact.email} />
                  </span>
                </li>
                <li>
                  <span className="ci">
                    <Icon name="phone" />
                  </span>
                  <span>
                    <small>Phone</small>
                    <Ph item={site.contact.phone} />
                  </span>
                </li>
                <li>
                  <span className="ci">
                    <Icon name="clock" />
                  </span>
                  <span>
                    <small>Hours</small>
                    <Ph item={site.contact.hours} />
                  </span>
                </li>
              </ul>
            </div>
            <figure className="mapph ld" style={delay(400)}>
              <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="400" height="300" fill="#F4ECF1" />
                <path d="M0 210 C 80 190, 120 240, 200 220 S 330 170, 400 190 L400 300 L0 300Z" fill="#E8D9E3" />
                <g stroke="#FFFFFF" strokeWidth="10" fill="none" strokeLinecap="round">
                  <path d="M-10 90 L420 130" />
                  <path d="M150 -10 L190 310" />
                  <path d="M290 -10 L250 310" />
                </g>
                <g stroke="#D8C7D2" strokeWidth="2" fill="none">
                  <path d="M-10 40 L420 70" />
                  <path d="M60 -10 L80 310" />
                  <path d="M-10 170 L420 160" />
                  <path d="M350 -10 L330 310" />
                </g>
                <rect x="200" y="30" width="60" height="44" rx="6" fill="#E8D9E3" />
                <rect x="40" y="110" width="80" height="40" rx="6" fill="#E8D9E3" />
                <rect x="300" y="200" width="70" height="40" rx="6" fill="#FFFFFF" opacity=".6" />
              </svg>
              <span className="pin" aria-hidden="true">
                <i />
              </span>
              <figcaption>
                <b>Office location</b>
                <Ph item={site.contact.address} />
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>
    </>
  );
}
