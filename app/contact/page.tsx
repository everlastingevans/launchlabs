import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact LaunchPath Labs for general, sponsor, partnership and founder application enquiries.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <section className="navy-panel brand-dots pt-32">
        <div className="container-px py-16 lg:py-24">
          <p className="eyebrow border-white/15 bg-white/10 text-lime">Contact</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">Speak to LaunchPath Labs.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Use this page for general enquiries, sponsor and partnership enquiries, or founder application enquiries.
          </p>
        </div>
      </section>

      <section className="container-px section-y grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading title="Contact details" />
          <div className="mt-8 grid gap-4">
            <div className="card">
              <h2 className="font-semibold text-navy">Email</h2>
              <Link href={`mailto:${siteConfig.contact.email}`} className="mt-2 inline-flex font-semibold text-navy underline">{siteConfig.contact.email}</Link>
            </div>
            <div className="card">
              <h2 className="font-semibold text-navy">Location</h2>
              <p className="mt-2 text-slate">{siteConfig.contact.location}</p>
            </div>
            <div className="card">
              <h2 className="font-semibold text-navy">Delivery</h2>
              <p className="mt-2 text-slate">{siteConfig.contact.delivery}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
