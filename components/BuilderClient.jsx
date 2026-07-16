"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import { User, FileText, Briefcase, GraduationCap, Tag, Plus, Trash2, Download, Pencil, Eye, X, Save, FolderOpen, Copy } from "lucide-react";
import { Field, TextInput, TextArea, SectionShell, StrengthRing, TemplatePicker, PaperFormatToggle } from "./UI";
import { TEMPLATE_COMPONENTS } from "./PaperTemplates";
import { initialData, emptyExperience, emptyEducation, computeStrength, EXAMPLES } from "@/lib/data";
import { exportNodeToPdf, getDefaultPaperFormat } from "@/lib/pdf";
import { getSavedResume, saveResume } from "@/lib/storage";

function BuilderInner({ data, setData, template, setTemplate, savedResumeId, setSavedResumeId, resumeName, setResumeName }) {
  const [open, setOpen] = useState({
    personal: true,
    summary: false,
    experience: false,
    education: false,
    skills: false,
  });
  const [mobileView, setMobileView] = useState("edit");
  const [skillDraft, setSkillDraft] = useState("");
  const [exporting, setExporting] = useState(false);
  const printRef = useRef(null);

  const strength = useMemo(() => computeStrength(data), [data]);

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const updatePersonal = (field, value) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));

  const addExperience = () =>
    setData((d) => ({ ...d, experience: [...d.experience, emptyExperience()] }));
  const removeExperience = (id) =>
    setData((d) => ({ ...d, experience: d.experience.filter((e) => e.id !== id) }));
  const updateExperience = (id, field, value) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));

  const addEducation = () =>
    setData((d) => ({ ...d, education: [...d.education, emptyEducation()] }));
  const removeEducation = (id) =>
    setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== id) }));
  const updateEducation = (id, field, value) =>
    setData((d) => ({
      ...d,
      education: d.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));

  const addSkill = () => {
    const v = skillDraft.trim();
    if (v && !data.skills.includes(v)) {
      setData((d) => ({ ...d, skills: [...d.skills, v] }));
    }
    setSkillDraft("");
  };
  const removeSkill = (s) =>
    setData((d) => ({ ...d, skills: d.skills.filter((x) => x !== s) }));

  const [paperFormat, setPaperFormat] = useState("letter");
  useEffect(() => {
    setPaperFormat(getDefaultPaperFormat());
  }, []);

  const handleDownload = async () => {
    setExporting(true);
    try {
      const node = printRef.current.querySelector(".paper");
      const safeName = (data.personal.name || "resume").trim().replace(/\s+/g, "_") || "resume";
      await exportNodeToPdf(node, `${safeName}_Resume.pdf`, paperFormat);
    } catch (err) {
      console.error("PDF export failed, falling back to browser print:", err);
      window.print();
    } finally {
      setExporting(false);
    }
  };

  const [saveStatus, setSaveStatus] = useState("");

  const handleSave = () => {
    let name = resumeName;
    if (!name) {
      const suggested = data.personal.name ? `${data.personal.name} Resume` : "My Resume";
      const entered = window.prompt("Name this resume:", suggested);
      if (!entered) return; // cancelled
      name = entered.trim() || suggested;
    }
    const entry = saveResume({ id: savedResumeId, name, data, template });
    setSavedResumeId(entry.id);
    setResumeName(entry.name);
    setSaveStatus(`Saved ${new Date(entry.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
  };

  const handleSaveAsNew = () => {
    const suggested = data.personal.name ? `${data.personal.name} Resume (copy)` : "My Resume (copy)";
    const entered = window.prompt("Name this new copy:", suggested);
    if (!entered) return;
    const entry = saveResume({ id: null, name: entered.trim() || suggested, data, template });
    setSavedResumeId(entry.id);
    setResumeName(entry.name);
    setSaveStatus("Saved as a new copy");
  };

  const PaperView = TEMPLATE_COMPONENTS[template] || TEMPLATE_COMPONENTS.modern;

  return (
    <>
      {/* page header */}
      <div className="rb-topbar">
        <div>
          <div className="rb-page-title">{resumeName || "Resume Builder"}</div>
          <div className="rb-brand-sub">{saveStatus || "FORGE · SHAPE · SEND"}</div>
        </div>
        <div className="flex items-center gap-3">
          <StrengthRing value={strength} />
          <button className="btn-secondary" onClick={handleSave}>
            <Save size={15} />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button className="btn-primary" onClick={handleDownload} disabled={exporting}>
            <Download size={15} />
            <span className="hidden sm:inline">{exporting ? "Preparing…" : "Download PDF"}</span>
          </button>
        </div>
      </div>
      <div
        className="rb-body"
        style={{
          "--show-form": mobileView === "edit" ? "block" : "none",
          "--show-preview": mobileView === "preview" ? "block" : "none",
        }}
      >
        {/* FORM */}
        <div className="form-pane">
          <div className="saved-bar">
            <Link href="/my-resumes" className="saved-bar-link">
              <FolderOpen size={14} /> My saved resumes
            </Link>
            {savedResumeId && (
              <button className="saved-bar-link" onClick={handleSaveAsNew}>
                <Copy size={14} /> Save as new copy
              </button>
            )}
          </div>
          <div className="template-panel">
            <div className="template-panel-title">Template</div>
            <TemplatePicker value={template} onChange={setTemplate} />
            <div className="template-picker-legend">
              <span className="ats-dot ats-yes legend-dot" /> ATS-friendly &nbsp;&nbsp;
              <span className="ats-dot ats-no legend-dot" /> visual-first, may not parse cleanly in ATS software
            </div>
          </div>

          <div className="template-panel">
            <div className="template-panel-title">Paper size (for PDF download)</div>
            <PaperFormatToggle value={paperFormat} onChange={setPaperFormat} />
          </div>

          <SectionShell id="section-personal" icon={User} title="Personal info" subtitle="Name and how to reach you" open={open.personal} onToggle={() => toggle("personal")}>
            <Field label="Full name">
              <TextInput placeholder="Jane Alvarez" value={data.personal.name} onChange={(e) => updatePersonal("name", e.target.value)} />
            </Field>
            <Field label="Title / role">
              <TextInput placeholder="Product Designer" value={data.personal.title} onChange={(e) => updatePersonal("title", e.target.value)} />
            </Field>
            <div className="row-2">
              <Field label="Email">
                <TextInput placeholder="jane@email.com" value={data.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} />
              </Field>
              <Field label="Phone">
                <TextInput placeholder="(555) 010-2938" value={data.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} />
              </Field>
            </div>
            <div className="row-2">
              <Field label="Location">
                <TextInput placeholder="Denver, CO" value={data.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} />
              </Field>
              <Field label="Link">
                <TextInput placeholder="linkedin.com/in/jane" value={data.personal.link} onChange={(e) => updatePersonal("link", e.target.value)} />
              </Field>
            </div>
          </SectionShell>

          <SectionShell id="section-summary" icon={FileText} title="Summary" subtitle="Two or three sentences on what you bring" open={open.summary} onToggle={() => toggle("summary")}>
            <TextArea
              className="input-field textarea"
              placeholder="Product designer with 6 years building tools for outdoor and field-service teams. Known for turning messy workflows into simple, durable interfaces."
              value={data.summary}
              onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
            />
          </SectionShell>

          <SectionShell
            id="section-experience"
            icon={Briefcase}
            title="Experience"
            subtitle={`${data.experience.length} ${data.experience.length === 1 ? "role" : "roles"}`}
            open={open.experience}
            onToggle={() => toggle("experience")}
          >
            {data.experience.map((exp) => (
              <div className="entry-block" key={exp.id}>
                {data.experience.length > 1 && (
                  <button className="entry-remove" onClick={() => removeExperience(exp.id)} aria-label="Remove this role">
                    <Trash2 size={15} />
                  </button>
                )}
                <div className="row-2">
                  <Field label="Role">
                    <TextInput placeholder="Senior Designer" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} />
                  </Field>
                  <Field label="Company">
                    <TextInput placeholder="Ridgeline Co." value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                  </Field>
                </div>
                <div className="row-2">
                  <Field label="Start">
                    <TextInput placeholder="2022" value={exp.start} onChange={(e) => updateExperience(exp.id, "start", e.target.value)} />
                  </Field>
                  <Field label="End">
                    <TextInput
                      placeholder={exp.current ? "Present" : "2024"}
                      value={exp.end}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, "end", e.target.value)}
                    />
                  </Field>
                </div>
                <label className="flex items-center gap-2 mb-3 text-xs" style={{ color: "var(--mist)" }}>
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                  />
                  I currently work here
                </label>
                <Field label="Highlights (one per line)">
                  <TextArea
                    className="input-field textarea"
                    placeholder={"Led redesign of the field-inspection app, cutting task time 40%\nMentored 3 junior designers"}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  />
                </Field>
              </div>
            ))}
            <button className="add-btn" onClick={addExperience}>
              <Plus size={15} /> Add another role
            </button>
          </SectionShell>

          <SectionShell
            id="section-education"
            icon={GraduationCap}
            title="Education"
            subtitle={`${data.education.length} ${data.education.length === 1 ? "entry" : "entries"}`}
            open={open.education}
            onToggle={() => toggle("education")}
          >
            {data.education.map((edu) => (
              <div className="entry-block" key={edu.id}>
                {data.education.length > 1 && (
                  <button className="entry-remove" onClick={() => removeEducation(edu.id)} aria-label="Remove this school">
                    <Trash2 size={15} />
                  </button>
                )}
                <Field label="School">
                  <TextInput placeholder="University of Colorado" value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} />
                </Field>
                <div className="row-2">
                  <Field label="Degree">
                    <TextInput placeholder="B.A." value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                  </Field>
                  <Field label="Field of study">
                    <TextInput placeholder="Graphic Design" value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} />
                  </Field>
                </div>
                <div className="row-2">
                  <Field label="Start">
                    <TextInput placeholder="2016" value={edu.start} onChange={(e) => updateEducation(edu.id, "start", e.target.value)} />
                  </Field>
                  <Field label="End">
                    <TextInput placeholder="2020" value={edu.end} onChange={(e) => updateEducation(edu.id, "end", e.target.value)} />
                  </Field>
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={addEducation}>
              <Plus size={15} /> Add another school
            </button>
          </SectionShell>

          <SectionShell id="section-skills" icon={Tag} title="Skills" subtitle={`${data.skills.length} added`} open={open.skills} onToggle={() => toggle("skills")}>
            <div className="flex gap-2 mb-3">
              <TextInput
                placeholder="Type a skill and press Enter"
                value={skillDraft}
                onChange={(e) => setSkillDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <button className="btn-primary" style={{ padding: "9px 14px" }} onClick={addSkill} aria-label="Add skill">
                <Plus size={15} />
              </button>
            </div>
            <div>
              {data.skills.map((s) => (
                <span className="skill-chip" key={s}>
                  {s}
                  <button onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              {data.skills.length === 0 && (
                <div className="text-xs" style={{ color: "var(--mist)" }}>
                  No skills yet — add a few that match the roles you want.
                </div>
              )}
            </div>
          </SectionShell>
        </div>

        {/* PREVIEW */}
        <div className="preview-pane">
          <div className="preview-shell print-target" ref={printRef}>
            <PaperView data={data} />
          </div>
        </div>
      </div>

      {/* mobile tab bar */}
      <div className="mobile-tabbar">
        <button className={`tab-btn ${mobileView === "edit" ? "active" : ""}`} onClick={() => setMobileView("edit")}>
          <Pencil size={17} />
          Edit
        </button>
        <button className={`tab-btn ${mobileView === "preview" ? "active" : ""}`} onClick={() => setMobileView("preview")}>
          <Eye size={17} />
          Preview
        </button>
      </div>
    </>
  );
}

export default function BuilderClient({ initialTemplate, initialExample, initialSavedId }) {
  const [data, setData] = useState(() => {
    if (initialExample) {
      const ex = EXAMPLES.find((e) => e.id === initialExample);
      if (ex) return ex.data;
    }
    return initialData;
  });
  const [template, setTemplate] = useState(() => {
    if (initialExample) {
      const ex = EXAMPLES.find((e) => e.id === initialExample);
      if (ex) return ex.template;
    }
    if (initialTemplate && TEMPLATE_COMPONENTS[initialTemplate]) return initialTemplate;
    return "modern";
  });
  const [savedResumeId, setSavedResumeId] = useState(null);
  const [resumeName, setResumeName] = useState("");

  // Saved resumes live in this browser's localStorage, which only exists
  // client-side — so unlike the template/example params above (resolved on
  // the server), loading a saved resume has to happen after mount.
  useEffect(() => {
    if (!initialSavedId) return;
    const saved = getSavedResume(initialSavedId);
    if (saved) {
      setData(saved.data);
      setTemplate(saved.template);
      setSavedResumeId(saved.id);
      setResumeName(saved.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSavedId]);

  return (
    <BuilderInner
      data={data}
      setData={setData}
      template={template}
      setTemplate={setTemplate}
      savedResumeId={savedResumeId}
      setSavedResumeId={setSavedResumeId}
      resumeName={resumeName}
      setResumeName={setResumeName}
    />
  );
}
