import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, site } from "@/lib/site";
import "./globals.css";
import "./styles/home.css";
import "./styles/pages.css";
import "./styles/contact.css";

const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const instrument = localFont({
  src: "./fonts/InstrumentSerif-Italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
});

const mono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Custom Software & IT Solutions`,
    template: `%s | ${site.name}`,
  },
  ...pageMetadata({ path: "/" }),
  applicationName: site.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FBF7F5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  description: site.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={`${jakarta.variable} ${instrument.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // JSON-LD built from static, trusted site config only.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
