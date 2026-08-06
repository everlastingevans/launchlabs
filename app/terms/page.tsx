import type { Metadata } from "next";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "LaunchPath Labs website terms requiring professional legal review.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <section className="container-px section-y pt-32">
      <SectionHeading eyebrow="Legal review required" title="Terms of use" body="These terms are placeholder operating terms for website use and programme enquiries. They require professional legal review before publication as final terms." />
      <div className="mt-10 grid gap-6 text-sm leading-7 text-slate">
        <p>Use of this website does not create a participant, sponsor, advisory, employment, investment or procurement relationship with LaunchPath.</p>
        <p>Submitting a founder application or sponsor enquiry does not guarantee acceptance, funding, procurement, investment, customers, revenue, job creation or business success.</p>
        <p>LaunchPath owns the LaunchPath Labs curriculum, programme materials, methodology and operating documents. Founders retain ownership of their businesses, ideas and intellectual property.</p>
        <p>Website content may be updated as programme design, cohort availability and sponsor arrangements change.</p>
        <LegalDisclaimer />
      </div>
    </section>
  );
}
