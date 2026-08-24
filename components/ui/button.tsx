import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "dark";
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-lime text-navy shadow-card hover:bg-lime-light",
        variant === "secondary" && "border border-line bg-white text-navy hover:border-lime hover:bg-lime/10",
        variant === "dark" && "bg-navy text-white shadow-card hover:bg-ink",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
