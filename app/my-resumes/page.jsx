import SavedResumesClient from "@/components/SavedResumesClient";

export const metadata = {
  title: "My Saved Resumes",
  description: "Resumes you've saved in this browser. Edit them anytime or download a fresh PDF.",
  alternates: { canonical: "/my-resumes" },
  robots: { index: false, follow: true },
};

export default function MyResumesPageRoute() {
  return <SavedResumesClient />;
}
