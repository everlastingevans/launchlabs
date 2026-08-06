import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "POPIA and Data Processing",
  description: "LaunchPath Labs POPIA and data-processing principles requiring professional review.",
  alternates: { canonical: "/popia" }
};

export default function PopiaPage() {
  return (
    <section className="container-px section-y pt-32">
      <SectionHeading eyebrow="Professional review required" title="POPIA and data processing" body="LaunchPath Labs is designed to handle founder and sponsor information responsibly. This page should be reviewed by a POPIA specialist before being treated as legal advice." />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {[
          ["Purpose limitation", "Information should be collected for application review, programme administration, reporting and relevant follow-up."],
          ["Confidentiality", "Founder business information should be handled with appropriate confidentiality and access controls."],
          ["Sponsor reporting", "Reporting should be aggregated or anonymised unless explicit founder consent has been obtained."],
          ["Retention", "Data retention periods should be documented and reviewed against legal and operational requirements."],
          ["Consent", "Media consent should remain separate and optional. Sponsor reporting consent should explain aggregate and anonymised reporting."],
          ["Security", "LaunchPath should use reasonable technical and organisational measures to protect submitted information."]
        ].map(([title, body]) => (
          <article key={title} className="card">
            <h2 className="text-xl font-semibold text-navy">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
