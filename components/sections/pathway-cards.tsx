import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/site-config";

export function PathwayCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="rounded-md border border-line bg-white p-6 shadow-card">
        <p className="eyebrow">Founder pathway</p>
        <h3 className="mt-4 text-2xl font-semibold text-navy">I am building a business</h3>
        <p className="mt-4 leading-7 text-slate">
          Use the 12-week programme to test demand, strengthen your offer, understand pricing, start better sales conversations and build a practical next step.
        </p>
        <div className="mt-6">
          <ButtonLink href="/founders">{siteConfig.ctas.founderProgramme}</ButtonLink>
        </div>
      </article>
      <article className="rounded-md border border-line bg-white p-6 shadow-card">
        <p className="eyebrow">Sponsor pathway</p>
        <h3 className="mt-4 text-2xl font-semibold text-navy">I want to support entrepreneurs</h3>
        <p className="mt-4 leading-7 text-slate">
          Fund founder bursaries, support a cohort, contribute mentors or help founders access markets through a measured enterprise-development model.
        </p>
        <div className="mt-6">
          <ButtonLink href="/sponsors" variant="secondary">{siteConfig.ctas.sponsor}</ButtonLink>
        </div>
      </article>
    </div>
  );
}
