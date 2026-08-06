import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { EditorialImage } from "@/components/editorial-image";
import { EvidenceCard } from "@/components/evidence-card";
import { SectionHeading } from "@/components/section-heading";
import { programmePrinciples, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Why LaunchPath",
  description: "Why LaunchPath Labs exists: practical founder development built around action, evidence, accountability and responsible reporting.",
  alternates: { canonical: "/why-launchpath" }
};

export default function WhyLaunchPathPage() {
  return (
    <>
      <section className="navy-panel brand-dots pt-32">
        <div className="container-px grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow border-white/15 bg-white/10 text-lime">Why LaunchPath</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">Why LaunchPath Labs exists</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              LaunchPath Labs was created because many capable people are told to become entrepreneurs without being given enough practical support to test the
              business, speak to customers and build a route towards revenue.
            </p>
          </div>
          <EditorialImage src="/photos/women-meeting.jpg" alt="Founders discussing business work in a collaborative setting" className="min-h-[26rem] border-white/15" priority />
        </div>
      </section>

      <section className="container-px section-y grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading title="The gap LaunchPath saw" />
        <div className="space-y-5 text-lg leading-8 text-slate">
          <p>
            Too many founders are active, motivated and hardworking, but still unclear about who their customer is, what the customer will pay for and what sales
            activity should happen next.
          </p>
          <p>
            Information is not enough on its own. Founders need structure, accountability, market-facing tasks and feedback that helps them make better decisions
            from evidence.
          </p>
          <p>
            LaunchPath Labs sits in that practical space between ambition and commercial traction. It does not promise success, but it gives founders a disciplined
            way to work towards it.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y grid gap-10 lg:grid-cols-2">
          <div className="card">
            <h2 className="text-2xl font-semibold text-navy">From opportunity seeking to opportunity creation</h2>
            <p className="mt-4 leading-7 text-slate">
              LaunchPath Recruitment was built around connecting people to opportunity. LaunchPath Labs extends that purpose by helping founders create
              opportunity through practical business building.
            </p>
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold text-navy">Built for responsible support</h2>
            <p className="mt-4 leading-7 text-slate">
              The programme is designed for sponsors and partners who want founder support to be useful, measurable and careful about the difference between
              progress and guaranteed outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="container-px section-y grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <EditorialImage src="/photos/shopkeeper-market.jpg" alt="Small business founder operating at a market" className="min-h-[24rem]" />
        <div>
          <SectionHeading title="Founder-led, practical and measured" />
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate">
            <p>
              Yazid Bohardien has worked across education, workforce development and technology for more than 15 years. That experience repeatedly exposed the
              gap between training people and helping them convert capability into sustainable work, income and enterprise.
            </p>
            <p>
              LaunchPath Labs does not overstate traction or publish unverified success stories. The programme is designed around execution, evidence,
              accountability and responsible reporting.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-px section-y">
          <SectionHeading title="Programme principles" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programmePrinciples.map((item) => (
              <EvidenceCard key={item} title={item} />
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/apply">{siteConfig.ctas.founderSecondary}</ButtonLink>
            <ButtonLink href="/sponsors" variant="secondary">{siteConfig.ctas.sponsor}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
