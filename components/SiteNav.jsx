"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/builder", label: "Resume Builder" },
  { href: "/my-resumes", label: "My Resumes" },
  { href: "/templates", label: "Templates" },
  { href: "/cover-letter", label: "Cover Letter" },
  { href: "/examples", label: "Examples" },
  { href: "/ats-checker", label: "ATS Checker" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const MOBILE_EXTRA = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const showCta = pathname !== "/builder" && pathname !== "/cover-letter";

  return (
    <div className="site-nav">
      <div className="site-nav-inner">
        <Link className="site-brand-btn" href="/" onClick={() => setMenuOpen(false)}>
          <div className="rb-brand-mark">R</div>
          <div>
            <div className="rb-brand-name">ResumeForge</div>
            <div className="rb-brand-sub">FORGE · SHAPE · SEND</div>
          </div>
        </Link>

        <nav className="site-nav-links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-nav-right">
          {showCta && (
            <Link className="btn-primary hidden sm:flex" href="/builder">
              Build my resume <ArrowRight size={15} />
            </Link>
          )}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-nav-menu">
          {[...NAV_ITEMS, ...MOBILE_EXTRA].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-menu-link ${pathname === item.href ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
