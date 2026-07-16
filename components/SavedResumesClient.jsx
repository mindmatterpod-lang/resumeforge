"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, Pencil, Trash2, FileText } from "lucide-react";
import { TEMPLATE_COMPONENTS } from "./PaperTemplates";
import { listSavedResumes, deleteResume } from "@/lib/storage";
import { exportNodeToPdf, getDefaultPaperFormat } from "@/lib/pdf";
import { TEMPLATES } from "@/lib/data";

const TEMPLATE_LABELS = Object.fromEntries(TEMPLATES.map((t) => [t.id, t.label]));

export default function SavedResumesClient() {
  const [resumes, setResumes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [exportingId, setExportingId] = useState(null);
  const [renderTarget, setRenderTarget] = useState(null);
  const hiddenRef = useRef(null);

  useEffect(() => {
    setResumes(listSavedResumes());
    setLoaded(true);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this saved resume? This can't be undone.")) return;
    deleteResume(id);
    setResumes(listSavedResumes());
  };

  const handleDownload = async (resume) => {
    setExportingId(resume.id);
    setRenderTarget(resume);
    // Give the hidden render target a tick to paint this resume's data
    // before we snapshot it.
    await new Promise((resolve) => setTimeout(resolve, 60));
    try {
      const node = hiddenRef.current?.querySelector(".paper");
      if (node) {
        const safeName = (resume.data.personal.name || resume.name || "resume").trim().replace(/\s+/g, "_") || "resume";
        await exportNodeToPdf(node, `${safeName}_Resume.pdf`, getDefaultPaperFormat());
      }
    } catch (err) {
      console.error("Download from saved resumes failed:", err);
    } finally {
      setExportingId(null);
      setRenderTarget(null);
    }
  };

  const RenderPaper = renderTarget ? TEMPLATE_COMPONENTS[renderTarget.template] || TEMPLATE_COMPONENTS.modern : null;

  return (
    <div className="page-shell">
      <div className="page-hero small">
        <h1>My Saved Resumes</h1>
        <p>
          Saved right in this browser — no account needed. Clearing your browser data will remove them, so keep a
          PDF copy of anything important.
        </p>
      </div>

      {loaded && resumes.length === 0 && (
        <div className="saved-empty">
          <FileText size={26} />
          <div className="saved-empty-title">Nothing saved yet</div>
          <p>Build a resume and hit Save to see it here.</p>
          <Link className="btn-primary" href="/builder">
            Start building
          </Link>
        </div>
      )}

      <div className="saved-grid">
        {resumes.map((r) => (
          <div key={r.id} className="saved-card">
            <div className="saved-card-title">{r.name}</div>
            <div className="saved-card-meta">
              Last edited {new Date(r.updatedAt).toLocaleDateString()} · {TEMPLATE_LABELS[r.template] || r.template}
            </div>
            <div className="saved-card-actions">
              <Link className="btn-secondary" href={`/builder?savedId=${r.id}`}>
                <Pencil size={14} /> Edit
              </Link>
              <button className="btn-primary" onClick={() => handleDownload(r)} disabled={exportingId === r.id}>
                <Download size={14} /> {exportingId === r.id ? "Preparing…" : "Download"}
              </button>
              <button className="saved-delete" onClick={() => handleDelete(r.id)} aria-label="Delete this resume">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Off-screen render used only to generate a PDF snapshot when
          downloading straight from this list, without opening the builder. */}
      {RenderPaper && renderTarget && (
        <div style={{ position: "fixed", top: 0, left: "-9999px", pointerEvents: "none" }} ref={hiddenRef}>
          <RenderPaper data={renderTarget.data} />
        </div>
      )}
    </div>
  );
}
