import { Fraunces, IBM_Plex_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
});

export function FounderGrantSection() {
  return (
    <section className={`${fraunces.variable} ${plexMono.variable} bg-[#fff] py-24 px-6`}>
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-10 md:grid-cols-[1.05fr_1fr] md:gap-16">

        {/* Left: narrative */}
        <div>
          <p className="mb-5 inline-flex items-center gap-2.5 font-[family-name:var(--font-plex-mono)] text-xs font-semibold uppercase tracking-[0.14em] text-lime">
            <span className="h-px w-[18px] bg-[#8A6A32]" />
            Founding Cohort Opportunity
          </p>

          <h2 className="mb-5 font-[family-name:var(--font-fraunces)] text-[30px] font-medium leading-[1.15] tracking-tight text-[#16233F] sm:text-[36px] lg:text-[42px]">
            Build the strongest business in the cohort — and you could
            receive{" "}
            <em className="font-semibold not-italic italic text-lime">
              R50,000
            </em>
            .
          </h2>

          <p className="mb-5 max-w-[46ch] text-[16.5px] leading-relaxed text-[#4B5670]">
            One business that successfully completes the LaunchPath Labs
            Founding Cohort will be selected to receive R50,000 in grant
            funding to support the next stage of its growth.
          </p>

          <p className="mb-5 max-w-[48ch] text-[15px] leading-relaxed text-[#4B5670]">
            The grant is not awarded simply for attending the programme.
            Selection is based on the evidence founders produce during the
            cohort — including customer engagement, offer validation, sales
            activity, commercial progress and the strength of their next
            90-day execution plan.
          </p>

          <a
            href="https://www.launchpathlabs.co.za/apply"
            className="group mt-3 inline-flex items-center gap-2.5 rounded-full bg-[#16233F] px-6 py-4 text-[14.5px] font-medium text-[#F7F5EF] transition-colors hover:bg-[#223258] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6A32]"
          >
            Apply for the Founding Cohort
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="M0 5H13M13 5L9 1M13 5L9 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Right: grant card */}
        <div className="relative rounded-2xl border border-[#16233F]/[0.14] bg-white px-7 pb-8 pt-10 sm:px-9">
          <span className="absolute -top-3.5 right-7 rotate-[2.5deg] rounded-sm bg-[#16233F] px-3 py-[7px] font-[family-name:var(--font-plex-mono)] text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#F7F5EF]">
            Earned, not given
          </span>

          <div className="mb-7">
            <div className="font-[family-name:var(--font-fraunces)] text-[52px] font-medium leading-none tracking-tight text-lime sm:text-[60px] lg:text-[68px]">
              R50,000
            </div>
            <div className="mt-1.5 font-[family-name:var(--font-plex-mono)] text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#4B5670]">
              Grant funding
            </div>
          </div>

          <div className="grid grid-cols-[1fr_1px_1fr] gap-6 border-y border-[#16233F]/[0.14] py-5">
            <div>
              <div className="mb-1 font-[family-name:var(--font-fraunces)] text-[22px] font-medium text-[#16233F]">
                1 business
              </div>
              <div className="text-[13px] leading-snug text-[#4B5670]">
                Selected from the graduating cohort
              </div>
            </div>
            <div className="h-full w-px bg-[#16233F]/[0.14]" />
            <div>
              <div className="mb-1 font-[family-name:var(--font-fraunces)] text-[22px] font-medium text-[#16233F]">
                12 weeks
              </div>
              <div className="text-[13px] leading-snug text-[#4B5670]">
                To build and demonstrate progress
              </div>
            </div>
          </div>

          <div className="pt-6">
            <p className="mb-3.5 text-[13px] font-medium text-[#16233F]">
              Selection is based on:
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Customer engagement",
                "Offer validation",
                "Sales activity",
                "Commercial progress",
                "Strength of the next 90-day execution plan",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2.5 text-sm leading-snug text-[#4B5670]"
                >
                  <span className="mt-0.5 h-[5px] w-[5px] flex-none rounded-full bg-[#8A6A32]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 border-t border-dashed border-[#16233F]/[0.14] pt-4 text-[12.5px] leading-relaxed text-[#4B5670]/85">
            Awarded to one qualifying business from the graduating Founding
            Cohort. Not guaranteed to any applicant or participant.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FounderGrantSection;
