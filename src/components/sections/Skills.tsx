import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionRail } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="section-y border-t border-line">
      <div className="container-page">
        <SectionRail title="Skills">
          <div className="flex flex-col">
            {skillGroups.map((group, index) => (
              <Reveal key={group.label} delay={index * 60} className="border-t border-line py-7 first:border-t-0 first:pt-0">
                <h3 className="text-sm font-semibold text-paper">{group.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </SectionRail>
      </div>
    </section>
  );
}
