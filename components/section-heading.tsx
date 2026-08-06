import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  light?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, body, light = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <p className={cn("eyebrow", light && "border-white/15 bg-white/10 text-lime")}>{eyebrow}</p> : null}
      <h2 className={cn("mt-4 text-3xl font-semibold leading-tight sm:text-4xl", light ? "text-white" : "text-navy")}>{title}</h2>
      {body ? <p className={cn("mt-4 text-base leading-7 sm:text-lg", light ? "text-slate-200" : "text-slate")}>{body}</p> : null}
    </div>
  );
}
