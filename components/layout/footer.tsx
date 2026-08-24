import Image from "next/image";
import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-px grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-20 w-44 items-center justify-center rounded-md bg-navy p-2">
              <Image src="/brand/launchpath-main.png" alt="LaunchPath Labs logo" width={1665} height={945} className="h-full w-full object-contain" />
            </span>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200">
            {siteConfig.tagline} LaunchPath Labs supports early-stage South African founders to test demand, improve offers and build measurable progress.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-lime">Navigate</h2>
          <div className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="focus-ring w-fit rounded-md text-sm text-slate-200 hover:text-lime">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-lime">Trust and legal</h2>
          <div className="mt-4 grid gap-2">
            <Link href="/privacy" className="focus-ring w-fit rounded-md text-sm text-slate-200 hover:text-lime">Privacy policy</Link>
            <Link href="/terms" className="focus-ring w-fit rounded-md text-sm text-slate-200 hover:text-lime">Terms of use</Link>
            <Link href="/popia" className="focus-ring w-fit rounded-md text-sm text-slate-200 hover:text-lime">POPIA and data processing</Link>
            <Link href="/programme-disclaimer" className="focus-ring w-fit rounded-md text-sm text-slate-200 hover:text-lime">Programme disclaimer</Link>
            <Link href="/contact" className="focus-ring w-fit rounded-md text-sm text-slate-200 hover:text-lime">Contact</Link>
          </div>
          <p className="mt-5 text-sm text-slate-300">{siteConfig.contact.email}</p>
          <p className="mt-1 text-sm text-slate-300">{siteConfig.contact.location}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col gap-2 py-5 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LaunchPath Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
