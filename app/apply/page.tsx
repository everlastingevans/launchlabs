import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { FounderApplicationForm } from "@/components/forms/founder-application-form";
import { formatCurrency, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply or register interest for the LaunchPath Labs 12-week online founder accelerator.",
  alternates: { canonical: "/apply" }
};

export default function ApplyPage() {
  return (
    <>
      <section className="navy-panel brand-dots pt-32">
        <div className="container-px py-16 lg:py-24">
          <p className="eyebrow border-white/15 bg-white/10 text-lime">Apply</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {siteConfig.cohort.applicationsOpen ? siteConfig.ctas.founderOpen : siteConfig.ctas.founderClosed}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Applications are free and do not guarantee selection. LaunchPath reviews founder fit, readiness, customer access and willingness to execute.
          </p>
        </div>
      </section>

      <section className="container-px section-y grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <SectionHeading title="Before you apply" body="The programme is built for founders ready to speak to customers, test assumptions and submit evidence of progress." />
          <div className="mt-8 grid gap-4 rounded-md border border-line bg-white p-5 text-sm leading-7 text-slate shadow-card">
            <p className="font-semibold text-navy">Application status</p>
            <p className="mt-2">{siteConfig.cohort.applicationsOpen ? "Applications are currently open through the configured website setting." : "Applications are closed. You can register your interest for the next cohort."}</p>
            <div className="rounded-md bg-offwhite p-4">
              <p className="font-semibold text-navy">Founding Cohort Programme Fee</p>
              <p>{formatCurrency(siteConfig.pricing.foundingCohortFee)} once-off, or {siteConfig.pricing.instalmentCount} monthly payments of {formatCurrency(siteConfig.pricing.instalmentAmount)}.</p>
              <p className="mt-2 font-semibold text-navy">There is no fee to submit an application.</p>
            </div>
            <div className="rounded-md bg-offwhite p-4">
              <p className="font-semibold text-navy">Bursary interest</p>
              <p>
                {siteConfig.cohort.bursariesAvailable
                  ? "Sponsored bursary applications are available for the next cohort."
                  : "Sponsored bursary places are subject to confirmation by programme partners."}
              </p>
              <p className="mt-2">
                Applications are free. The {formatCurrency(siteConfig.pricing.bursaryAdminFee)} bursary admin commitment fee is only payable by successful bursary
                recipients after selection and acceptance.
              </p>
            </div>
            <p className="rounded-md bg-offwhite p-4">
              LaunchPath Labs provides founder education, structured execution support and general business tools. Participation does not guarantee revenue,
              funding, customers, procurement, investment, job creation or business success.
            </p>
          </div>
        </div>
        <div className="card">
          <FounderApplicationForm />
        </div>
      </section>
    </>
  );
}
