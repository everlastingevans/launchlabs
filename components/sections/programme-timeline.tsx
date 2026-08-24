import { programmeStages } from "@/lib/site-config";

export function ProgrammeTimeline() {
  return (
    <div className="grid gap-5">
      {programmeStages.map((stage, index) => (
        <article key={stage.label} className="grid gap-5 rounded-md border border-line bg-white p-5 shadow-card md:grid-cols-[10rem_1fr]">
          <div>
            <p className="lime-marker">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate">{stage.label}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-navy">{stage.title}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {stage.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
