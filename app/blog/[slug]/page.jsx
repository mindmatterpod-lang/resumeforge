import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { BLOG_POSTS, SITE_URL } from "@/lib/data";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.id,
  }));
}

export function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.id === params.slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.id}`,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage
        ? [
            {
              url: `${SITE_URL}${post.coverImage}`,
            },
          ]
        : [],
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
    image: post.coverImage
      ? `${SITE_URL}${post.coverImage}`
      : undefined,
    url: `${SITE_URL}/blog/${post.id}`,
    author: {
      "@type": "Organization",
      name: "ResumeForge",
    },
    publisher: {
      "@type": "Organization",
      name: "ResumeForge",
    },
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

      <h1 className="blog-detail-title">
        {post.title}
      </h1>

      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={675}
          priority
          className="blog-image"
        />
      )}

{post.body.map((item, index) => {

  // Support old blog format
  if (typeof item === "string") {
    return (
      <p key={index} className="blog-detail-para">
        {item}
      </p>
    );
  }

  // Support new rich blog format
  switch (item.type) {

    case "heading":
      return (
        <h2 key={index} className="blog-heading">
          {item.text}
        </h2>
      );

    case "paragraph":
      return (
        <p key={index} className="blog-detail-para">
          {item.text}
        </p>
      );

    case "list":
      return (
        <ul key={index} className="blog-list">
          {item.items.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol key={index} className="blog-steps">
          {item.items.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ol>
      );

    case "tip":
      return (
        <div key={index} className="blog-tip">
          💡 <strong>Tip:</strong> {item.text}
        </div>
      );

    case "image":
      return (
        <Image
          key={index}
          src={item.src}
          alt={item.alt}
          width={1200}
          height={675}
          className="blog-image"
        />
      );

    default:
      return null;
  }
})}
