"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { navItems, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isSponsorPage = pathname?.startsWith("/sponsors");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const primaryCta = isSponsorPage
    ? { href: "/sponsors#sponsor-enquiry", label: siteConfig.ctas.sponsor }
    : { href: "/apply", label: siteConfig.ctas.founderSecondary };

  const secondaryCta = isSponsorPage
    ? { href: "/apply", label: siteConfig.ctas.founderSecondary, variant: "secondary" as const }
    : { href: "/sponsors", label: siteConfig.ctas.sponsor, variant: "secondary" as const };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[#0A1B3D] backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl px-6 h-20 items-center justify-between" aria-label="Main navigation">
        
        {/* Brand Logo */}
        <Link href="/" className="focus-ring flex items-center rounded-md shrink-0">
          <span className="flex h-16 w-32 items-center justify-center p-1.5 sm:w-36">
            <Image 
              src="/brand/launchpath-main.png" 
              alt="LaunchPath Labs logo" 
              width={1665} 
              height={945} 
              className="h-full w-full object-contain" 
              priority 
            />
          </span>
          <span className="sr-only">LaunchPath Labs</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "focus-ring relative flex h-full items-center px-4 text-[14px] font-medium transition-colors duration-200 hover:text-[#C8FF7A]",
                  isActive ? "text-[#A6F23C]" : "text-[#fff]"
                )}
              >
                {item.label}
                {/* Modern active indicator bar */}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-4 h-[2px] bg-navy rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Call to Actions */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <ButtonLink href={secondaryCta.href} variant={secondaryCta.variant} className="h-9 px-4 text-sm font-medium">
            {secondaryCta.label}
          </ButtonLink>
          <ButtonLink href={primaryCta.href} className="h-9 px-4 text-sm font-medium">
            {primaryCta.label}
          </ButtonLink>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button 
          type="button" 
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white lg:hidden" 
          aria-label="Toggle menu" 
          aria-expanded={open} 
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={cn("h-0.5 w-4 bg-navy transition-all duration-200", open && "translate-y-2 rotate-45")} />
            <span className={cn("h-0.5 w-4 bg-navy transition-all duration-200", open && "opacity-0")} />
            <span className={cn("h-0.5 w-4 bg-navy transition-all duration-200", open && "-translate-y-1 -rotate-45")} />
          </span>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="border-t border-line bg-white lg:hidden shadow-lg transition-all">
          <div className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "focus-ring rounded-md px-4 py-3 text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-offwhite text-navy font-semibold" : "text-slate hover:bg-offwhite/50"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="grid gap-2 pt-4 mt-2 border-t border-line/60 sm:grid-cols-2">
              <ButtonLink href={secondaryCta.href} variant={secondaryCta.variant} className="h-10 justify-center">
                {secondaryCta.label}
              </ButtonLink>
              <ButtonLink href={primaryCta.href} className="h-10 justify-center">
                {primaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
