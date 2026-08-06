import { ButtonLink } from "@/components/button-link";
import { formatCurrency, siteConfig } from "@/lib/site-config";

const included = [
  "12-week online programme delivery",
  "Week 0 onboarding and baseline",
  "Live working sessions",
  "Accountability pod structure",
  "Founder tasks and evidence submissions",
  "Templates and practical tools",
  "Facilitator feedback",
  "30, 60 and 90-day follow-up"
];

export function PricingBursarySection({ showCta = true }: { showCta?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <article className="card">
        <p className="eyebrow">Founder pricing</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy">Founding Cohort Programme Fee</h2>
        <p className="mt-4 text-5xl font-semibold text-navy">{formatCurrency(siteConfig.pricing.foundingCohortFee)}</p>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate">Launch/founding cohort price</p>
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3 rounded-md border border-line bg-offwhite p-4 text-sm leading-6 text-slate sm:grid-cols-2">
          <p>
            <span className="font-semibold text-navy">Once-off:</span> {formatCurrency(siteConfig.pricing.foundingCohortFee)}
          </p>
          <p>
            <span className="font-semibold text-navy">Instalments:</span> {siteConfig.pricing.instalmentCount} monthly payments of{" "}
            {formatCurrency(siteConfig.pricing.instalmentAmount)}
          </p>
        </div>
        <p className="mt-4 text-sm font-semibold text-navy">There is no fee to submit an application.</p>
        {showCta ? (
          <div className="mt-6">
            <ButtonLink href="/apply">{siteConfig.cohort.applicationsOpen ? siteConfig.ctas.founderOpen : siteConfig.ctas.founderClosed}</ButtonLink>
          </div>
        ) : null}
      </article>

      <article className="card">
        <p className="eyebrow">Access pathway</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy">Sponsored Bursary Places</h2>
        <p className="mt-4 text-base leading-7 text-slate">
          Sponsored bursary places are intended to reduce the cost barrier for selected founders where a programme partner funds the founder&apos;s tuition.
        </p>
        <div className="mt-6 overflow-hidden rounded-md border border-line">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-line">
              <tr>
                <th className="bg-offwhite p-4 font-semibold text-navy">Programme fee</th>
                <td className="p-4 text-slate">{formatCurrency(siteConfig.pricing.foundingCohortFee)}</td>
              </tr>
              <tr>
                <th className="bg-offwhite p-4 font-semibold text-navy">Sponsor-funded bursary</th>
                <td className="p-4 text-slate">{formatCurrency(siteConfig.pricing.foundingCohortFee)}</td>
              </tr>
              <tr>
                <th className="bg-offwhite p-4 font-semibold text-navy">Founder tuition payable</th>
                <td className="p-4 text-slate">R0</td>
              </tr>
              <tr>
                <th className="bg-offwhite p-4 font-semibold text-navy">Admin commitment fee</th>
                <td className="p-4 text-slate">{formatCurrency(siteConfig.pricing.bursaryAdminFee)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate">
          Applications are free. The {formatCurrency(siteConfig.pricing.bursaryAdminFee)} fee is only payable by successful bursary recipients after they have
          been selected and accepted their place.
        </p>
        <p className="mt-3 text-sm font-semibold text-navy">
          {siteConfig.cohort.bursariesAvailable
            ? "Sponsored bursary applications are available for the next cohort."
            : "Sponsored bursary places are subject to confirmation by programme partners."}
        </p>
      </article>
    </div>
  );
}
