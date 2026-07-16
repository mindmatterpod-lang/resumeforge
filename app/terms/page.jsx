export const metadata = {
  title: "Terms of Service",
  description: "The terms for using ResumeForge.",
  alternates: { canonical: "/terms" },
};

export default function TermsPageRoute() {
  return (
    <div className="page-shell">
      <div className="page-hero small">
        <h1>Terms of Service</h1>
        <p>Last updated July 2026</p>
      </div>
      <div className="privacy-body">
        <p className="privacy-disclaimer">
          This page is a starting template, not legal advice — have it reviewed by a lawyer, ideally one familiar
          with the countries you actually operate in, before relying on it for a real product.
        </p>

        <h2>What this service is</h2>
        <p>
          ResumeForge is a free, in-browser tool for building resumes and cover letters. There's no account
          and no server-side storage: the content you enter stays in your browser, and anything you choose to save
          is kept in that browser's local storage on that device. See the Privacy Policy for details.
        </p>

        <h2>No guarantee of outcomes</h2>
        <p>
          This tool helps you put together a resume and cover letter. It does not guarantee interviews, job offers,
          or any other outcome, and it is not a substitute for professional career or legal advice.
        </p>

        <h2>Your content</h2>
        <p>
          You own whatever you type into the builder — your name, work history, and everything else. You're
          responsible for making sure it's accurate and that you have the right to use it. Don't use this tool to
          create content that's unlawful, fraudulent, or infringes someone else's rights.
        </p>

        <h2>Our content</h2>
        <p>
          The templates, design, code, and text on this site (outside of what you personally type in) belong to the
          site operator or its licensors. You're welcome to use the templates to build your own resume; you don't
          have permission to copy the site itself, its design, or its underlying code for another product.
        </p>

        <h2>Service provided "as is"</h2>
        <p>
          This service is provided as-is, without warranties of any kind, express or implied. We don't guarantee
          it will be uninterrupted, error-free, or fit for any particular purpose. To the extent permitted by law,
          the operator isn't liable for damages arising from your use of the service — including, for example, a
          browser crash losing unsaved work, or a PDF export not looking exactly as expected on every device.
        </p>

        <h2>Third-party libraries</h2>
        <p>
          PDF export runs in your browser using the open-source libraries html2canvas and jsPDF. Their use is
          subject to their own respective licenses.
        </p>

        <h2>Changes</h2>
        <p>
          These terms may be updated from time to time. Continued use of the service after a change means you
          accept the updated terms.
        </p>

        <h2>Governing law</h2>
        <p>
          Since this service is intended for use by people in many countries, a single governing-law clause won't
          straightforwardly apply everywhere — consumer protection law in a visitor's own country may still take
          precedence regardless of what's written here. Whoever operates this site in production should fill in
          their actual jurisdiction here and have a lawyer confirm what's enforceable for their intended audience.
        </p>

        <h2>Contact</h2>
        <p>Questions about these terms can be sent through the Contact page.</p>
      </div>
    </div>
  );
}
