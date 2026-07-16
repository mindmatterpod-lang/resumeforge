import ExamplesClient from "@/components/ExamplesClient";

export const metadata = {
  title: "Resume Examples by Role",
  description:
    "See filled-out resume examples for a product designer, software engineer, retail store manager, and registered nurse, with notes on why each works.",
  alternates: { canonical: "/examples" },
};

export default function ExamplesPageRoute() {
  return <ExamplesClient />;
}
