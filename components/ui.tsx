import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/Icon";
import type { Editable } from "@/lib/site";

/** Renders an editable value; placeholders get a dashed "fill me in" style. */
export function Ph({ item }: { item: Editable }) {
  if (!item.placeholder) return <>{item.value}</>;
  return (
    <span className="ph" title="Placeholder: replace before launch">
      [{item.value}]
    </span>
  );
}

/** Small pill used to label placeholder or demonstration content. */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

type ButtonVariant = "primary" | "ghost" | "coral" | "line-light";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn",
  ghost: "btn btn-ghost",
  coral: "btn btn-coral",
  "line-light": "btn btn-line-light",
};

export function ButtonLink({
  variant = "primary",
  arrow = false,
  small = false,
  className,
  children,
  ...rest
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; arrow?: boolean; small?: boolean }) {
  const classes = [variantClass[variant], small ? "btn-sm" : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <Link className={classes} {...rest}>
      {children}
      {arrow ? <Icon name="arrow" /> : null}
    </Link>
  );
}

export function ArrowLink({ children, ...rest }: ComponentProps<typeof Link>) {
  return (
    <Link className="link-arrow" {...rest}>
      <span>{children}</span>
      <Icon name="arrow" />
    </Link>
  );
}

/** Section heading: eyebrow + title, with an optional lede alongside. */
export function SectionHead({
  id,
  eyebrow,
  title,
  lede,
  ledeClassName,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  ledeClassName?: string;
}) {
  return (
    <div className={`sec-head rv${lede ? " split" : ""}`}>
      <div className="stack">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {lede ? <p className={`lede${ledeClassName ? ` ${ledeClassName}` : ""}`}>{lede}</p> : null}
    </div>
  );
}

/** Serif italic accent phrase used once per headline. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="accent">{children}</span>;
}

export function CtaPanel({
  id,
  accent,
  title,
  body,
  actions,
  spacedTop = false,
}: {
  id: string;
  /** Keep top padding when the previous section has no bottom spacing of its own (e.g. a colored band). */
  spacedTop?: boolean;
  accent: string;
  title: string;
  body: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section className={`section tight${spacedTop ? "" : " cta-section"}`} aria-labelledby={id}>
      <div className="wrap">
        <div className="cta rv">
          <div className="cta-arcs" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <h2 className="cta-big" id={id}>
            <span className="accent">{accent}</span>
            {title}
          </h2>
          <div className="cta-side">
            <p>{body}</p>
            <div className="btn-row">{actions}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="crumbs ld" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
