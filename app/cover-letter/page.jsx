import CoverLetterClient from "@/components/CoverLetterClient";

export const metadata = {
  title: "Cover Letter Builder",
  description: "Build a matching cover letter with a live preview and one-click PDF export.",
  alternates: { canonical: "/cover-letter" },
};

export default function CoverLetterPageRoute() {
  return <CoverLetterClient />;
}
