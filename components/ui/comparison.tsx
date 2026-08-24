export type ComparisonProps = {
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
};

export function Comparison({ leftTitle, rightTitle, leftItems, rightItems }: ComparisonProps) {
  return (
    <div className="grid overflow-hidden rounded-md border border-line bg-white shadow-card lg:grid-cols-2">
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-navy">{leftTitle}</h3>
        <ul className="mt-6 space-y-4">
          {leftItems.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-navy p-6 text-white sm:p-8">
        <h3 className="text-xl font-semibold">{rightTitle}</h3>
        <ul className="mt-6 space-y-4">
          {rightItems.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-100">
              <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-lime text-[10px] font-bold text-navy" aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
