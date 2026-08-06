import { normalWeekItems } from "@/lib/site-config";

export function TypicalWeek() {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white shadow-card">
      <div className="grid gap-px bg-line md:grid-cols-3">
        {normalWeekItems.map((item, index) => (
          <div key={item} className="bg-white p-5">
            <p className="lime-marker rounded-full">{index + 1}</p>
            <p className="mt-4 text-sm font-semibold leading-6 text-navy">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
