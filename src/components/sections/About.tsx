import { Education } from "@/components/sections/Education";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionRail } from "@/components/ui/SectionHeading";
import { profile } from "@/data/portfolio";

const FOCUS_AREAS = [
  "Offensive Security",
  "Blue Team Fundamentals",
  "Secure Programming",
  "Threat Modeling",
  "Leadership",
  "Cross-Team Coordination",
];

// The summary reads as three sentences; the first is the headline, the rest supporting detail.
const SENTENCES = profile.summary.match(/[^.]+\./g) ?? [profile.summary];
const LEAD = SENTENCES[0].trim();
const REST = SENTENCES.slice(1).join(" ").trim();

export function About() {
  return (
    <section id="about" className="section-y border-t border-line">
      <div className="container-page">
        <SectionRail title="About">
          <Reveal>
            <p className="type-lead max-w-2xl text-paper">{LEAD}</p>
            {REST && <p className="mt-5 max-w-2xl text-mist">{REST}</p>}
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Focus areas">
              {FOCUS_AREAS.map((label) => (
                <li key={label}>
                  <Badge>{label}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </SectionRail>

        <Education />
      </div>
    </section>
  );
}
