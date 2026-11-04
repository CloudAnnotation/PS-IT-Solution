import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { Accent, ButtonLink } from "@/components/ui";

const reasons: ReadonlyArray<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "target",
    title: "Business outcomes come first",
    body: "We start with the result you need, such as faster fulfillment or fewer support calls, and choose technology to serve it.",
  },
  {
    icon: "eye",
    title: "You always know where things stand",
    body: "Regular demos, a shared project board and a single point of contact. Progress is visible every week.",
  },
  {
    icon: "layers",
    title: "Engineering you can hand over",
    body: "Readable code, automated tests and documentation mean any qualified team, including yours, can pick it up.",
  },
  {
    icon: "shield",
    title: "Security from day one",
    body: "Access controls, encryption and dependency monitoring are part of the build, not a later add-on.",
  },
];

export function WhyUs() {
  return (
    <section className="section band-plum" aria-labelledby="home-why">
      <div className="wrap why">
        <div className="why-l rv">
          <p className="eyebrow">Why PS IT Solutions</p>
          <h2 id="home-why">
            A technology partner that <Accent>stays accountable.</Accent>
          </h2>
          <p className="lede">
            You get one team that understands your business, communicates in plain language and stands behind the work
            long after launch.
          </p>
          <ButtonLink href="#process" variant="coral" arrow>
            See how we work
          </ButtonLink>
        </div>
        <div className="why-list rv-s">
          {reasons.map((r, i) => (
            <div key={r.title} className="why-item" style={{ "--i": i } as CSSProperties}>
              <span className="wi">
                <Icon name={r.icon} />
              </span>
              <div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
