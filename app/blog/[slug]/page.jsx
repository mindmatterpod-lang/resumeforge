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

// Handles both relative ("/images/foo.jpg") and absolute ("https://...") image paths
function resolveImageUrl(src) {
  if (!src) return undefined;
  return src.startsWith("http") ? src : `${SITE_URL}${src}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.id === slug);
  if (!post) return {};

  const imageUrl = resolveImageUrl(post.coverImage);

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
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.id === slug);
  if (!post) notFound();

  const imageUrl = resolveImageUrl(post.coverImage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: imageUrl,
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

  const body = Array.isArray(post.body) ? post.body : [];

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
      {body.map((item, index) => {
        // Support old blog format (plain string paragraphs)
        if (typeof item === "string") {
          return (
            <p key={index} className="blog-detail-para">
              {item}
            </p>
          );
        }

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
                {(item.items ?? []).map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            );

          case "steps":
            return (
              <ol key={index} className="blog-steps">
                {(item.items ?? []).map((text, i) => (
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
            if (!item.src) return null;
            return (
              <Image
                key={index}
                src={item.src}
                alt={item.alt || ""}
                width={1200}
                height={675}
                className="blog-image"
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
