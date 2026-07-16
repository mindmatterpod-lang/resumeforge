import Link from "next/link";

const GROUPS = [
  {
    title: "Tools",
    items: [
      ["/builder", "Resume Builder"],
      ["/my-resumes", "My Saved Resumes"],
      ["/cover-letter", "Cover Letter Builder"],
      ["/ats-checker", "ATS Resume Checker"],
    ],
  },
  {
    title: "Explore",
    items: [
      ["/templates", "Resume Templates"],
      ["/examples", "Resume Examples"],
      ["/blog", "Blog"],
    ],
  },
  {
    title: "Company",
    items: [
      ["/about", "About"],
      ["/contact", "Contact"],
      ["/privacy", "Privacy Policy"],
      ["/terms", "Terms of Service"],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <div className="rb-brand-mark">R</div>
          <div>
            <div className="rb-brand-name">ResumeForge</div>
            <div className="rb-brand-sub">FORGE · SHAPE · SEND</div>
            <a href="mailto:mindmatterpod@gmail.com" className="site-footer-link" style={{ display: "inline-block", marginTop: "0.5rem" }}>
              mindmatterpod@gmail.com
            </a>
          </div>
        </div>
        <div className="site-footer-groups">
          {GROUPS.map((g) => (
            <div key={g.title} className="site-footer-group">
              <div className="site-footer-group-title">{g.title}</div>
              {g.items.map(([href, label]) => (
                <Link key={href} href={href} className="site-footer-link">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="site-footer-bottom">© 2026 ResumeForge. Built as a demo — not a registered company.</div>
    </footer>
  );
}
