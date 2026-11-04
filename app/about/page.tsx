import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import type { CSSProperties } from "react";
import { Accent, Breadcrumbs, ButtonLink, CtaPanel, SectionHead, Tag } from "@/components/ui";
import { site } from "@/lib/site";

const description =
  "PS IT Solutions is a software development and IT services company that turns complex processes into dependable, easy-to-use software.";

export const metadata: Metadata = pageMetadata({ title: "About Us", description, path: "/about" });

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const values = [
  { word: "Clarity", body: "Plain language, honest estimates and no surprises on the invoice." },
  { word: "Craft", body: "Details matter, from the database schema to the button label." },
  { word: "Ownership", body: "We treat your product like our own and stay accountable for results." },
  { word: "Candor", body: "If something is off track, you hear it from us first, with a plan to fix it." },
] as const;

const principles = [
  {
    title: "Proven over trendy",
    body: "We pick mature, well-supported technology so your software is easy to hire for and maintain.",
  },
  {
    title: "Work with what you have",
    body: "If your current systems serve you well, we integrate with them rather than replacing them for the sake of it.",
  },
  {
    title: "Measure what matters",
    body: "Performance, uptime and adoption are tracked from launch, so improvements are based on evidence.",
  },
] as const;

/** Example stack — replace with the technologies the team actually uses. */
const stack = [
  { group: "Web", items: ["React", "Next.js", "TypeScript", "Node.js"] },
  { group: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { group: "Backend", items: [".NET", "Python", "PostgreSQL", "REST & GraphQL"] },
  { group: "Cloud", items: ["AWS", "Microsoft Azure", "Google Cloud", "Docker"] },
] as const;

const teamRoles = ["Founder & CEO", "Head of Engineering", "Lead Product Designer", "Client Success Lead"] as const;
const avatarShades = ["#3B1C5A", "#FF6B57", "#6B4A88", "#B03626"] as const;

export default function AboutPage() {
  return (
    <>
      <section className="phero" aria-labelledby="about-title">
        <div className="wrap phero-grid">
          <div>
            <Breadcrumbs current="About" />
            <h1 className="ld" id="about-title" style={delay(80)}>
              Engineers and designers who care how software <Accent>gets used.</Accent>
            </h1>
            <p className="lede ld" style={delay(160)}>
              {site.name} is a software development and IT services company. We help organizations turn complex
              processes into dependable, easy-to-use software, and we stay on to keep it running well.
            </p>
          </div>
          <svg className="phero-art ld" style={delay(240)} viewBox="0 0 300 300" aria-hidden="true">
            <circle cx="150" cy="150" r="140" fill="#E8D9E3" opacity=".6" />
            <rect x="70" y="70" width="110" height="110" rx="26" fill="#3B1C5A" />
            <rect x="130" y="130" width="100" height="100" rx="26" fill="#FF6B57" opacity=".92" />
            <path d="M156 130H180V154A26 26 0 0 1 154 180H130V156A26 26 0 0 1 156 130Z" fill="#28113D" />
            <circle cx="236" cy="78" r="10" fill="none" stroke="#FF6B57" strokeWidth="2" />
          </svg>
        </div>
      </section>

      <section className="section band-paper" aria-labelledby="about-who">
        <div className="wrap two">
          <div className="stack rv">
            <p className="eyebrow">Who we are</p>
            <h2 id="about-who">A focused team for businesses that depend on their software.</h2>
          </div>
          <div className="stack rv">
            <p className="lede">
              We work with companies that have outgrown spreadsheets, off-the-shelf tools or an aging system. Our job is
              to understand how your business actually operates, then design and build software that fits it, with the
              documentation and support to keep it healthy.
            </p>
            <div className="ph-block">
              <b>Company story · placeholder</b>
              <p>
                Add the founding story here: when and why {site.name} started, who leads it, where the team is based,
                and the types of clients it serves. Keep it to three or four sentences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-mv">
        <div className="wrap">
          <SectionHead id="about-mv" eyebrow="Mission & vision" title="What we're here to do." />
          <div className="mv">
            <article className="mv-card m rv">
              <span className="k">Mission</span>
              <h3>
                Give growing businesses software that is as dependable as the people who run them, delivered with clear
                communication and lasting support.
              </h3>
              <Tag>Draft · confirm with leadership</Tag>
              <span className="glyph" aria-hidden="true">
                M
              </span>
            </article>
            <article className="mv-card v rv">
              <span className="k">Vision</span>
              <h3>
                Be the technology partner businesses recommend first, because our work keeps paying off years after
                launch.
              </h3>
              <Tag>Draft · confirm with leadership</Tag>
              <span className="glyph" aria-hidden="true">
                V
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="section tight flush-top" aria-labelledby="about-values">
        <div className="wrap">
          <SectionHead id="about-values" eyebrow="Core values" title="How we behave on every project." />
          <div className="vals rv-s">
            {values.map((v, i) => (
              <div key={v.word} className="vcell" style={{ "--i": i } as CSSProperties}>
                <h3 className="vw">{v.word}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-paper" aria-labelledby="about-tech">
        <div className="wrap two">
          <div className="stack rv">
            <p className="eyebrow">Our approach to technology</p>
            <h2 id="about-tech">Proven tools, chosen for your situation.</h2>
            <ul className="principles">
              {principles.map((p) => (
                <li key={p.title}>
                  <span className="pi" aria-hidden="true" />
                  <div>
                    <b>{p.title}</b>
                    <p>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="stackbox rv">
            {stack.map((g) => (
              <div key={g.group} className="grp">
                <h3>{g.group}</h3>
                <ul className="chips">
                  {g.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Tag>Example stack · replace with confirmed technologies</Tag>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-team">
        <div className="wrap">
          <SectionHead
            id="about-team"
            eyebrow="Leadership & team"
            title="The people behind the work."
            lede="Profiles will be added once names, roles and photos are approved for publication."
          />
          <ul className="team rv-s">
            {teamRoles.map((role, i) => (
              <li key={role} className="member" style={{ "--i": i } as CSSProperties}>
                <div className="avatar" role="img" aria-label="Photo placeholder">
                  <Tag>Placeholder</Tag>
                  <svg viewBox="0 0 160 160" aria-hidden="true">
                    <circle cx="80" cy="62" r="30" fill={avatarShades[i]} opacity=".9" />
                    <path d="M20 160c0-38 27-62 60-62s60 24 60 62z" fill={avatarShades[i]} opacity=".35" />
                  </svg>
                </div>
                <div>
                  <b>[Team member name]</b>
                  <span>[Role, e.g. {role}]</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel
        id="about-cta"
        accent="Sound like a fit?"
        title="Let's talk about your project."
        body="A first conversation costs nothing and usually clarifies what to build first."
        actions={
          <>
            <ButtonLink href="/contact" arrow>
              Start a conversation
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              See services
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
