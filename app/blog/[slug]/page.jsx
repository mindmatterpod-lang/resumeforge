import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { BLOG_POSTS, SITE_URL } from "@/lib/data";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.id === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.id}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find((p) => p.id === params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.id}`,
    author: { "@type": "Organization", name: "ResumeForge" },
  };

  return (
    <div className="page-shell blog-detail">
      <JsonLd data={jsonLd} />
      <Link href="/blog" className="blog-back">
        ← Back to all posts
      </Link>
      <div className="blog-detail-meta">
        {post.date} · {post.readTime}
      </div>
      <h1 className="blog-detail-title">{post.title}</h1>
      {post.body.map((p, i) => (
        <p key={i} className="blog-detail-para">
          {p}
        </p>
      ))}
    </div>
  );
}
