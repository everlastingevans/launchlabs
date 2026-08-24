import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { EvidenceCard } from "@/components/ui/evidence-card";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { FounderPrizeSection } from "@/components/sections/founder-prize-section";
import { PricingBursarySection } from "@/components/sections/pricing-bursary-section";
import { TypicalWeek } from "@/components/sections/typical-week";
import { founderFaqs } from "@/lib/faq";
import { founderOutputs, notPromised, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "For Founders",
  description: "Apply to LaunchPath Labs and build practical market evidence through customer discovery, offer testing, pricing validation, outreach and pipeline development.",
  alternates: { canonical: "/founders" }
};

const expected = [
  "Commit 4-6 hours each week",
  "Speak to customers or prospective customers",
  "Test pricing and offers",
  "Conduct direct sales outreach",
  "Submit weekly evidence",
  "Change direction when evidence contradicts assumptions"
];

const applyProcess = ["Submit application", "Application review", "Shortlisted founder conversation", "Selection and onboarding", "Week 0 baseline", "Programme start"];

export default function FoundersPage() {
  const founderCta = siteConfig.cohort.applicationsOpen ? siteConfig.ctas.founderOpen : siteConfig.ctas.founderClosed;

  return (
    <>
      <section className="navy-panel brand-dots pt-32">
        <div className="container-px grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow border-white/15 bg-white/10 text-lime">For Founders</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Build a clearer business through customer action, not guesswork.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              LaunchPath Labs is for founders who are ready to speak to customers, test an offer, understand pricing, try sales outreach and learn from what the
              market actually says.
            </p>
            <div className="mt-8">
              <ButtonLink href="/apply">{founderCta}</ButtonLink>
            </div>
          </div>
          <EditorialImage src="/photos/founder-cafe-papers.jpg" alt="Founder reviewing business notes with a laptop" className="min-h-[26rem] border-white/15" priority />
        </div>
      </section>

      <section className="container-px section-y">
        <SectionHeading title="What you will have built by the end" body="You will leave with practical assets and clearer decisions you can keep using after the cohort." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {founderOutputs.map((item) => (
            <EvidenceCard key={item} title={item} />
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-slate">
          The exact outcome will depend on your starting point, the work you complete and what the market tells you.
        </p>
      </section>

      <section className="bg-white">
        <div className="container-px section-y grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              title="You will spend more time working on your business than sitting in sessions."
              body="The programme includes live sessions and feedback, but the real work happens when you speak to customers, test your offer, reach out to prospects and submit evidence of what happened."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {expected.map((item) => (
              <EvidenceCard key={item} title={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-px section-y">
        <SectionHeading
          title="What a normal week looks like"
          body="Each week is designed to move you from learning into action. You will not only attend sessions. You will complete practical work in your business and bring back evidence of what happened."
        />
        <div className="mt-10">
          <TypicalWeek />
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Who should apply" />
            <div className="mt-8 grid gap-4">
              {["Have an idea, informal business, early operation or early revenue", "Have realistic access to prospective customers", "Are prepared to conduct customer interviews", "Are willing to test pricing and offers", "Can participate online using a smartphone or computer"].map((item) => (
                <EvidenceCard key={item} title={item} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="Who should wait" />
            <div className="mt-8 grid gap-4">
              {["Only want a certificate", "Only want an investor introduction", "Are looking for passive training", "Refuse to engage customers", "Cannot commit to weekly execution", "Expect guaranteed funding, procurement or revenue"].map((item) => (
                <EvidenceCard key={item} title={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-px section-y">
        <PricingBursarySection />
      </section>

      <section className="bg-white">
        <div className="container-px section-y">
          <FounderPrizeSection />
        </div>
      </section>

      <section className="container-px section-y grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading title="Application process" />
          <ol className="mt-8 grid gap-4">
            {applyProcess.map((item, index) => (
              <li key={item} className="flex gap-4 rounded-md border border-line bg-white p-4 shadow-card">
                <span className="lime-marker">{index + 1}</span>
                <span className="pt-1 font-semibold text-navy">{item}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHeading title="What the programme cannot guarantee" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {notPromised.map((item) => (
              <EvidenceCard key={item} title={`No guaranteed ${item}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y">
          <SectionHeading title="Founder FAQ" />
          <div className="mt-10">
            <FAQAccordion items={founderFaqs} />
          </div>
          <div className="mt-8">
            <ButtonLink href="/apply">{founderCta}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
