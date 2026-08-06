import Link from "next/link";
import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="container-px section-y min-h-[70vh] pt-32">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-6 max-w-3xl text-4xl font-semibold text-navy sm:text-5xl">This page is not part of the current LaunchPath Labs site.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate">
        LaunchPath Labs now focuses on one national online founder accelerator. You can continue to the programme, sponsors or founder application pathways.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/programme">View the Programme</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back to Home
        </ButtonLink>
      </div>
      <p className="mt-8 text-sm text-slate">
        Need help? <Link href="/contact" className="font-semibold text-navy underline">Contact LaunchPath</Link>.
      </p>
    </section>
  );
}
