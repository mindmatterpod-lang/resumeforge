import BuilderClient from "@/components/BuilderClient";

export const metadata = {
  title: "Resume Builder",
  description: "Build your resume with a live preview and instant PDF export. 16 templates to choose from.",
  alternates: { canonical: "/builder" },
};

export default function BuilderPageRoute({ searchParams }) {
  return (
    <BuilderClient
      initialTemplate={searchParams?.template}
      initialExample={searchParams?.example}
      initialSavedId={searchParams?.savedId}
    />
  );
}
