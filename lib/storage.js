// Client-only. No account, no server — resumes are saved in this browser's
// localStorage under one namespaced key. That means they're tied to this
// browser/device and will disappear if the user clears site data; the UI
// that uses this should say so plainly rather than implying real backup.

const STORAGE_KEY = "resumeforge:saved-resumes";

function readAll() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Could not read saved resumes from localStorage:", err);
    return [];
  }
}

function writeAll(list) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    // Most likely storage is full or disabled (private browsing in some
    // browsers). Fail quietly rather than crashing the builder.
    console.warn("Could not save resume — storage may be full or disabled:", err);
  }
}

export function listSavedResumes() {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getSavedResume(id) {
  return readAll().find((r) => r.id === id) || null;
}

export function saveResume({ id, name, data, template }) {
  const list = readAll();
  const now = Date.now();

  if (id) {
    const idx = list.findIndex((r) => r.id === id);
    if (idx !== -1) {
      const updated = { ...list[idx], name, data, template, updatedAt: now };
      list[idx] = updated;
      writeAll(list);
      return updated;
    }
  }

  const entry = {
    id: `resume_${now}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    data,
    template,
    createdAt: now,
    updatedAt: now,
  };
  list.push(entry);
  writeAll(list);
  return entry;
}

export function deleteResume(id) {
  writeAll(readAll().filter((r) => r.id !== id));
}
