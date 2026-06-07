import { cn } from "@/lib/utils";
import logoFull from "@/assets/skinlab-logo.png";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { frame: "h-9", image: "h-[3.25rem]" },
  md: { frame: "h-11", image: "h-16" },
  lg: { frame: "h-28", image: "h-28" },
} as const;

export function Logo({ className, showTagline = false, size = "md" }: LogoProps) {
  const s = sizeMap[size];
  const frameHeight = showTagline ? sizeMap.lg.frame : s.frame;
  const imageHeight = showTagline ? sizeMap.lg.image : s.image;

  return (
    <div
      className={cn("inline-flex shrink-0 overflow-hidden rounded-md", frameHeight, className)}
      aria-label="SkinLab — Science of Skincare"
    >
      <img
        src={logoFull}
        alt="SkinLab — Science of Skincare"
        className={cn("w-auto max-w-none object-left object-cover", imageHeight)}
        draggable={false}
      />
    </div>
  );
}
