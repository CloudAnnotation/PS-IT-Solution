import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import type { CSSProperties } from "react";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HeroVisual } from "@/components/home/HeroVisual";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ServicesBento } from "@/components/home/ServicesBento";
import { ValueProps } from "@/components/home/ValueProps";
import { WhyUs } from "@/components/home/WhyUs";
import { Icon } from "@/components/Icon";
import { Accent, ButtonLink, CtaPanel, Ph } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ path: "/" });

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="pill ld" style={delay(0)}>
              <i />
              Software development &amp; IT solutions
            </span>
            <h1 className="display ld" id="home-title" style={delay(80)}>
              We design and build software your business can <Accent>run on.</Accent>
            </h1>
            <p className="lede ld" style={delay(180)}>
              {site.name} plans, designs, builds and supports custom software, web and mobile applications, and cloud
              systems for growing US businesses. One accountable team from the first workshop to long-term support.
            </p>
            <div className="btn-row ld" style={delay(260)}>
              <ButtonLink href="/contact" arrow>
                Start a project
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                Explore services
              </ButtonLink>
            </div>
            <ul className="hero-meta ld" style={delay(340)}>
              <li>
                <Icon name="tick" />
                Discovery before estimates
              </li>
              <li>
                <Icon name="tick" />
                You own the code
              </li>
              <li>
                <Icon name="tick" />
                Support after launch
              </li>
            </ul>
          </div>
          <HeroVisual />
        </div>
      </section>

      <ValueProps />
      <ServicesBento />
      <FeaturedWork />
      <WhyUs />
      <ProcessTimeline />

      <CtaPanel
        id="home-cta"
        accent="Have an idea?"
        title="Let's build something extraordinary."
        body={
          <>
            Tell us about your project. We reply within <Ph item={site.contact.responseTime} /> with next steps and the
            questions that will shape a useful first call.
          </>
        }
        actions={
          <>
            <ButtonLink href="/contact" arrow>
              Contact us
            </ButtonLink>
            <ButtonLink href="/about" variant="ghost">
              About us
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
