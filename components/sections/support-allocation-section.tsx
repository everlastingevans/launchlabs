import type { DeliveryAllocation } from "@/types/site";

const defaultAllocation: DeliveryAllocation[] = [
  { label: "Learning", value: "20%", width: "w-[20%]" },
  { label: "Guided application", value: "30%", width: "w-[30%]" },
  { label: "Founder execution", value: "50%", width: "w-[50%]" }
];

export function SupportAllocationSection({ allocation = defaultAllocation }: { allocation?: DeliveryAllocation[] }) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-navy">Delivery allocation</h3>
      <div className="mt-6 overflow-hidden rounded-md border border-line">
        <div className="flex h-12 w-full">
          <div className="w-[20%] bg-slate/30" aria-hidden="true" />
          <div className="w-[30%] bg-lime-light" aria-hidden="true" />
          <div className="w-[50%] bg-lime" aria-hidden="true" />
        </div>
      </div>
      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        {allocation.map((item) => (
          <div key={item.label} className="rounded-md bg-offwhite p-4">
            <dt className="text-sm font-semibold text-navy">{item.label}</dt>
            <dd className="mt-1 text-2xl font-semibold text-navy">{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-sm leading-6 text-slate">Execution is intentionally the largest component. The programme is built around what founders do between sessions.</p>
    </div>
  );
}
