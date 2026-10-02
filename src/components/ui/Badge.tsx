import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "default" | "signal" | "high" | "medium" | "low";

const TONE_CLASSES: Record<BadgeTone, string> = {
  default: "border-line text-mist bg-ink-raised/50",
  signal: "border-signal/30 text-signal bg-signal-soft",
  high: "border-crimson/30 text-crimson bg-crimson-soft",
  medium: "border-amber/30 text-amber bg-amber-soft",
  low: "border-low/30 text-low bg-low-soft",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-control border px-2.5 py-1 text-[0.8125rem] leading-none whitespace-nowrap",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
