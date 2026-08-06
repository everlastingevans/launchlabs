import type { Metadata } from "next";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "LaunchPath Labs privacy policy requiring professional legal review.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <section className="container-px section-y pt-32">
      <SectionHeading eyebrow="Legal review required" title="Privacy policy" body="This page provides practical privacy language for the website and should be reviewed by a qualified South African legal professional before reliance." />
      <div className="mt-10 grid gap-6 text-sm leading-7 text-slate">
        <p>LaunchPath collects information submitted through founder, sponsor and contact forms for enquiry handling, application review, programme administration and reporting where applicable.</p>
        <p>Information may include contact details, business information, readiness responses, consent records and communication history. LaunchPath should store this information securely and restrict access to people who need it for legitimate programme purposes.</p>
        <p>LaunchPath should not sell personal information. Sponsor reporting should be aggregated or anonymised unless explicit founder consent has been obtained.</p>
        <p>Retention periods, data subject rights, operator agreements and cross-border processing arrangements require professional legal review.</p>
        <LegalDisclaimer />
      </div>
    </section>
  );
}
