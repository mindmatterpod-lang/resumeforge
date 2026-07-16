"use client";

import { useState, useRef, useEffect } from "react";
import { User, Briefcase, FileText, Download } from "lucide-react";
import { Field, TextInput, TextArea, PaperFormatToggle } from "./UI";
import { exportNodeToPdf, getDefaultPaperFormat } from "@/lib/pdf";

export default function CoverLetterClient() {
  const [cl, setCl] = useState({
    yourName: "",
    yourEmail: "",
    yourPhone: "",
    companyName: "",
    hiringManager: "",
    jobTitle: "",
    body: "",
  });
  const [exporting, setExporting] = useState(false);
  const [paperFormat, setPaperFormat] = useState("letter");
  const printRef = useRef(null);

  useEffect(() => {
    setPaperFormat(getDefaultPaperFormat());
  }, []);

  const update = (field, value) => setCl((c) => ({ ...c, [field]: value }));

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const bodyParagraphs = cl.body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const handleDownload = async () => {
    setExporting(true);
    try {
      const node = printRef.current.querySelector(".paper");
      const safeName = (cl.yourName || "cover_letter").trim().replace(/\s+/g, "_") || "cover_letter";
      await exportNodeToPdf(node, `${safeName}_Cover_Letter.pdf`, paperFormat);
    } catch (err) {
      console.error("Cover letter PDF export failed, falling back to browser print:", err);
      window.print();
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <div className="rb-topbar">
        <div>
          <div className="rb-page-title">Cover Letter Builder</div>
          <div className="rb-brand-sub">ONE LETTER, ANY ROLE</div>
        </div>
        <div className="flex items-center gap-3">
          <PaperFormatToggle value={paperFormat} onChange={setPaperFormat} />
          <button className="btn-primary" onClick={handleDownload} disabled={exporting}>
            <Download size={15} />
            <span className="hidden sm:inline">{exporting ? "Preparing…" : "Download PDF"}</span>
          </button>
        </div>
      </div>

      <div className="rb-body">
        <div className="form-pane">
          <div className="section-card">
            <div className="section-static-header">
              <div className="section-icon">
                <User size={16} strokeWidth={2.2} />
              </div>
              <div className="font-semibold text-[15px]" style={{ color: "var(--paper)" }}>
                About you
              </div>
            </div>
            <div className="section-body">
              <Field label="Full name">
                <TextInput placeholder="Jane Alvarez" value={cl.yourName} onChange={(e) => update("yourName", e.target.value)} />
              </Field>
              <div className="row-2">
                <Field label="Email">
                  <TextInput placeholder="jane@email.com" value={cl.yourEmail} onChange={(e) => update("yourEmail", e.target.value)} />
                </Field>
                <Field label="Phone">
                  <TextInput placeholder="(555) 010-2938" value={cl.yourPhone} onChange={(e) => update("yourPhone", e.target.value)} />
                </Field>
              </div>
            </div>
          </div>

          <div className="section-card">
            <div className="section-static-header">
              <div className="section-icon">
                <Briefcase size={16} strokeWidth={2.2} />
              </div>
              <div className="font-semibold text-[15px]" style={{ color: "var(--paper)" }}>
                The role
              </div>
            </div>
            <div className="section-body">
              <Field label="Company name">
                <TextInput placeholder="Ridgeline Co." value={cl.companyName} onChange={(e) => update("companyName", e.target.value)} />
              </Field>
              <Field label="Hiring manager (optional)">
                <TextInput placeholder="Leave blank for “Hiring Team”" value={cl.hiringManager} onChange={(e) => update("hiringManager", e.target.value)} />
              </Field>
              <Field label="Job title you're applying for">
                <TextInput placeholder="Senior Product Designer" value={cl.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} />
              </Field>
            </div>
          </div>

          <div className="section-card">
            <div className="section-static-header">
              <div className="section-icon">
                <FileText size={16} strokeWidth={2.2} />
              </div>
              <div className="font-semibold text-[15px]" style={{ color: "var(--paper)" }}>
                Your letter
              </div>
            </div>
            <div className="section-body">
              <Field label="One paragraph per line">
                <TextArea
                  className="input-field textarea cl-textarea"
                  placeholder={
                    "I'm applying for the Senior Product Designer role because...\nIn my current role at Ridgeline Co., I led a redesign that cut task time 40%...\nI'd welcome the chance to bring that same approach to your team."
                  }
                  value={cl.body}
                  onChange={(e) => update("body", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="preview-pane">
          <div className="preview-shell print-target" ref={printRef}>
            <div className="paper cl-paper">
              <div className="cl-sender-name">{cl.yourName || "Your Name"}</div>
              <div className="cl-sender-contact">{[cl.yourEmail, cl.yourPhone].filter(Boolean).join("  ·  ")}</div>
              <div className="cl-date">{today}</div>
              <div className="cl-recipient">
                {cl.hiringManager && <div>{cl.hiringManager}</div>}
                <div>{cl.companyName || "Company Name"}</div>
              </div>
              {cl.jobTitle && <div className="cl-re">Re: Application for {cl.jobTitle}</div>}
              <div className="cl-greeting">Dear {cl.hiringManager || "Hiring Team"},</div>
              <div className="cl-paragraphs">
                {bodyParagraphs.length > 0 ? (
                  bodyParagraphs.map((p, i) => (
                    <p key={i} className="cl-para">
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="cl-para cl-placeholder">
                    Write a paragraph or two about why you're a strong fit for {cl.jobTitle || "this role"} at {cl.companyName || "the company"}.
                  </p>
                )}
              </div>
              <div className="cl-sign">
                <div>Sincerely,</div>
                <div className="cl-sign-name">{cl.yourName || "Your Name"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
