import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEMPLATE_COMPONENTS } from "./PaperTemplates";
import { TEMPLATES, SAMPLE_DESIGNER } from "@/lib/data";

// No "use client" needed — this is a static grid of Links, so it renders
// (and is crawlable) entirely on the server.
export default function TemplatesGallery() {
  return (
    <div className="template-gallery">
      {TEMPLATES.map((t) => {
        const Paper = TEMPLATE_COMPONENTS[t.id];
        return (
          <div key={t.id} className="template-gallery-card">
            <div className="template-gallery-thumb">
              <div className="template-gallery-scale">
                <Paper data={SAMPLE_DESIGNER} />
              </div>
            </div>
            <div className="template-gallery-footer">
              <div className="template-gallery-name">
                <span className={`ats-dot ${t.ats ? "ats-yes" : "ats-no"}`} />
                {t.label}
              </div>
              <Link className="btn-primary template-gallery-btn" href={`/builder?template=${t.id}`}>
                Use this <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
