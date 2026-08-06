import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { CommercialEvidenceSection } from "@/components/commercial-evidence";
import { EvidenceCard } from "@/components/evidence-card";
import { FounderPrizeSection } from "@/components/founder-prize";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { PricingBursarySection } from "@/components/pricing-bursary";
import { ProgrammeTimeline } from "@/components/programme-timeline";
import { SectionHeading } from "@/components/section-heading";
import { TypicalWeek } from "@/components/typical-week";
import { founderOutputs, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The Programme",
  description: "Explore the LaunchPath Labs 12-week online founder accelerator, programme stages, weekly rhythm, pricing and evidence-based delivery model.",
  alternates: { canonical: "/programme" }
};

const fit = [
  "Have an idea, informal business, early operation or early revenue",
  "Can commit 4-6 hours each week",
  "Have access to prospective customers",
  "Will conduct interviews, pricing tests and outreach",
  "Will submit weekly evidence",
  "Can participate online by smartphone or computer"
];

const notFit = [
  "Only want a certificate",
  "Only want an investor introduction",
  "Are looking for passive training",
  "Refuse to engage customers",
  "Cannot commit to weekly execution",
  "Expect guaranteed funding, procurement or revenue"
];

export default function ProgrammePage() {
  return (
    <>
      <section className="navy-panel brand-dots pt-32">
        <div className="container-px grid gap-10 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow border-white/15 bg-white/10 text-lime">The Programme</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              A 12-week execution-first venture building programme.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              LaunchPath Labs helps early-stage South African entrepreneurs test demand, improve their offers, validate pricing and build active sales
              pipelines through guided weekly action.
            </p>
          </div>
          <div className="rounded-md border border-white/15 bg-white/[0.06] p-6">
            <h2 className="text-xl font-semibold text-white">Delivery rhythm</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-100">
              <li>Short learning before live sessions</li>
              <li>Live working sessions focused on application</li>
              <li>Accountability pods and facilitator feedback</li>
              <li>Weekly tasks completed in the business</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-px section-y">
        <SectionHeading
          title="Programme overview"
          body="The programme is practical by design. Founders work through customer discovery, offer testing, pricing, sales outreach, pipeline development and the next 90 days."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {founderOutputs.map((item) => (
            <EvidenceCard key={item} title={item} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Who the programme is for" />
            <div className="mt-8 grid gap-3">
              {fit.map((item) => (
                <EvidenceCard key={item} title={item} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="Who it is not for" />
            <div className="mt-8 grid gap-3">
              {notFit.map((item) => (
                <EvidenceCard key={item} title={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-px section-y">
        <SectionHeading
          title="Programme stages"
          body="The public structure is high-level. The detailed weekly curriculum, assignments, rubrics, templates and scoring system remain part of the private programme delivery model."
        />
        <div className="mt-10">
          <ProgrammeTimeline />
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y">
          <SectionHeading
            title="What a normal week looks like"
            body="Each week is designed to move you from learning into action. You will not only attend sessions. You will complete practical work in your business and bring back evidence of what happened."
          />
          <div className="mt-10">
            <TypicalWeek />
          </div>
        </div>
      </section>

      <section className="container-px section-y">
        <CommercialEvidenceSection />
      </section>

      <section className="bg-white">
        <div className="container-px section-y">
          <PricingBursarySection />
        </div>
      </section>

      <section className="container-px section-y">
        <FounderPrizeSection />
      </section>

      <section className="bg-white">
        <div className="container-px section-y grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Minimum graduation requirements" body="Completion is based on participation and evidence, not passive attendance alone." />
            <div className="mt-8 grid gap-4">
              {["Attendance threshold", "Assessment score threshold", "Weekly evidence submissions", "Commercial evidence presentation", "90-day execution plan"].map((item) => (
                <EvidenceCard key={item} title={item} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="What LaunchPath does not promise" body="The programme focuses on disciplined progress rather than guaranteed outcomes." />
            <div className="mt-8">
              <LegalDisclaimer />
            </div>
          </div>
        </div>
      </section>

      <section className="container-px section-y">
        <div className="rounded-md bg-navy p-8 text-white shadow-soft sm:p-12">
          <h2 className="text-3xl font-semibold">Ready to apply or support a cohort?</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-200">
            Founders can apply without paying an application fee. Sponsors can support bursaries, founder prizes, mentors or market access.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/apply">{siteConfig.cohort.applicationsOpen ? siteConfig.ctas.founderOpen : siteConfig.ctas.founderClosed}</ButtonLink>
            <ButtonLink href="/sponsors" variant="secondary">{siteConfig.ctas.sponsor}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
