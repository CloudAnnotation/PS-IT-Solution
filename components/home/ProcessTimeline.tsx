import type { CSSProperties } from "react";
import { Accent, SectionHead } from "@/components/ui";

const steps = [
  { title: "Discover", body: "Workshops to understand your goals, users and constraints.", output: "Project brief" },
  { title: "Plan", body: "Scope, architecture, milestones and a realistic estimate.", output: "Roadmap" },
  { title: "Design", body: "Wireframes and prototypes tested with real users.", output: "Prototype" },
  { title: "Develop", body: "Short iterations with a working demo at the end of each.", output: "Releases" },
  { title: "Deliver", body: "Testing, security review and a planned, low-risk launch.", output: "Go-live" },
  { title: "Support", body: "Monitoring, updates and improvements as your needs evolve.", output: "Support plan" },
] as const;

export function ProcessTimeline() {
  return (
    <section className="section" id="process" aria-labelledby="home-proc">
      <div className="wrap">
        <SectionHead
          id="home-proc"
          eyebrow="How we work"
          title={
            <>
              A clear path from idea to launch, <Accent>and beyond.</Accent>
            </>
          }
          lede="Six stages, each with a concrete output you can review before the next one begins."
        />
        <ol className="proc rv-s">
          {steps.map((step, i) => (
            <li key={step.title} className="pstep" style={{ "--i": i } as CSSProperties}>
              <span className="pnum" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <span className="out">
                <em>Output:</em> {step.output}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
