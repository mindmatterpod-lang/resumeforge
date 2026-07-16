import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { BLOG_POSTS, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Resume & Job Search Blog",
  description: "Short, practical posts on resumes, cover letters, and getting past the first filter.",
  alternates: { canonical: "/blog" },
};

export default function BlogListPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Notes on job hunting",
    url: `${SITE_URL}/blog`,
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.id}`,
      datePublished: p.date,
    })),
  };

  return (
    <div className="page-shell">
      <JsonLd data={jsonLd} />
      <div className="page-hero small">
        <h1>Notes on job hunting</h1>
        <p>Short, practical posts on resumes, cover letters, and getting past the first filter.</p>
      </div>
      <div className="blog-grid">
        {BLOG_POSTS.map((p) => (
          <Link key={p.id} href={`/blog/${p.id}`} className="blog-card">
            <div className="blog-card-meta">
              {p.date} · {p.readTime}
            </div>
            <div className="blog-card-title">{p.title}</div>
            <div className="blog-card-excerpt">{p.excerpt}</div>
            <div className="blog-card-link">
              Read post <ChevronRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
