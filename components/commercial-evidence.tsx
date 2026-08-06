import { commercialEvidence } from "@/lib/site-config";

export function CommercialEvidenceSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <h2 className="text-3xl font-semibold leading-tight text-navy sm:text-4xl">What do we mean by commercial evidence?</h2>
        <p className="mt-4 text-base leading-7 text-slate sm:text-lg">
          Commercial evidence is proof from the market that helps you make better decisions. It does not only mean revenue. It can include signals that your
          customer, problem, offer, pricing or sales approach is becoming clearer.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {commercialEvidence.map((item) => (
          <div key={item} className="rounded-md border border-line bg-offwhite p-4 text-sm font-semibold text-navy">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
