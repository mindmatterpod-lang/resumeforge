import { SITE_URL, BLOG_POSTS } from "@/lib/data";

export default function sitemap() {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/builder", priority: 0.9, changeFrequency: "weekly" },
    { path: "/templates", priority: 0.8, changeFrequency: "monthly" },
    { path: "/cover-letter", priority: 0.8, changeFrequency: "monthly" },
    { path: "/examples", priority: 0.7, changeFrequency: "monthly" },
    { path: "/ats-checker", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/about", priority: 0.4, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
