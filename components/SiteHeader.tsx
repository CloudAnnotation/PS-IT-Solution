"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { Ph } from "@/components/ui";
import { navigation, site } from "@/lib/site";

function isCurrent(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is open only for the page it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const open = openOn === pathname;

  const close = useCallback((returnFocus: boolean) => {
    setOpenOn(null);
    if (returnFocus) menuButton.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("lock");
    const focusTimer = window.setTimeout(() => firstLink.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const onResize = () => {
      if (desktop.matches) close(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.documentElement.classList.remove("lock");
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, close]);

  const classes = ["header", scrolled ? "scrolled" : "", open ? "is-open" : ""].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      <div className="wrap header-in">
        <Logo onNavigate={() => close(false)} />
        <nav className="nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-cta">
          <Link className="btn btn-sm" href="/contact">
            Let&apos;s talk <Icon name="arrow" />
          </Link>
          <button
            ref={menuButton}
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close(true) : setOpenOn(pathname))}
          >
            <span />
          </button>
        </div>
      </div>
      <div className="mnav" id="mobile-nav" inert={!open}>
        <nav aria-label="Mobile">
          <ul>
            {navigation.map((item, index) => (
              <li key={item.href}>
                <Link
                  ref={index === 0 ? firstLink : undefined}
                  className="mlink"
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  onClick={() => close(false)}
                >
                  {item.label} <Icon name="arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="btn" href="/contact" onClick={() => close(false)}>
          Start a project <Icon name="arrow" />
        </Link>
        <p className="mnav-note">
          Prefer email? <Ph item={site.contact.email} />
        </p>
      </div>
    </header>
  );
}
