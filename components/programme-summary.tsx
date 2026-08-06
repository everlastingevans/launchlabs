import { siteConfig } from "@/lib/site-config";

const summary = [
  siteConfig.cohort.duration,
  "National online delivery",
  `${siteConfig.cohort.size} in the pilot cohort`,
  `${siteConfig.cohort.commitment} of founder execution`,
  siteConfig.cohort.followUp
];

export function ProgrammeSummary() {
  return (
    <dl className="grid gap-3 rounded-md border border-line bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5">
      {summary.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-md bg-offwhite p-3">
          <dt className="sr-only">Programme feature</dt>
          <dd className="text-sm font-semibold leading-6 text-navy">
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-sm bg-lime text-[11px] font-bold">OK</span>
            {item}
          </dd>
        </div>
      ))}
    </dl>
  );
}
