import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { Ph } from "@/components/ui";
import { services } from "@/lib/services";
import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" aria-labelledby="footer-title">
      <h2 className="sr-only" id="footer-title">
        Site footer
      </h2>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo variant="reversed" />
            <p>
              Custom software, web and mobile applications, cloud and IT support for growing businesses. Planned
              clearly, built carefully, supported for the long run.
            </p>
            <ul className="socials" aria-label="Social profiles">
              {site.social.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <Icon name={s.icon} />
                      {s.label}
                    </a>
                  ) : (
                    <span title="Profile link to be added">
                      <Icon name={s.icon} />
                      {s.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="foot-col">
            <h3>Company</h3>
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label === "About" ? "About us" : item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="foot-col">
            <h3>Services</h3>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`}>{s.shortName}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="foot-col">
            <h3>Get in touch</h3>
            <ul>
              <li className="ct">
                <small>Email</small>
                <Ph item={site.contact.email} />
              </li>
              <li className="ct">
                <small>Phone</small>
                <Ph item={site.contact.phone} />
              </li>
              <li className="ct">
                <small>Office</small>
                <Ph item={site.contact.city} />
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-word" aria-hidden="true">
          {site.name}
          <span>.</span>
        </div>
      </div>
      <div className="wrap">
        <div className="foot-bottom">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span className="links">
            {site.privacyPolicyHref ? (
              <Link href={site.privacyPolicyHref}>Privacy policy</Link>
            ) : (
              <span>
                Privacy policy <span className="ph">[to be added]</span>
              </span>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}
