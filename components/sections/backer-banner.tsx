import { CheckCircle2 } from "lucide-react";
import { MinaraLogo } from "@/components/ui/minara-logo";

export function BackerBanner() {
  return (
    <section className="border-y border-line bg-gradient-to-r from-white via-offwhite to-white py-8 shadow-sm">
      <div className="container-px flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl border border-line bg-white p-2 shadow-card">
            <MinaraLogo className="h-16 w-auto" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.14em] text-navy">
              <span>Official Programme Backer</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
            </div>
            <h2 className="mt-1 text-xl font-bold text-navy sm:text-2xl">
              Backed by Minara Chamber of Commerce
            </h2>
            <p className="mt-1 text-xs font-medium text-slate">
              Empowering South African entrepreneurs through enterprise development and market validation
            </p>
          </div>
        </div>
        <div className="max-w-md text-center text-sm leading-6 text-slate md:text-right">
          Partnering to support early-stage founders with structured execution support, customer discovery, and practical pathways to commercial sustainability.
        </div>
      </div>
    </section>
  );
}

