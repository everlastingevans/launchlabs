import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { EditorialImage } from "@/components/editorial-image";
import { EvidenceCard } from "@/components/evidence-card";
import { FounderPrizeSection } from "@/components/founder-prize";
import { SponsorEnquiryForm } from "@/components/forms";
import { SectionHeading } from "@/components/section-heading";
import { formatCurrency, launchPathResponsibilities, siteConfig, sponsorAudience, sponsorInvolvement } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "For Sponsors",
  description: "Sponsor a LaunchPath Labs founder cohort built around practical execution, measurable progress and responsible sponsor-safe reporting.",
  alternates: { canonical: "/sponsors" }
};

const sponsorBenefits = [
  "Practical enterprise development support",
  "Founder activity and progress reporting",
  "National online founder reach",
  "Structured selection and onboarding",
  "Optional mentor or market-access involvement",
  "Responsible outcome language"
];

const reporting = [
  "Founder baseline profile",
  "Participation and completion",
  "Weekly activity themes",
  "Evidence and pipeline movement",
  "Final cohort report",
  "30, 60 and 90-day follow-up"
];

export default function SponsorsPage() {
  const thirtyFounderBursaries = siteConfig.pricing.foundingCohortFee * 30;

  return (
    <>
      <section className="navy-panel brand-dots pt-32">
        <div className="container-px grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow border-white/15 bg-white/10 text-lime">For Sponsors</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Help founders build stronger businesses, not just attend another course.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              LaunchPath Labs gives sponsors a practical way to fund founder development that is structured around action, customer engagement, evidence,
              accountability and follow-up reporting.
            </p>
            <div className="mt-8">
              <ButtonLink href="#sponsor-enquiry">{siteConfig.ctas.sponsorDiscussion}</ButtonLink>
            </div>
          </div>
          <EditorialImage src="/photos/shopkeeper-market.jpg" alt="Entrepreneur operating a small market business" className="min-h-[26rem] border-white/15" priority />
        </div>
      </section>

      <section className="container-px section-y">
        <SectionHeading title="Why this matters to sponsors" body="Many entrepreneurship initiatives transfer knowledge, but founders still need structured support to test whether the market cares." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sponsorBenefits.map((item) => (
            <EvidenceCard key={item} title={item} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y">
          <SectionHeading title="Sponsor opportunities" body="Sponsors can fund access, reward progress or help founders reach markets." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <article className="card">
              <h3 className="text-2xl font-semibold text-navy">Sponsor Founder Bursaries</h3>
              <p className="mt-4 leading-7 text-slate">
                Fund the {formatCurrency(siteConfig.pricing.foundingCohortFee)} founder programme fee for selected founders who could not otherwise access the cohort.
              </p>
              <p className="mt-5 rounded-md bg-offwhite p-4 text-sm font-semibold leading-6 text-navy">
                30 founder bursaries = {formatCurrency(thirtyFounderBursaries)} excluding VAT.
              </p>
              <p className="mt-4 text-sm leading-6 text-slate">Setup, recruitment, reporting and custom delivery may be quoted separately depending on sponsor requirements.</p>
            </article>
            <article className="card">
              <h3 className="text-2xl font-semibold text-navy">Sponsor Founder Prize</h3>
              <p className="mt-4 leading-7 text-slate">
                Support a prize opportunity that recognises evidence, execution and market-facing progress at the end of the cohort.
              </p>
              <p className="mt-5 rounded-md bg-offwhite p-4 text-sm font-semibold leading-6 text-navy">
                Proposed prize partnership: {formatCurrency(siteConfig.prize.suggestedPrizePartnershipAmount)}.
              </p>
              <p className="mt-4 text-sm leading-6 text-slate">This is a proposed sponsor opportunity and is not a confirmed participant prize unless sponsor funding is secured.</p>
            </article>
            <article className="card">
              <h3 className="text-2xl font-semibold text-navy">Support Founder Network</h3>
              <p className="mt-4 leading-7 text-slate">
                Add value through practical ecosystem access while LaunchPath manages delivery quality and founder accountability.
              </p>
              <div className="mt-5 grid gap-2">
                {sponsorInvolvement.slice(0, 6).map((item) => (
                  <span key={item} className="rounded-md bg-offwhite px-4 py-3 text-sm font-semibold text-navy">{item}</span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="container-px section-y grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <EditorialImage src="/photos/market-vendor.jpg" alt="Founder serving customers at a market stall" className="min-h-[24rem]" />
        <div>
          <SectionHeading title="Reporting without exaggerated claims" body="LaunchPath reports on founder activity, progress and follow-up outcomes while protecting participant confidentiality and avoiding unsupported impact promises." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {reporting.map((item) => (
              <EvidenceCard key={item} title={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="LaunchPath responsibilities" />
            <div className="mt-8 grid gap-4">
              {launchPathResponsibilities.map((item) => (
                <EvidenceCard key={item} title={item} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="Potential sponsor involvement" />
            <div className="mt-8 grid gap-4">
              {sponsorInvolvement.map((item) => (
                <EvidenceCard key={item} title={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-px section-y">
        <FounderPrizeSection />
      </section>

      <section className="bg-white" id="sponsor-enquiry">
        <div className="container-px section-y grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              title="Next steps"
              body="Share your enterprise development, supplier development, CSI, ESG, economic inclusion or impact priorities and LaunchPath will explore the right cohort structure."
            />
            <div className="mt-8 grid gap-3">
              {sponsorAudience.slice(0, 9).map((item) => (
                <span key={item} className="rounded-md bg-offwhite px-4 py-3 text-sm font-semibold text-navy">{item}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold text-navy">{siteConfig.ctas.sponsor}</h2>
            <p className="mt-3 text-sm leading-6 text-slate">
              Use this form to discuss bursaries, a cohort, a proposed prize partnership, mentors, customer access or supplier-development alignment.
            </p>
            <div className="mt-6">
              <SponsorEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
