import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface SectionRailProps {
  title: string;
  description?: string;
  /** "sub" sets the title one step smaller, for blocks nested inside a section. */
  level?: "section" | "sub";
  children: ReactNode;
  className?: string;
}

/**
 * The page's shared two-column section layout: a title rail on the left
 * (sticky on wide screens, so the heading stays in view while a long list
 * scrolls past) and the content on the right. Stacks on mobile.
 */
export function SectionRail({ title, description, level = "section", children, className }: SectionRailProps) {
  const Heading = level === "section" ? "h2" : "h3";

  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:gap-x-10 md:gap-y-0", className)}>
      <Reveal className="md:col-span-4">
        <div className="md:sticky md:top-28">
          <Heading className={cn(level === "section" ? "type-h2" : "type-h3", "text-paper")}>{title}</Heading>
          {description && <p className="mt-4 max-w-sm text-mist">{description}</p>}
        </div>
      </Reveal>
      <div className="min-w-0 md:col-span-8">{children}</div>
    </div>
  );
}
