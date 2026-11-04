import type { Metadata } from "next";
import { Accent, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section" aria-labelledby="nf-title">
      <div className="wrap nf">
        <p className="code">404</p>
        <h1 id="nf-title">
          This page doesn&apos;t <Accent>exist.</Accent>
        </h1>
        <p className="lede">The link may be out of date, or the page may have moved.</p>
        <div className="btn-row">
          <ButtonLink href="/" arrow>
            Go to the home page
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
