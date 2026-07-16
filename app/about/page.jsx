import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/data";

export const metadata = {
  title: "About",
  description: "Why we built ResumeForge, how it works, and what this demo is (and isn't).",
  alternates: { canonical: "/about" },
};

export default function AboutPageRoute() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/about`,
    about: { "@type": "Organization", name: SITE_NAME, email: "mindmatterpod@gmail.com" },
  };

  return (
    <div className="page-shell">
      <JsonLd data={jsonLd} />
      <div className="page-hero small">
        <h1>About ResumeForge</h1>
        <p>A resume builder for people who'd rather spend the evening outside than fighting with margins in a Word doc.</p>
      </div>
      <div className="about-grid">
        <div className="about-block">
          <h2>Why we built this</h2>
          <p>
            Most resume tools make you choose between a template that looks good and one that survives being read by
            hiring software. We wanted both — templates that are genuinely easy on the eye, built on a structure that
            parses cleanly when it needs to.
          </p>
        </div>
        <div className="about-block">
          <h2>How it works</h2>
          <ol className="about-steps">
            <li>Fill in your experience once, in plain language.</li>
            <li>Preview it instantly against six different templates.</li>
            <li>Save it to come back and edit later, and download a polished PDF whenever you're ready.</li>
          </ol>
        </div>
        <div className="about-block">
          <h2>What this is (and isn't)</h2>
          <p>
            This is a free, in-browser resume and cover letter builder. There's no account and nothing is stored on
            a server — hitting "Save" keeps a resume in this browser's local storage so you can come back and edit it
            later on this same device. Clearing your browser data removes it, so download a PDF copy of anything
            you want to keep for good.
          </p>
        </div>
      </div>
    </div>
  );
}
