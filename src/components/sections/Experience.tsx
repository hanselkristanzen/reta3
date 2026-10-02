import { Maximize2 } from "lucide-react";
import { Additional } from "@/components/sections/Additional";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { HighlightNumbers } from "@/components/ui/HighlightNumbers";
import { useLightbox } from "@/components/ui/LightboxProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionRail } from "@/components/ui/SectionHeading";
import { organizationRoles } from "@/data/portfolio";

export function Experience() {
  const openLightbox = useLightbox();

  return (
    <section id="experience" className="section-y border-t border-line">
      <div className="container-page">
        <SectionRail
          title="Leading people, not just projects."
          description="Cross-team coordination and event leadership within HIMTI, BINUS University's Informatics student association."
        >
          <ol className="flex flex-col">
            {organizationRoles.map((role) => (
              <li key={role.id} className="relative border-l border-line pb-14 pl-6 last:pb-0 sm:pl-8">
                <span
                  className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-cobalt ring-4 ring-void"
                  aria-hidden="true"
                />
                <Reveal>
                  <p className="type-meta">{role.dateRange}</p>
                  <h3 className="type-h3 mt-1.5 text-paper">{role.title}</h3>
                  <p className="mt-1 text-mist">{role.org}</p>

                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_12.5rem] lg:gap-8">
                    <div>
                      <ul className="flex max-w-xl flex-col gap-3">
                        {role.achievements.map((achievement) => (
                          <li key={achievement} className="flex gap-3 text-mist">
                            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" aria-hidden="true" />
                            <span>
                              <HighlightNumbers text={achievement} />
                            </span>
                          </li>
                        ))}
                      </ul>

                      {role.certificate && (
                        <button
                          type="button"
                          onClick={() => role.certificate && openLightbox(role.certificate)}
                          className="press-feedback mt-6 inline-flex items-center gap-2 rounded-control border border-line px-3.5 py-2 text-sm text-mist transition-colors can-hover:border-signal/50 can-hover:text-signal"
                        >
                          <Maximize2 size={14} aria-hidden="true" />
                          View certificate
                        </button>
                      )}
                    </div>

                    {role.photos?.[0] && (
                      <EditorialImage
                        photo={role.photos[0]}
                        onOpen={openLightbox}
                        aspect="aspect-[4/3]"
                        className="max-w-xs lg:max-w-none"
                      />
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </SectionRail>

        <Additional />
      </div>
    </section>
  );
}
