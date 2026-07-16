export const metadata = {
  title: "Privacy Policy",
  description: "How ResumeForge handles the information you enter (in short: it doesn't leave your browser).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPageRoute() {
  return (
    <div className="page-shell">
      <div className="page-hero small">
        <h1>Privacy Policy</h1>
        <p>Last updated July 2026</p>
      </div>
      <div className="privacy-body">
        <p className="privacy-disclaimer">
          This page is a starting template, not legal advice — have it reviewed before using it for a real product.
        </p>
        <h2>What we collect</h2>
        <p>
          The resume and cover letter information you type is not sent to, or stored on, any server. If you use the
          "Save" feature, that data is written to your browser's local storage on your own device, so you can come
          back and edit it later on that same browser. It is never transmitted anywhere, and clearing your browser's
          site data or local storage will delete it permanently.
        </p>
        <h2>Cookies and analytics</h2>
        <p>This demo does not set cookies or run analytics scripts.</p>
        <h2>Third-party services</h2>
        <p>
          PDF export runs entirely in your browser using client-side libraries (html2canvas and jsPDF). No resume
          content is sent to a third-party server as part of that process.
        </p>
        <h2>Your choices</h2>
        <p>
          Since nothing is stored server-side, there is no account data to request or delete. Saved resumes can be
          removed at any time from the "My Saved Resumes" page, or by clearing your browser's local storage. If this
          product is extended to include real accounts or server-side storage, this policy should be updated to
          describe what's collected, how long it's kept, and how to request deletion.
        </p>
        <h2>Contact</h2>
        <p>Questions about this policy can be sent through the Contact page.</p>
      </div>
    </div>
  );
}
