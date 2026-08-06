import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { EditorialImage } from "@/components/editorial-image";
import { EvidenceCard } from "@/components/evidence-card";
import { FAQAccordion } from "@/components/faq-accordion";
import { PathwayCards } from "@/components/pathway-cards";
import { PricingBursarySection } from "@/components/pricing-bursary";
import { ProgrammeSummary } from "@/components/programme-summary";
import { ProgrammeTimeline } from "@/components/programme-timeline";
import { SectionHeading } from "@/components/section-heading";
import { TypicalWeek } from "@/components/typical-week";
import { homeFaqs } from "@/lib/faq";
import { founderOutputs, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "LaunchPath Labs | 12-Week Founder Accelerator South Africa",
  description: siteConfig.description,
  alternates: { canonical: "/" }
};

const founderProblemCards = [
  "Find the right customer",
  "Test whether the problem is real",
  "Build an offer people understand",
  "Work out what to charge",
  "Start better sales conversations",
  "Build a pipeline you can act on"
];

export default function Home() {
  const founderCta = siteConfig.cohort.applicationsOpen ? siteConfig.ctas.founderOpen : siteConfig.ctas.founderClosed;

  return (
    <>
      <section className="navy-panel brand-dots pt-32">
        <div className="container-px grid gap-10 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow border-white/15 rounded-full bg-white/10 text-lime">12-week online founder accelerator</p>
            <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Stop guessing. Start building a business customers will pay for.
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-slate-200">
              <p>You may already have an idea, a few customers or an early business, but still be unsure who to target, what to charge or how to generate consistent sales.</p>
              <p>
                LaunchPath Labs is a 12-week online programme that helps you test demand, strengthen your offer, speak to customers and build a clearer path
                towards revenue.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/apply">{founderCta}</ButtonLink>
              <ButtonLink href="/programme" variant="secondary">{siteConfig.ctas.programme}</ButtonLink>
            </div>
            <Link href="/sponsors" className="focus-ring mt-5 inline-flex rounded-md text-sm font-semibold text-lime hover:text-lime-light">
              Looking to support entrepreneurs? Sponsor a LaunchPath Labs cohort.
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">{siteConfig.tagline}</p>
          </div>
          <EditorialImage
            src="/photos/founder-laptop.jpg"
            alt="Founder working on a laptop while planning a business offer"
            className="min-h-[26rem] border-white/15"
            priority
          />
        </div>
        <div className="container-px pb-10">
          <ProgrammeSummary />
        </div>
      </section>

      <section className="container-px section-y grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading title="Starting a business can feel busy without feeling like progress." />
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate">
            <p>You may be working hard, posting online, speaking to friends and improving your product, but still not know whether customers will pay for it.</p>
            <p>
              The problem may be your target customer, your offer, your pricing or how you are approaching sales. Without a structured way to test these areas,
              it is easy to stay active without moving the business forward.
            </p>
            <p>LaunchPath Labs helps you work through these questions by taking action in the market.</p>
          </div>
        </div>
        <div>
          <EditorialImage src="/photos/sewing-founder.jpg" alt="Small business owner working at a sewing machine" className="mb-5 min-h-[18rem]" />
          <div className="grid gap-3 sm:grid-cols-2">
            {founderProblemCards.map((item) => (
              <EvidenceCard key={item} title={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y">
          <SectionHeading title="How can LaunchPath Labs help you?" body="Choose the path that matches why you are here today." />
          <div className="mt-10">
            <PathwayCards />
          </div>
        </div>
      </section>

      <section className="container-px section-y" id="journey">
        <SectionHeading
          eyebrow="Programme journey"
          title="Five practical stages from starting point to next 90-day plan."
          body="You will move through five practical stages, from understanding your starting point to testing your business in the market and building your next 90-day plan."
        />
        <div className="mt-10">
          <ProgrammeTimeline />
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              title="What a normal week looks like"
              body="Each week is designed to move you from learning into action. You will not only attend sessions. You will complete practical work in your business and bring back evidence of what happened."
            />
            <div className="mt-8">
              <TypicalWeek />
            </div>
          </div>
          <EditorialImage src="/photos/women-meeting.jpg" alt="Founders reviewing work together during a meeting" className="min-h-[24rem]" />
        </div>
      </section>

      <section className="container-px section-y">
        <SectionHeading
          title="What you will have built by the end"
          body="The programme is designed around practical outputs founders can keep using after the cohort ends."
        />
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
        <div className="container-px section-y">
          <PricingBursarySection />
        </div>
      </section>

      <section className="container-px section-y grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <EditorialImage src="/photos/market-vendor.jpg" alt="Entrepreneur at a market stall speaking to customers" className="min-h-[24rem]" />
        <div>
          <SectionHeading
            title="Why this matters to sponsors"
            body="Sponsors can help founders access structured execution support before expecting them to create jobs, enter supply chains or attract capital."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/sponsors">{siteConfig.ctas.sponsor}</ButtonLink>
            <ButtonLink href="/programme" variant="secondary">View programme model</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y">
          <SectionHeading title="Questions founders and partners ask." />
          <div className="mt-10">
            <FAQAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      <section className="container-px section-y">
        <div className="rounded-md bg-navy p-8 text-white shadow-soft sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Ready to move from activity to evidence?</h2>
            <p className="mt-4 text-base leading-7 text-slate-200">
              LaunchPath Labs provides founder education, structured execution support and general business tools. Participation does not guarantee revenue,
              funding, customers, procurement, investment, job creation or business success.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row lg:mt-0">
            <ButtonLink href="/apply">{founderCta}</ButtonLink>
            <ButtonLink href="/sponsors" variant="secondary">{siteConfig.ctas.sponsor}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
