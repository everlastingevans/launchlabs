import Image from "next/image";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function EditorialImage({ src, alt, className, priority = false }: EditorialImageProps) {
  return (
    <div className={cn("relative min-h-[18rem] overflow-hidden rounded-md border border-line bg-white shadow-card", className)}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" priority={priority} />
    </div>
  );
}
