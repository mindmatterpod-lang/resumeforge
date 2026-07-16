import ContactFormClient from "@/components/ContactFormClient";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description: "Questions, bug reports, or template requests for ResumeForge.",
  alternates: { canonical: "/contact" },
};

export default function ContactPageRoute() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "ResumeForge",
      email: "mindmatterpod@gmail.com",
    },
  };

  return (
    <div className="page-shell">
      <JsonLd data={jsonLd} />
      <div className="page-hero small">
        <h1>Contact</h1>
        <p>
          Questions, bug reports, or template requests — send them here, or email directly at{" "}
          <a href="mailto:mindmatterpod@gmail.com">mindmatterpod@gmail.com</a>.
        </p>
      </div>
      <ContactFormClient />
    </div>
  );
}
