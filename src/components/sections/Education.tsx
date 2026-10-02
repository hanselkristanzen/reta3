import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionRail } from "@/components/ui/SectionHeading";
import { education } from "@/data/portfolio";

/** Rendered inside About: education is part of the same story, not its own full-height section. */
export function Education() {
  return (
    <div id="education" className="mt-16 border-t border-line pt-14 md:mt-24 md:pt-20">
      <SectionRail title="Education" level="sub">
        <ul className="flex flex-col">
          {education.map((entry) => (
            <li key={entry.id} className="border-t border-line py-7 first:border-t-0 first:pt-0">
              <Reveal className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <p className="type-meta sm:pt-1.5">{entry.dateRange}</p>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4 className={entry.emphasis ? "type-h3 text-paper" : "font-display text-lg font-semibold text-paper"}>
                      {entry.school}
                    </h4>
                    {entry.gpa && <span className="text-sm font-medium text-signal tabular-nums">{entry.gpa}</span>}
                  </div>
                  <p className="mt-1 text-mist">{entry.credential}</p>
                  {entry.coursework && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Coursework">
                      {entry.coursework.map((course) => (
                        <li key={course}>
                          <Badge>{course}</Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </SectionRail>
    </div>
  );
}
