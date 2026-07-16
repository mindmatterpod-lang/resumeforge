"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { StrengthRing } from "./UI";
import { analyzeMatch } from "@/lib/data";

export default function ATSCheckerClient() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    if (!resumeText.trim() || !jobText.trim()) return;
    setResult(analyzeMatch(resumeText, jobText));
  };

  return (
    <div className="page-shell">
      <div className="page-hero small">
        <h1>ATS Resume Checker</h1>
        <p>Paste your resume and a job description to see how many of the job's key terms actually show up in your resume.</p>
      </div>

      <div className="ats-grid">
        <div className="ats-input-block">
          <span className="ats-label">Your resume text</span>
          <textarea
            className="input-field textarea ats-textarea"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste the plain text of your resume here..."
          />
        </div>
        <div className="ats-input-block">
          <span className="ats-label">Job description</span>
          <textarea
            className="input-field textarea ats-textarea"
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste the job description here..."
          />
        </div>
      </div>

      <button className="btn-primary ats-check-btn" onClick={handleCheck}>
        <Search size={15} /> Check match
      </button>

      {result && (
        <div className="ats-results">
          <div className="ats-score-block">
            <StrengthRing
              value={result.score}
              label="Keyword match"
              captions={["Low overlap", "Partial overlap", "Strong overlap"]}
            />
            <div className="ats-score-caption">
              {result.score >= 70
                ? "Strong keyword overlap with this posting."
                : result.score >= 40
                ? "Partial overlap — worth tailoring a bit further."
                : "Low overlap — consider tailoring your resume to this posting."}
            </div>
          </div>

          <div className="ats-keyword-cols">
            <div>
              <div className="ats-col-heading">Found in your resume ({result.matched.length})</div>
              <div className="ats-chip-list">
                {result.matched.map((w) => (
                  <span key={w} className="ats-chip ats-chip-yes">
                    {w}
                  </span>
                ))}
                {result.matched.length === 0 && <div className="ats-empty">No overlapping keywords found.</div>}
              </div>
            </div>
            <div>
              <div className="ats-col-heading">Missing from your resume ({result.missing.length})</div>
              <div className="ats-chip-list">
                {result.missing.map((w) => (
                  <span key={w} className="ats-chip ats-chip-no">
                    {w}
                  </span>
                ))}
                {result.missing.length === 0 && <div className="ats-empty">Nothing missing — nice work.</div>}
              </div>
            </div>
          </div>

          <p className="ats-disclaimer">
            This is a simple keyword-overlap check, not a simulation of any specific ATS software. Real applicant
            tracking systems vary widely in how they parse and rank resumes — use this as a rough guide, not a guarantee.
          </p>
        </div>
      )}
    </div>
  );
}
