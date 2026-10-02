import { EditorialImage } from "@/components/ui/EditorialImage";
import { useLightbox } from "@/components/ui/LightboxProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionRail } from "@/components/ui/SectionHeading";
import { additionalInvolvement } from "@/data/portfolio";

/**
 * Events and recognition that have photographic evidence but no CV entry,
 * rendered inside Leadership. Event, role label, and images only: no
 * invented titles, dates, or responsibilities. An award slide, where one
 * exists, sits inline with the photos instead of behind a button.
 */
export function Additional() {
  const openLightbox = useLightbox();

  return (
    <div id="additional" className="mt-16 border-t border-line pt-14 md:mt-24 md:pt-20">
      <SectionRail title="Other events and recognition." level="sub">
        <ul className="flex flex-col">
          {additionalInvolvement.map((entry) => {
            const images = [...entry.photos, ...(entry.recognition ? [entry.recognition.image] : [])];
            return (
              <li key={entry.id} className="border-t border-line py-8 first:border-t-0 first:pt-0">
                <Reveal className="grid gap-5 lg:grid-cols-[11rem_1fr] lg:gap-8">
                  <div>
                    <h4 className="font-display text-xl font-semibold text-paper">{entry.event}</h4>
                    <p className="mt-1 text-sm text-mist">{entry.role}</p>
                    {entry.recognition && <p className="mt-3 text-sm leading-snug text-signal">{entry.recognition.label}</p>}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {images.map((photo) => (
                      <EditorialImage
                        key={photo.src}
                        photo={photo}
                        onOpen={openLightbox}
                        aspect="aspect-[4/3]"
                        position="object-[center_40%]"
                      />
                    ))}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </SectionRail>
    </div>
  );
}
