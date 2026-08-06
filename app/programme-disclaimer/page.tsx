import type { Metadata } from "next";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { SectionHeading } from "@/components/section-heading";
import { notPromised } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Programme Disclaimer",
  description: "LaunchPath Labs programme disclaimer and non-guarantee statement.",
  alternates: { canonical: "/programme-disclaimer" }
};

export default function ProgrammeDisclaimerPage() {
  return (
    <section className="container-px section-y pt-32">
      <SectionHeading title="Programme disclaimer" body="LaunchPath Labs focuses on measurable progress rather than promises." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {notPromised.map((item) => (
          <div key={item} className="rounded-md border border-line bg-white p-4 text-sm font-semibold text-navy shadow-card">No guarantee of {item.toLowerCase()}</div>
        ))}
      </div>
      <div className="mt-10">
        <LegalDisclaimer />
      </div>
    </section>
  );
}
