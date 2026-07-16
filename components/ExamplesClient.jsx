"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEMPLATE_COMPONENTS } from "./PaperTemplates";
import { EXAMPLES } from "@/lib/data";

export default function ExamplesClient() {
  const [openId, setOpenId] = useState(EXAMPLES[0].id);
  const active = EXAMPLES.find((e) => e.id === openId);
  const Paper = TEMPLATE_COMPONENTS[active.template];

  return (
    <div className="page-shell">
      <div className="page-hero small">
        <h1>Resume Examples</h1>
        <p>A few real-shaped resumes across different fields, with notes on why they're built the way they are.</p>
      </div>
      <div className="examples-layout">
        <div className="examples-list">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              className={`examples-tab ${openId === ex.id ? "active" : ""}`}
              onClick={() => setOpenId(ex.id)}
            >
              {ex.label}
            </button>
          ))}
        </div>
        <div className="examples-detail">
          <div className="examples-preview">
            <div className="preview-shell">
              <Paper data={active.data} />
            </div>
          </div>
          <div className="examples-notes">
            <div className="examples-notes-title">Why this works</div>
            <ul className="examples-tips">
              {active.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <Link className="btn-primary" href={`/builder?example=${active.id}`}>
              Use as a starting point <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

