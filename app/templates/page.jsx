import TemplatesGallery from "@/components/TemplatesGallery";
import JsonLd from "@/components/JsonLd";
import { TEMPLATES, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Resume Templates — 6 Free ATS-Friendly Designs",
  description:
    "16 resume templates, from clean and ATS-safe to bold and visual. Preview each, then start building for free.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPageRoute() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TEMPLATES.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${t.label} resume template`,
      url: `${SITE_URL}/builder?template=${t.id}`,
    })),
  };

  return (
    <div className="page-shell">
      <JsonLd data={jsonLd} />
      <div className="page-hero small">
        <h1>Resume Templates</h1>
        <p>16 layouts, all built from the same clean structure. Pick one and start building — you can switch anytime.</p>
      </div>
      <TemplatesGallery />
    </div>
  );
}
