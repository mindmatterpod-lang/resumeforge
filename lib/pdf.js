// Client-only helper. Dynamically imports html2canvas/jsPDF so they never
// end up in a server bundle or run during server rendering.

// html2canvas snapshots the DOM as soon as it's called, even if a web font
// is mid-swap. That mismatch between the fallback font used in the snapshot
// and the real font that renders a moment later is what causes dates/labels
// to look shifted or "unaligned" in exported PDFs. Waiting on
// document.fonts.ready (plus a couple of animation frames for layout to
// settle after the swap) fixes that at the source.
async function waitForFonts() {
  if (typeof document === "undefined") return;
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch (err) {
    // Non-fatal — worst case the export proceeds with whatever font state
    // the browser is in.
  }
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

// The .paper element has a min-height so short resumes still look like a
// full page on screen. Left alone, that same min-height gets captured
// verbatim and can push a genuinely one-page resume's image just over a
// PDF page's height by a few pixels, spawning an almost-blank second page.
// Trimming trailing near-white rows fixes that and also makes short resumes
// export as a compact one-pager instead of a mostly empty page.
function trimTrailingWhitespace(canvas) {
  try {
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    if (!width || !height) return canvas;
    const imageData = ctx.getImageData(0, 0, width, height).data;
    const columnStep = 4; // sample every 4th column — plenty for this purpose, much faster
    let lastContentRow = 0;
    for (let y = height - 1; y >= 0; y--) {
      const rowStart = y * width * 4;
      let hasContent = false;
      for (let x = 0; x < width; x += columnStep) {
        const idx = rowStart + x * 4;
        const r = imageData[idx];
        const g = imageData[idx + 1];
        const b = imageData[idx + 2];
        const a = imageData[idx + 3];
        if (a > 10 && (r < 248 || g < 248 || b < 248)) {
          hasContent = true;
          break;
        }
      }
      if (hasContent) {
        lastContentRow = y;
        break;
      }
    }
    const bottomPadding = Math.round(height * 0.015);
    const trimmedHeight = Math.min(height, lastContentRow + bottomPadding);
    if (trimmedHeight >= height - 2) return canvas; // nothing meaningful to trim

    const trimmed = document.createElement("canvas");
    trimmed.width = width;
    trimmed.height = trimmedHeight;
    trimmed.getContext("2d").drawImage(canvas, 0, 0);
    return trimmed;
  } catch (err) {
    // getImageData can throw on a tainted canvas (e.g. a cross-origin image
    // slipped in somewhere). Fall back to the untrimmed canvas rather than
    // failing the whole export over a cosmetic improvement.
    console.warn("Could not trim PDF whitespace, exporting untrimmed:", err);
    return canvas;
  }
}

// Letter paper is the norm in the US and Canada; nearly everywhere else (and
// any locale we don't recognize) defaults to A4, so this gives a sensible
// starting point without forcing anyone to know which one they need.
export function getDefaultPaperFormat() {
  if (typeof navigator === "undefined") return "letter";
  const region = (navigator.language || "").split("-")[1];
  return region === "US" || region === "CA" ? "letter" : "a4";
}

export async function exportNodeToPdf(node, filename, pageFormat = "letter") {
  const { default: html2canvas } = await import("html2canvas");
  const { jsPDF } = await import("jspdf");

  await waitForFonts();

  // scale: 3 renders at roughly 220 DPI at Letter width, well above the
  // ~96-150 DPI that causes visibly soft/blurry text and rules in a
  // print-quality PDF, without the file size ballooning too much further.
  let canvas = await html2canvas(node, {
    scale: 3,
    backgroundColor: "#ffffff",
    useCORS: true,
  });

  canvas = trimTrailingWhitespace(canvas);

  const imgData = canvas.toDataURL("image/png");
  // jsPDF accepts "letter" or "a4" directly and sizes the page accordingly —
  // Letter (8.5x11in) is the US/Canada norm, A4 is standard nearly
  // everywhere else, and the two aren't interchangeable: a Letter PDF
  // printed on an A4 tray (or vice versa) gets cropped or oddly margined.
  const pdf = new jsPDF({ unit: "pt", format: pageFormat === "a4" ? "a4" : "letter" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // A small margin instead of edge-to-edge bleed both looks like a normal
  // printed page and, since it slightly shrinks the placed image, gives a
  // borderline one-pager a bit more headroom to actually fit on one page.
  const margin = 28;
  const contentWidth = pageWidth - margin * 2;
  const contentHeight = pageHeight - margin * 2;
  const imgWidth = contentWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight <= contentHeight + 1) {
    pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
  } else {
    let heightLeft = imgHeight;
    let page = 0;
    pdf.addImage(imgData, "PNG", margin, margin - page * contentHeight, imgWidth, imgHeight);
    heightLeft -= contentHeight;
    while (heightLeft > 0) {
      page += 1;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, margin - page * contentHeight, imgWidth, imgHeight);
      heightLeft -= contentHeight;
    }
  }

  pdf.save(filename);
}
