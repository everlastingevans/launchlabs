import Image from "next/image";
import { cn } from "@/lib/utils";

export type EditorialImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function EditorialImage({ src, alt, className, priority = false }: EditorialImageProps) {
  return (
    <div className={cn("relative min-h-[22rem] overflow-hidden rounded-md border border-line bg-offwhite shadow-card", className)}>
      <Image src={src} alt={alt} fill priority={priority} className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
    </div>
  );
}
