import { Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import { formatRange } from "@/lib/data";

export function PaperModern({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-modern">
      <div className="pm-header">
        <h1 className="pm-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="pm-title">{personal.title}</div>}
        <div className="pm-contacts">
          {personal.email && (
            <span className="pm-contact">
              <Mail size={11} /> {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="pm-contact">
              <Phone size={11} /> {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="pm-contact">
              <MapPin size={11} /> {personal.location}
            </span>
          )}
          {personal.link && (
            <span className="pm-contact">
              <LinkIcon size={11} /> {personal.link}
            </span>
          )}
        </div>
      </div>

      {summary.trim() && (
        <section className="pm-section">
          <h2 className="pm-heading">Summary</h2>
          <p className="pm-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pm-section">
          <h2 className="pm-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pm-entry">
                  <div className="pm-entry-top">
                    <span className="pm-entry-title">
                      {e.role || "Role"}
                      {e.company && <span className="pm-entry-org"> · {e.company}</span>}
                    </span>
                    <span className="pm-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  {e.location && <div className="pm-entry-loc">{e.location}</div>}
                  {e.description.trim() && (
                    <ul className="pm-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pm-section">
          <h2 className="pm-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pm-entry">
                  <div className="pm-entry-top">
                    <span className="pm-entry-title">
                      {e.school}
                      {e.degree && <span className="pm-entry-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                    </span>
                    <span className="pm-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pm-section">
          <h2 className="pm-heading">Skills</h2>
          <div className="pm-skills">
            {skills.map((s, i) => (
              <span key={i} className="pm-skill-chip">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function PaperClassic({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-classic">
      <div className="pc-header">
        <h1 className="pc-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="pc-title">{personal.title}</div>}
        <div className="pc-contacts">
          {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("   |   ")}
        </div>
      </div>
      <div className="pc-rule" />

      {summary.trim() && (
        <section className="pc-section">
          <h2 className="pc-heading">Profile</h2>
          <p className="pc-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pc-section">
          <h2 className="pc-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pc-entry">
                  <div className="pc-entry-top">
                    <span className="pc-entry-title">{e.role || "Role"}</span>
                    <span className="pc-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  <div className="pc-entry-org">
                    {e.company}
                    {e.location ? `, ${e.location}` : ""}
                  </div>
                  {e.description.trim() && (
                    <ul className="pc-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pc-section">
          <h2 className="pc-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pc-entry">
                  <div className="pc-entry-top">
                    <span className="pc-entry-title">{e.school}</span>
                    <span className="pc-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                  {(e.degree || e.field) && (
                    <div className="pc-entry-org">
                      {e.degree}
                      {e.field ? `, ${e.field}` : ""}
                    </div>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pc-section">
          <h2 className="pc-heading">Skills</h2>
          <p className="pc-body">{skills.join("  ·  ")}</p>
        </section>
      )}
    </div>
  );
}

export function PaperMinimal({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-minimal">
      <div className="pmin-header">
        <h1 className="pmin-name">{personal.name || "Your Name"}</h1>
        <div className="pmin-contacts">
          {[personal.title, personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join(" | ")}
        </div>
      </div>

      {summary.trim() && (
        <section className="pmin-section">
          <h2 className="pmin-heading">Summary</h2>
          <p className="pmin-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pmin-section">
          <h2 className="pmin-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pmin-entry">
                  <div className="pmin-entry-top">
                    <span className="pmin-entry-title">
                      {e.role || "Role"}
                      {e.company ? `, ${e.company}` : ""}
                    </span>
                    <span className="pmin-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  {e.description.trim() && (
                    <ul className="pmin-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pmin-section">
          <h2 className="pmin-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pmin-entry">
                  <div className="pmin-entry-top">
                    <span className="pmin-entry-title">
                      {e.school}
                      {e.degree ? `, ${e.degree}` : ""}
                      {e.field ? ` (${e.field})` : ""}
                    </span>
                    <span className="pmin-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pmin-section">
          <h2 className="pmin-heading">Skills</h2>
          <p className="pmin-body">{skills.join(", ")}</p>
        </section>
      )}
    </div>
  );
}

export function PaperTimeline({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-timeline">
      <div className="pt-header">
        <h1 className="pt-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="pt-title">{personal.title}</div>}
        <div className="pt-contacts">
          {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("  ·  ")}
        </div>
      </div>

      {summary.trim() && (
        <section className="pt-section">
          <h2 className="pt-heading">Summary</h2>
          <p className="pt-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pt-section">
          <h2 className="pt-heading">Experience</h2>
          <div className="pt-line">
            {experience.map(
              (e) =>
                (e.role || e.company) && (
                  <div key={e.id} className="pt-item">
                    <div className="pt-dot" />
                    <div className="pt-item-top">
                      <span className="pt-item-title">
                        {e.role || "Role"}
                        {e.company && <span className="pt-item-org"> · {e.company}</span>}
                      </span>
                      <span className="pt-item-date">{formatRange(e.start, e.end, e.current)}</span>
                    </div>
                    {e.description.trim() && (
                      <ul className="pt-bullets">
                        {e.description
                          .split("\n")
                          .map((l) => l.trim())
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                )
            )}
          </div>
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pt-section">
          <h2 className="pt-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pt-entry">
                  <div className="pt-item-top">
                    <span className="pt-item-title">
                      {e.school}
                      {e.degree && <span className="pt-item-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                    </span>
                    <span className="pt-item-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pt-section">
          <h2 className="pt-heading">Skills</h2>
          <div className="pt-skills">
            {skills.map((s, i) => (
              <span key={i} className="pt-skill-chip">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function PaperBold({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-bold">
      <div className="pb-banner">
        <h1 className="pb-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="pb-title">{personal.title}</div>}
        <div className="pb-contacts">
          {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("   ·   ")}
        </div>
      </div>
      <div className="pb-content">
        {summary.trim() && (
          <section className="pb-section">
            <h2 className="pb-heading">Summary</h2>
            <p className="pb-body">{summary}</p>
          </section>
        )}

        {experience.some((e) => e.role || e.company) && (
          <section className="pb-section">
            <h2 className="pb-heading">Experience</h2>
            {experience.map(
              (e) =>
                (e.role || e.company) && (
                  <div key={e.id} className="pb-entry">
                    <div className="pb-entry-top">
                      <span className="pb-entry-title">
                        {e.role || "Role"}
                        {e.company && <span className="pb-entry-org"> · {e.company}</span>}
                      </span>
                      <span className="pb-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                    </div>
                    {e.description.trim() && (
                      <ul className="pb-bullets">
                        {e.description
                          .split("\n")
                          .map((l) => l.trim())
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                )
            )}
          </section>
        )}

        {education.some((e) => e.school) && (
          <section className="pb-section">
            <h2 className="pb-heading">Education</h2>
            {education.map(
              (e) =>
                e.school && (
                  <div key={e.id} className="pb-entry">
                    <div className="pb-entry-top">
                      <span className="pb-entry-title">
                        {e.school}
                        {e.degree && <span className="pb-entry-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                      </span>
                      <span className="pb-entry-date">{formatRange(e.start, e.end, false)}</span>
                    </div>
                  </div>
                )
            )}
          </section>
        )}

        {skills.length > 0 && (
          <section className="pb-section">
            <h2 className="pb-heading">Skills</h2>
            <div className="pb-skills">
              {skills.map((s, i) => (
                <span key={i} className="pb-skill-chip">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function PaperSidebar({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-sidebar">
      <div className="ps-side">
        <h1 className="ps-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="ps-title">{personal.title}</div>}
        <div className="ps-block">
          <h3 className="ps-heading">Contact</h3>
          {personal.email && <div className="ps-line">{personal.email}</div>}
          {personal.phone && <div className="ps-line">{personal.phone}</div>}
          {personal.location && <div className="ps-line">{personal.location}</div>}
          {personal.link && <div className="ps-line">{personal.link}</div>}
        </div>
        {skills.length > 0 && (
          <div className="ps-block">
            <h3 className="ps-heading">Skills</h3>
            {skills.map((s, i) => (
              <div key={i} className="ps-line">
                {s}
              </div>
            ))}
          </div>
        )}
        {education.some((e) => e.school) && (
          <div className="ps-block">
            <h3 className="ps-heading">Education</h3>
            {education.map(
              (e) =>
                e.school && (
                  <div key={e.id} className="ps-edu">
                    <div className="ps-edu-school">{e.school}</div>
                    {(e.degree || e.field) && (
                      <div className="ps-line">
                        {e.degree}
                        {e.field ? `, ${e.field}` : ""}
                      </div>
                    )}
                    <div className="ps-line-muted">{formatRange(e.start, e.end, false)}</div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <div className="ps-main">
        {summary.trim() && (
          <section className="ps-section">
            <h2 className="ps-mheading">Summary</h2>
            <p className="ps-body">{summary}</p>
          </section>
        )}

        {experience.some((e) => e.role || e.company) && (
          <section className="ps-section">
            <h2 className="ps-mheading">Experience</h2>
            {experience.map(
              (e) =>
                (e.role || e.company) && (
                  <div key={e.id} className="ps-entry">
                    <div className="ps-entry-top">
                      <span className="ps-entry-title">
                        {e.role || "Role"}
                        {e.company && <span className="ps-entry-org"> · {e.company}</span>}
                      </span>
                      <span className="ps-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                    </div>
                    {e.description.trim() && (
                      <ul className="ps-bullets">
                        {e.description
                          .split("\n")
                          .map((l) => l.trim())
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                )
            )}
          </section>
        )}
      </div>
    </div>
  );
}

function getInitials(name) {
  if (!name || !name.trim()) return "YN";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// ---------- Compact ----------
export function PaperCompact({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-compact">
      <div className="pcp-header">
        <h1 className="pcp-name">{personal.name || "Your Name"}</h1>
        <div className="pcp-contacts">
          {[personal.title, personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join(" · ")}
        </div>
      </div>

      {summary.trim() && (
        <section className="pcp-section">
          <h2 className="pcp-heading">Summary</h2>
          <p className="pcp-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pcp-section">
          <h2 className="pcp-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pcp-entry">
                  <div className="pcp-entry-top">
                    <span className="pcp-entry-title">
                      {e.role || "Role"}
                      {e.company && <span className="pcp-entry-org"> · {e.company}</span>}
                    </span>
                    <span className="pcp-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  {e.description.trim() && (
                    <ul className="pcp-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pcp-section">
          <h2 className="pcp-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pcp-entry">
                  <div className="pcp-entry-top">
                    <span className="pcp-entry-title">
                      {e.school}
                      {e.degree && <span className="pcp-entry-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                    </span>
                    <span className="pcp-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pcp-section">
          <h2 className="pcp-heading">Skills</h2>
          <p className="pcp-body">{skills.join(" · ")}</p>
        </section>
      )}
    </div>
  );
}

// ---------- Executive ----------
export function PaperExecutive({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-executive">
      <div className="pex-header">
        <h1 className="pex-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="pex-title">{personal.title}</div>}
      </div>
      <div className="pex-rule" />
      <div className="pex-contacts">
        {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("   •   ")}
      </div>

      {summary.trim() && (
        <section className="pex-section">
          <h2 className="pex-heading">Executive Summary</h2>
          <p className="pex-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pex-section">
          <h2 className="pex-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pex-entry">
                  <div className="pex-entry-top">
                    <span className="pex-entry-title">{e.role || "Role"}</span>
                    <span className="pex-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  <div className="pex-entry-org">
                    {e.company}
                    {e.location ? `, ${e.location}` : ""}
                  </div>
                  {e.description.trim() && (
                    <ul className="pex-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pex-section">
          <h2 className="pex-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pex-entry">
                  <div className="pex-entry-top">
                    <span className="pex-entry-title">{e.school}</span>
                    <span className="pex-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                  {(e.degree || e.field) && (
                    <div className="pex-entry-org">
                      {e.degree}
                      {e.field ? `, ${e.field}` : ""}
                    </div>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pex-section">
          <h2 className="pex-heading">Core Competencies</h2>
          <p className="pex-body">{skills.join("   •   ")}</p>
        </section>
      )}
    </div>
  );
}

// ---------- Accent Bar ----------
export function PaperAccentBar({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-accent-bar">
      <div className="pab-header">
        <h1 className="pab-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="pab-title">{personal.title}</div>}
        <div className="pab-contacts">
          {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("   ·   ")}
        </div>
      </div>

      {summary.trim() && (
        <section className="pab-section">
          <h2 className="pab-heading">Summary</h2>
          <p className="pab-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pab-section">
          <h2 className="pab-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pab-entry">
                  <div className="pab-entry-top">
                    <span className="pab-entry-title">
                      {e.role || "Role"}
                      {e.company && <span className="pab-entry-org"> · {e.company}</span>}
                    </span>
                    <span className="pab-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  {e.description.trim() && (
                    <ul className="pab-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pab-section">
          <h2 className="pab-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pab-entry">
                  <div className="pab-entry-top">
                    <span className="pab-entry-title">
                      {e.school}
                      {e.degree && <span className="pab-entry-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                    </span>
                    <span className="pab-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pab-section">
          <h2 className="pab-heading">Skills</h2>
          <div className="pab-skills">
            {skills.map((s, i) => (
              <span key={i} className="pab-skill-chip">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ---------- Skills First ----------
export function PaperSkillsFirst({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-skills-first">
      <div className="psf-header">
        <h1 className="psf-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="psf-title">{personal.title}</div>}
        <div className="psf-contacts">
          {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("   ·   ")}
        </div>
      </div>

      {(summary.trim() || skills.length > 0) && (
        <div className="psf-highlight">
          {summary.trim() && <p className="psf-summary">{summary}</p>}
          {skills.length > 0 && (
            <div className="psf-skills">
              {skills.map((s, i) => (
                <span key={i} className="psf-skill-chip">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="psf-section">
          <h2 className="psf-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="psf-entry">
                  <div className="psf-entry-top">
                    <span className="psf-entry-title">
                      {e.role || "Role"}
                      {e.company && <span className="psf-entry-org"> · {e.company}</span>}
                    </span>
                    <span className="psf-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  {e.description.trim() && (
                    <ul className="psf-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="psf-section">
          <h2 className="psf-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="psf-entry">
                  <div className="psf-entry-top">
                    <span className="psf-entry-title">
                      {e.school}
                      {e.degree && <span className="psf-entry-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                    </span>
                    <span className="psf-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}
    </div>
  );
}

// ---------- Corporate Grid ----------
export function PaperCorporateGrid({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-corporate-grid">
      <div className="pcg-header">
        <h1 className="pcg-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="pcg-title">{personal.title}</div>}
        <div className="pcg-contacts">
          {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("   ·   ")}
        </div>
      </div>

      {summary.trim() && (
        <section className="pcg-section">
          <h2 className="pcg-heading">Summary</h2>
          <p className="pcg-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pcg-section">
          <h2 className="pcg-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pcg-entry-grid">
                  <div className="pcg-entry-main">
                    <div className="pcg-entry-title">{e.role || "Role"}</div>
                    <div className="pcg-entry-org">
                      {e.company}
                      {e.location ? `, ${e.location}` : ""}
                    </div>
                    {e.description.trim() && (
                      <ul className="pcg-bullets">
                        {e.description
                          .split("\n")
                          .map((l) => l.trim())
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                  <div className="pcg-entry-date">{formatRange(e.start, e.end, e.current)}</div>
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pcg-section">
          <h2 className="pcg-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pcg-entry-grid">
                  <div className="pcg-entry-main">
                    <div className="pcg-entry-title">{e.school}</div>
                    {(e.degree || e.field) && (
                      <div className="pcg-entry-org">
                        {e.degree}
                        {e.field ? `, ${e.field}` : ""}
                      </div>
                    )}
                  </div>
                  <div className="pcg-entry-date">{formatRange(e.start, e.end, false)}</div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pcg-section">
          <h2 className="pcg-heading">Skills</h2>
          <p className="pcg-body">{skills.join(", ")}</p>
        </section>
      )}
    </div>
  );
}

// ---------- Elegant Serif ----------
export function PaperElegantSerif({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-elegant-serif">
      <div className="pes-header">
        <h1 className="pes-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="pes-title">{personal.title}</div>}
        <div className="pes-contacts">
          {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("  ·  ")}
        </div>
      </div>

      {summary.trim() && (
        <section className="pes-section">
          <h2 className="pes-heading">Summary</h2>
          <p className="pes-body">{summary}</p>
          <div className="pes-hr" />
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pes-section">
          <h2 className="pes-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pes-entry">
                  <div className="pes-entry-top">
                    <span className="pes-entry-title">{e.role || "Role"}</span>
                    <span className="pes-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  <div className="pes-entry-org">
                    {e.company}
                    {e.location ? `, ${e.location}` : ""}
                  </div>
                  {e.description.trim() && (
                    <ul className="pes-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
          <div className="pes-hr" />
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pes-section">
          <h2 className="pes-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pes-entry">
                  <div className="pes-entry-top">
                    <span className="pes-entry-title">{e.school}</span>
                    <span className="pes-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                  {(e.degree || e.field) && (
                    <div className="pes-entry-org">
                      {e.degree}
                      {e.field ? `, ${e.field}` : ""}
                    </div>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pes-section">
          <h2 className="pes-heading">Skills</h2>
          <p className="pes-body">{skills.join("  ·  ")}</p>
        </section>
      )}
    </div>
  );
}

// ---------- Developer Mono ----------
export function PaperDeveloperMono({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-developer-mono">
      <div className="pdm-header">
        <div className="pdm-comment">{"// "}{personal.name || "Your Name"}</div>
        {personal.title && <div className="pdm-title">{personal.title}</div>}
        <div className="pdm-contacts">
          {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("  |  ")}
        </div>
      </div>

      {summary.trim() && (
        <section className="pdm-section">
          <h2 className="pdm-heading">## summary</h2>
          <p className="pdm-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pdm-section">
          <h2 className="pdm-heading">## experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pdm-entry">
                  <div className="pdm-entry-top">
                    <span className="pdm-entry-title">
                      {e.role || "Role"}
                      {e.company && <span className="pdm-entry-org"> @ {e.company}</span>}
                    </span>
                    <span className="pdm-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  {e.description.trim() && (
                    <ul className="pdm-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{"> "}{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pdm-section">
          <h2 className="pdm-heading">## education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pdm-entry">
                  <div className="pdm-entry-top">
                    <span className="pdm-entry-title">
                      {e.school}
                      {e.degree && <span className="pdm-entry-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                    </span>
                    <span className="pdm-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pdm-section">
          <h2 className="pdm-heading">## skills</h2>
          <p className="pdm-body pdm-skills-line">[{skills.join(", ")}]</p>
        </section>
      )}
    </div>
  );
}

// ---------- Newspaper ----------
export function PaperNewspaper({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-newspaper">
      <div className="pnp-header">
        <h1 className="pnp-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="pnp-title">{personal.title}</div>}
      </div>
      <div className="pnp-rule-thick" />
      <div className="pnp-rule-thin" />
      <div className="pnp-contacts">
        {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("   ·   ")}
      </div>

      {summary.trim() && (
        <section className="pnp-section">
          <h2 className="pnp-heading">Summary</h2>
          <p className="pnp-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pnp-section">
          <h2 className="pnp-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pnp-entry">
                  <div className="pnp-entry-top">
                    <span className="pnp-entry-title">
                      {e.role || "Role"}
                      {e.company && <span className="pnp-entry-org"> · {e.company}</span>}
                    </span>
                    <span className="pnp-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  {e.description.trim() && (
                    <ul className="pnp-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pnp-section">
          <h2 className="pnp-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pnp-entry">
                  <div className="pnp-entry-top">
                    <span className="pnp-entry-title">
                      {e.school}
                      {e.degree && <span className="pnp-entry-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                    </span>
                    <span className="pnp-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pnp-section">
          <h2 className="pnp-heading">Skills</h2>
          <p className="pnp-body">{skills.join(" · ")}</p>
        </section>
      )}
    </div>
  );
}

// ---------- Skill Bars ----------
export function PaperSkillBars({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-skill-bars">
      <div className="psb-header">
        <h1 className="psb-name">{personal.name || "Your Name"}</h1>
        {personal.title && <div className="psb-title">{personal.title}</div>}
        <div className="psb-contacts">
          {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("   ·   ")}
        </div>
      </div>

      {summary.trim() && (
        <section className="psb-section">
          <h2 className="psb-heading">Summary</h2>
          <p className="psb-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="psb-section">
          <h2 className="psb-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="psb-entry">
                  <div className="psb-entry-top">
                    <span className="psb-entry-title">
                      {e.role || "Role"}
                      {e.company && <span className="psb-entry-org"> · {e.company}</span>}
                    </span>
                    <span className="psb-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  {e.description.trim() && (
                    <ul className="psb-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="psb-section">
          <h2 className="psb-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="psb-entry">
                  <div className="psb-entry-top">
                    <span className="psb-entry-title">
                      {e.school}
                      {e.degree && <span className="psb-entry-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                    </span>
                    <span className="psb-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="psb-section">
          <h2 className="psb-heading">Skills</h2>
          <div className="psb-skill-list">
            {skills.map((s, i) => (
              <div key={i} className="psb-skill-row">
                <span className="psb-skill-name">{s}</span>
                <div className="psb-skill-track">
                  <div className="psb-skill-fill" style={{ width: `${88 - (i % 3) * 6}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ---------- Initials Badge ----------
export function PaperInitialsBadge({ data }) {
  const { personal, summary, experience, education, skills } = data;
  return (
    <div className="paper paper-initials-badge">
      <div className="pib-header">
        <div className="pib-badge">{getInitials(personal.name)}</div>
        <div>
          <h1 className="pib-name">{personal.name || "Your Name"}</h1>
          {personal.title && <div className="pib-title">{personal.title}</div>}
          <div className="pib-contacts">
            {[personal.email, personal.phone, personal.location, personal.link].filter(Boolean).join("   ·   ")}
          </div>
        </div>
      </div>

      {summary.trim() && (
        <section className="pib-section">
          <h2 className="pib-heading">Summary</h2>
          <p className="pib-body">{summary}</p>
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="pib-section">
          <h2 className="pib-heading">Experience</h2>
          {experience.map(
            (e) =>
              (e.role || e.company) && (
                <div key={e.id} className="pib-entry">
                  <div className="pib-entry-top">
                    <span className="pib-entry-title">
                      {e.role || "Role"}
                      {e.company && <span className="pib-entry-org"> · {e.company}</span>}
                    </span>
                    <span className="pib-entry-date">{formatRange(e.start, e.end, e.current)}</span>
                  </div>
                  {e.description.trim() && (
                    <ul className="pib-bullets">
                      {e.description
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="pib-section">
          <h2 className="pib-heading">Education</h2>
          {education.map(
            (e) =>
              e.school && (
                <div key={e.id} className="pib-entry">
                  <div className="pib-entry-top">
                    <span className="pib-entry-title">
                      {e.school}
                      {e.degree && <span className="pib-entry-org"> · {e.degree}{e.field ? `, ${e.field}` : ""}</span>}
                    </span>
                    <span className="pib-entry-date">{formatRange(e.start, e.end, false)}</span>
                  </div>
                </div>
              )
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section className="pib-section">
          <h2 className="pib-heading">Skills</h2>
          <div className="pib-skills">
            {skills.map((s, i) => (
              <span key={i} className="pib-skill-chip">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export const TEMPLATE_COMPONENTS = {
  modern: PaperModern,
  classic: PaperClassic,
  minimal: PaperMinimal,
  timeline: PaperTimeline,
  bold: PaperBold,
  sidebar: PaperSidebar,
  compact: PaperCompact,
  executive: PaperExecutive,
  "accent-bar": PaperAccentBar,
  "skills-first": PaperSkillsFirst,
  "corporate-grid": PaperCorporateGrid,
  "elegant-serif": PaperElegantSerif,
  "developer-mono": PaperDeveloperMono,
  newspaper: PaperNewspaper,
  "skill-bars": PaperSkillBars,
  "initials-badge": PaperInitialsBadge,
};
