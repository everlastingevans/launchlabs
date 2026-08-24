import { formatCurrency, siteConfig } from "@/lib/site-config";

const assessedOn = [
  "Evidence of customer engagement",
  "Clarity of the offer",
  "Quality of pricing and sales tests",
  "Pipeline movement",
  "Learning and adaptation",
  "Strength of the next 90-day plan"
];

export function FounderPrizeSection() {
  return (
    <article className="rounded-md border border-line bg-white p-6 shadow-card">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Optional sponsor-funded award</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy">Founder Prize Opportunity</h2>
          <p className="mt-4 text-base leading-7 text-slate">
            LaunchPath Labs may include a founder prize if confirmed by a sponsor. The prize would recognise practical progress, market evidence and disciplined
            execution during the programme.
          </p>
          <p className="mt-4 text-sm font-semibold text-navy">
            {siteConfig.cohort.prizeConfirmed && siteConfig.prize.confirmedPrizeAmount
              ? `Confirmed prize amount: ${formatCurrency(siteConfig.prize.confirmedPrizeAmount)}.`
              : "The founder prize is not yet confirmed and no prize amount is guaranteed."}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-navy">Prize assessment would consider</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {assessedOn.map((item) => (
              <div key={item} className="rounded-md border border-line bg-offwhite p-4 text-sm font-semibold text-navy">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
