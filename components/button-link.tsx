import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition",
        "hover:-translate-y-0.5",
        variant === "primary" && "bg-lime text-navy shadow-card hover:bg-lime-light",
        variant === "secondary" && "border border-line bg-white text-navy hover:border-lime hover:bg-lime/10",
        variant === "dark" && "bg-navy text-white shadow-card hover:bg-ink",
        variant === "ghost" && "text-navy hover:bg-white",
        className
      )}
    >
      {children}
      <span aria-hidden="true" className="ml-2">-&gt;</span>
    </Link>
  );
}
