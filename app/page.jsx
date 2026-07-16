import Link from "next/link";
import { Sparkles, Eye, Shield, Download, FileText, ArrowRight, Save } from "lucide-react";

export const metadata = {
  title: "ResumeForge — Free Resume Builder & ATS-Friendly Templates",
  description:
    "Build an ATS-friendly resume in minutes with a live preview, 16 templates, and one-click PDF export. Free, no account needed.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-eyebrow">
            <Sparkles size={14} /> Free · No account needed
          </div>
          <h1 className="home-hero-title">Build a resume that gets you out of the inbox and into the interview.</h1>
          <p className="home-hero-sub">
            16 templates, a live preview as you type, and a one-click PDF — all in your browser, nothing to install.
          </p>
          <div className="home-hero-actions">
            <Link className="btn-primary home-cta" href="/builder">
              Start building free <ArrowRight size={16} />
            </Link>
            <Link className="btn-secondary" href="/templates">
              Browse templates
            </Link>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-feature">
          <div className="home-feature-icon">
            <Eye size={18} />
          </div>
          <h3>See it as you build it</h3>
          <p>Every field updates a real, formatted preview immediately — no guessing how it'll look until you print.</p>
        </div>
        <div className="home-feature">
          <div className="home-feature-icon">
            <Shield size={18} />
          </div>
          <h3>Built with ATS in mind</h3>
          <p>Most of the 16 templates use a single-column structure that's straightforward for applicant tracking software to parse.</p>
        </div>
        <div className="home-feature">
          <div className="home-feature-icon">
            <Download size={18} />
          </div>
          <h3>One-click PDF</h3>
          <p>Export a clean, consistently formatted PDF directly from your browser — no printer dialog guesswork.</p>
        </div>
        <div className="home-feature">
          <div className="home-feature-icon">
            <FileText size={18} />
          </div>
          <h3>Cover letters too</h3>
          <p>Use the same details to put together a matching cover letter in a few minutes.</p>
        </div>
        <div className="home-feature">
          <div className="home-feature-icon">
            <Save size={18} />
          </div>
          <h3>Save it, edit it later</h3>
          <p>No account needed — save a resume in this browser and come back to edit or re-download it anytime.</p>
        </div>
      </section>

      <section className="home-cta-banner">
        <h2>Ready when you are.</h2>
        <p>No sign-up, no paywall for the basics — just open the builder and start typing.</p>
        <Link className="btn-primary home-cta" href="/builder">
          Build my resume <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
