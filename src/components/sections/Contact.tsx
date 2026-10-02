import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/portfolio";

/** The closing band: the page's one full-bleed colour block, so the ending reads as an ending. */
export function Contact() {
  const { contact } = profile;
  const telHref = `tel:${contact.phone.replace(/[^+\d]/g, "")}`;
  const link = "press-feedback underline-offset-4 transition-colors can-hover:text-white can-hover:underline";

  return (
    <section id="contact" className="on-cobalt section-y bg-cobalt">
      <div className="container-page">
        <Reveal>
          <h2 className="type-h2 max-w-2xl text-white">Let&rsquo;s build something secure.</h2>
          <p className="type-lead mt-5 max-w-md text-on-cobalt">
            Open to opportunities in cybersecurity, security engineering, penetration testing, and SOC-related roles.
          </p>

          <a
            href={`mailto:${contact.email}`}
            className="press-feedback group mt-10 flex items-center gap-3 border-t border-white/30 pt-6 font-display text-[clamp(1.25rem,5.4vw,2.5rem)] leading-tight font-semibold text-white [overflow-wrap:anywhere]"
          >
            <span className="min-w-0">{contact.email}</span>
            <ArrowUpRight
              className="size-[0.8em] shrink-0 transition-transform duration-200 group-can-hover:translate-x-1 group-can-hover:-translate-y-1"
              aria-hidden="true"
            />
          </a>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-on-cobalt">
            <a href={contact.linkedin} target="_blank" rel="noreferrer noopener" className={link}>
              LinkedIn
            </a>
            <a href={telHref} className={link}>
              {contact.phone}
            </a>
            <span>{contact.location}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
