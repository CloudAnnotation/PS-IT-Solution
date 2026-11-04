import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { Accent, Ph, SectionHead, Tag } from "@/components/ui";
import { site } from "@/lib/site";

const values: ReadonlyArray<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "target",
    title: "Clarity before code",
    body: "Every engagement starts with discovery that defines scope, priorities and success measures, so budgets and timelines are grounded in facts.",
  },
  {
    icon: "layers",
    title: "Built to be maintained",
    body: "Clean architecture, automated tests and written documentation keep your software easy to change long after launch.",
  },
  {
    icon: "support",
    title: "Accountable after launch",
    body: "Support plans keep your systems secure, monitored and improving, handled by the team that already knows the code.",
  },
];

export function ValueProps() {
  return (
    <section className="section band-paper" aria-labelledby="why-teams">
      <div className="wrap">
        <SectionHead
          id="why-teams"
          eyebrow="Why teams bring us in"
          title={
            <>
              Less guesswork. More software that <Accent>earns its keep.</Accent>
            </>
          }
          lede="Most software projects go wrong before a line of code is written. We fix that with a clear process, plain-language communication and engineering built for the long run."
        />
        <div className="values3 rv-s">
          {values.map((v, i) => (
            <article key={v.title} className="val" style={{ "--i": i } as CSSProperties}>
              <span className="val-ico">
                <Icon name={v.icon} />
              </span>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>
        {site.showProofPoints ? (
          <div className="proof rv">
            <div className="proof-lbl">
              <Tag>Placeholder</Tag>
              <b>Proof points</b>
              <span>Replace with verified figures before launch.</span>
            </div>
            <dl>
              {site.proofPoints.map((p) => (
                <div key={p.label}>
                  <dt>{p.label}</dt>
                  <dd>
                    <Ph item={p.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </section>
  );
}
