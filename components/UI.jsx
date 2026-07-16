import { ChevronDown } from "lucide-react";
import { TEMPLATES } from "@/lib/data";

// Shared presentational pieces used by the interactive (client) pages.
// These files aren't marked "use client" themselves — they only ever get
// rendered inside components that already are, so they ride along in the
// same client bundle. See components/BuilderClient.jsx for the boundary.

export function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs font-semibold tracking-wide uppercase mb-1.5" style={{ color: "var(--mist)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

export function TextInput(props) {
  return <input {...props} className="input-field" />;
}

export function TextArea(props) {
  return <textarea {...props} className="input-field" />;
}

export function SectionShell({ id, icon: Icon, title, subtitle, open, onToggle, children, badge }) {
  const panelId = id ? `${id}-panel` : undefined;
  const buttonId = id ? `${id}-trigger` : undefined;
  return (
    <div className="section-card">
      <button
        type="button"
        id={buttonId}
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <div className="section-icon" aria-hidden="true">
          <Icon size={16} strokeWidth={2.2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[15px]" style={{ color: "var(--paper)" }}>
              {title}
            </span>
            {badge}
          </div>
          {subtitle && (
            <div className="text-xs mt-0.5" style={{ color: "var(--mist)" }}>
              {subtitle}
            </div>
          )}
        </div>
        <ChevronDown
          size={18}
          aria-hidden="true"
          style={{
            color: "var(--mist)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 180ms ease",
          }}
        />
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={buttonId} className="px-4 pb-4 pt-1 section-body">
          {children}
        </div>
      )}
    </div>
  );
}

export function StrengthRing({ value, label = "Resume strength", captions = ["Just getting started", "Coming together", "Trail ready"] }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = value < 40 ? "#C6693A" : value < 75 ? "var(--gold)" : "var(--sage)";
  const captionText = value < 40 ? captions[0] : value < 75 ? captions[1] : captions[2];
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <svg width="48" height="48" viewBox="0 0 48 48" role="img" aria-label={`${label}: ${value} out of 100, ${captionText}`}>
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 24 24)"
          style={{ transition: "stroke-dashoffset 400ms ease, stroke 400ms ease" }}
        />
        <text x="24" y="28" textAnchor="middle" fontSize="13" fontFamily="'IBM Plex Mono', monospace" fill="var(--paper)" fontWeight="600" aria-hidden="true">
          {value}
        </text>
      </svg>
      <div className="hidden sm:block leading-tight" aria-hidden="true">
        <div className="text-[13px] font-semibold" style={{ color: "var(--paper)" }}>
          {label}
        </div>
        <div className="text-[11px]" style={{ color: "var(--mist)" }}>
          {captionText}
        </div>
      </div>
    </div>
  );
}

export function PaperFormatToggle({ value, onChange }) {
  return (
    <div className="paper-format-toggle" role="group" aria-label="Paper size">
      <button
        type="button"
        className={value === "letter" ? "active" : ""}
        onClick={() => onChange("letter")}
        title="8.5 x 11 in — standard in the US and Canada"
      >
        US Letter
      </button>
      <button
        type="button"
        className={value === "a4" ? "active" : ""}
        onClick={() => onChange("a4")}
        title="210 x 297 mm — standard nearly everywhere else"
      >
        A4
      </button>
    </div>
  );
}
export function TemplatePicker({ value, onChange }) {
  return (
    <div className="template-picker">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`template-chip ${value === t.id ? "active" : ""}`}
          onClick={() => onChange(t.id)}
          title={t.ats ? "ATS-friendly" : "Best for visual review; multi-column layouts can confuse ATS parsers"}
        >
          <span className={`ats-dot ${t.ats ? "ats-yes" : "ats-no"}`} />
          {t.label}
        </button>
      ))}
    </div>
  );
}
