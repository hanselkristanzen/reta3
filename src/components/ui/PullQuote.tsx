import { cn } from "@/lib/cn";

interface PullQuoteProps {
  children: string;
  className?: string;
}

/** A short reflective statement from the project, set off by a rule rather than a card. */
export function PullQuote({ children, className }: PullQuoteProps) {
  return (
    <p className={cn("max-w-md border-l-2 border-signal/50 pl-4 font-display text-lg leading-snug text-paper sm:text-xl", className)}>
      “{children}”
    </p>
  );
}
