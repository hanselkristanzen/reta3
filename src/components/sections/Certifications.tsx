import { CertificateThumb } from "@/components/ui/CertificateThumb";
import { useLightbox } from "@/components/ui/LightboxProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionRail } from "@/components/ui/SectionHeading";
import { certifications, languages } from "@/data/portfolio";

export function Certifications() {
  const openLightbox = useLightbox();

  return (
    <section id="certifications" className="section-y border-t border-line">
      <div className="container-page">
        <SectionRail title="Certifications & Languages">
          <ul className="flex flex-col">
            {certifications.map((cert) => (
              <li key={cert.id} className="border-t border-line py-7 first:border-t-0 first:pt-0">
                <Reveal className="grid gap-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  {cert.certificateImage && <CertificateThumb image={cert.certificateImage} onOpen={openLightbox} />}
                  <div className={cert.certificateImage ? "" : "sm:col-start-2"}>
                    <h3 className="font-display text-lg font-semibold text-paper">{cert.title}</h3>
                    <p className="mt-1 text-mist">{cert.issuer}</p>
                    <p className="type-meta mt-1.5">{cert.date}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-4 border-t border-line pt-7">
            <h3 className="text-sm font-semibold text-paper">Languages</h3>
            <ul className="mt-4 max-w-xs">
              {languages.map((entry) => (
                <li key={entry.language} className="flex items-baseline justify-between border-t border-line py-2.5 first:border-t-0">
                  <span className="text-paper">{entry.language}</span>
                  <span className="type-meta">{entry.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </SectionRail>
      </div>
    </section>
  );
}
