import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { Accent, ArrowLink, SectionHead, Tag } from "@/components/ui";
import { getService } from "@/lib/services";
import type { ServiceSlug } from "@/lib/services";

/* Small illustrations, one per featured service. Purely decorative. */

const WorkflowArt = (
  <div className="t-art" aria-hidden="true">
    <div className="wf">
      <div className="wf-node">
        <small>Step 1</small>
        <b>New order</b>
      </div>
      <span className="wf-link" />
      <div className="wf-node on">
        <small>Step 2</small>
        <b>Auto-approval</b>
      </div>
      <span className="wf-link" />
      <div className="wf-node">
        <small>Step 3</small>
        <b>Invoice sent</b>
      </div>
    </div>
    <div className="wf-meta">
      <span>workflow.automate()</span>
      <b>manual steps removed</b>
    </div>
  </div>
);

const BrowserArt = (
  <div className="t-art" aria-hidden="true">
    <div className="br">
      <div className="br-top">
        <i />
        <i />
        <i />
        <span>app.yourcompany.com</span>
      </div>
      <div className="br-body">
        <div className="br-side">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="br-main">
          <i />
          <i />
          <i style={{ width: "80%" }} />
          <i style={{ width: "65%" }} />
          <span className="cta-dot" />
        </div>
      </div>
    </div>
  </div>
);

const PhoneArt = (
  <div className="t-art phone-art" aria-hidden="true">
    <div className="ph-frame">
      <i className="c" />
      <i />
      <i />
      <i />
    </div>
    <div className="ph-frame b">
      <i />
      <i className="c" />
      <i />
    </div>
  </div>
);

const DesignArt = (
  <div className="t-art" aria-hidden="true">
    <div className="sw">
      <i />
      <i />
      <i />
      <i />
      <span className="type">Aa</span>
    </div>
    <div className="sw-grid">
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  </div>
);

const CloudArt = (
  <div className="t-art" aria-hidden="true">
    <ul className="regions">
      <li>
        <i />
        us-east
        <span className="mini">
          <b style={{ height: "40%" }} />
          <b style={{ height: "70%" }} />
          <b style={{ height: "55%" }} />
          <b style={{ height: "90%" }} />
        </span>
      </li>
      <li>
        <i />
        us-west
        <span className="mini">
          <b style={{ height: "60%" }} />
          <b style={{ height: "45%" }} />
          <b style={{ height: "80%" }} />
          <b style={{ height: "65%" }} />
        </span>
      </li>
      <li>
        <i className="c" />
        backup<span>synced</span>
      </li>
    </ul>
  </div>
);

const tiles: ReadonlyArray<{ slug: ServiceSlug; size: string; feature?: boolean; art: ReactNode; title?: string }> = [
  { slug: "custom-software", size: "c7", feature: true, art: WorkflowArt },
  { slug: "web-applications", size: "c5", art: BrowserArt, title: "Web Applications" },
  { slug: "mobile-apps", size: "c3", art: PhoneArt, title: "Mobile Apps" },
  { slug: "ui-ux-design", size: "c5", art: DesignArt },
  { slug: "cloud-solutions", size: "c4", art: CloudArt },
];

const stripItems: readonly ServiceSlug[] = ["software-consulting", "enterprise-solutions", "it-support"];

export function ServicesBento() {
  return (
    <section className="section" aria-labelledby="home-services">
      <div className="wrap">
        <SectionHead
          id="home-services"
          eyebrow="Services"
          title={
            <>
              From first idea to long-term support, <Accent>under one roof.</Accent>
            </>
          }
          lede="Design, engineering, cloud and support teams working from one plan, so nothing gets lost between vendors."
        />
        <div className="bento">
          {tiles.map((tile) => {
            const service = getService(tile.slug);
            if (!service) return null;
            return (
              <Link
                key={tile.slug}
                href={`/services#${service.slug}`}
                className={`tile ${tile.size}${tile.feature ? " feature" : ""} rv`}
              >
                <span className="t-ico">
                  <Icon name={service.icon} />
                </span>
                <h3>
                  {tile.title ?? service.name}
                  <span className="go">
                    <Icon name="arrow" />
                  </span>
                </h3>
                <p>{service.summary}</p>
                {tile.art}
              </Link>
            );
          })}
          <div className="strip rv">
            {stripItems.map((slug) => {
              const service = getService(slug);
              if (!service) return null;
              return (
                <Link key={slug} href={`/services#${service.slug}`}>
                  <span className="s-ico">
                    <Icon name={service.icon} />
                  </span>
                  <div>
                    <h3>{service.name}</h3>
                    <p>{service.summary}</p>
                  </div>
                  <Icon name="arrow" className="arr" />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="note-row">
          <Tag>Service lineup pending client confirmation</Tag>
          <ArrowLink href="/services">View all services</ArrowLink>
        </div>
      </div>
    </section>
  );
}
