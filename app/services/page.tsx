import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import { Accent, ArrowLink, Breadcrumbs, ButtonLink, CtaPanel, SectionHead, Tag } from "@/components/ui";
import { services } from "@/lib/services";

const description =
  "Custom software, web and mobile applications, UI/UX design, cloud solutions, consulting, enterprise systems and IT support from PS IT Solutions.";

export const metadata: Metadata = pageMetadata({ title: "Services", description, path: "/services" });

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const engagements = [
  {
    kind: "Defined scope",
    title: "Project delivery",
    body: "A fixed scope with clear milestones, ideal for a new product or a well-defined upgrade.",
  },
  {
    kind: "Flexible",
    title: "Dedicated team",
    body: "A cross-functional team that works as an extension of yours, with priorities you set each iteration.",
  },
  {
    kind: "Ongoing",
    title: "Support plan",
    body: "Monitoring, updates and improvements under a service agreement with defined response times.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <section className="phero" aria-labelledby="services-title">
        <div className="wrap">
          <Breadcrumbs current="Services" />
          <div className="phero-grid">
            <div>
              <h1 className="ld" id="services-title" style={delay(80)}>
                Software services built around <Accent>business outcomes.</Accent>
              </h1>
              <p className="lede ld" style={delay(160)}>
                Pick a single service or combine them. Every engagement follows the same disciplined process and is led
                by one accountable team.
              </p>
            </div>
            <div className="phero-note ld" style={delay(220)}>
              <Tag>Service lineup pending client confirmation</Tag>
            </div>
          </div>
          <nav className="svc-index ld" style={delay(280)} aria-label="Jump to a service">
            {services.map((s) => (
              <Link key={s.slug} href={`#${s.slug}`}>
                <Icon name={s.icon} />
                {s.shortName}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="section flush-top" aria-label="Service details">
        <div className="wrap">
          {services.map((s) => (
            <article key={s.slug} className="svc" id={s.slug} aria-labelledby={`${s.slug}-title`}>
              <div className="svc-l rv">
                <div className="svc-badge">
                  <span className="bi">
                    <Icon name={s.icon} />
                  </span>
                  <small>Service</small>
                </div>
                <h2 id={`${s.slug}-title`}>{s.name}</h2>
                <p>{s.description}</p>
                <ArrowLink href={`/contact?service=${s.slug}`}>{s.cta}</ArrowLink>
              </div>
              <div className="svc-r rv">
                <div className="svc-box">
                  <h3>Key capabilities</h3>
                  <ul>
                    {s.capabilities.map((c) => (
                      <li key={c}>
                        <Icon name="check" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="svc-box alt">
                  <h3>Business benefits</h3>
                  <ul>
                    {s.benefits.map((b) => (
                      <li key={b}>
                        <Icon name="arrow" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section band-plum" aria-labelledby="engage-title">
        <div className="wrap">
          <SectionHead
            id="engage-title"
            eyebrow="Ways to work together"
            title={
              <>
                Engagements that match <Accent>how you buy.</Accent>
              </>
            }
            lede="Proposed models. Final terms, pricing and contract structure to be confirmed by PS IT Solutions."
          />
          <div className="engage rv-s">
            {engagements.map((e, i) => (
              <article key={e.title} className="eng" style={{ "--i": i } as CSSProperties}>
                <span className="k">{e.kind}</span>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        id="svc-cta"
        spacedTop
        accent="Not sure where to start?"
        title="We'll help you scope it."
        body="Describe the problem you're trying to solve. We'll recommend the right mix of services."
        actions={
          <ButtonLink href="/contact" arrow>
            Talk to our team
          </ButtonLink>
        }
      />
    </>
  );
}
