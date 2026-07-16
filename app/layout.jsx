import "./globals.css";
import Script from "next/script";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/data";

// Paste your Google Analytics Measurement ID here, e.g. "G-ABC123XYZ0"
const GA_MEASUREMENT_ID = "G-DW22RHRNNN";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free Resume Builder & ATS-Friendly Templates`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Build an ATS-friendly resume in minutes with a live preview, 16 templates, and one-click PDF export. Free, no account needed.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: "A free, in-browser resume and cover letter builder with ATS-friendly templates.",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <html lang="en">
      <body>
        {GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={orgJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <SiteNav />
        <main id="main-content" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
