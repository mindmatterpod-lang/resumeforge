import ATSCheckerClient from "@/components/ATSCheckerClient";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Free ATS Resume Checker — Keyword Match Score",
  description:
    "Paste your resume and a job description to see how many key terms overlap, with a keyword match score and suggestions for what's missing.",
  alternates: { canonical: "/ats-checker" },
};

export default function ATSCheckerPageRoute() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ATS Resume Checker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (web browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ATSCheckerClient />
    </>
  );
}
