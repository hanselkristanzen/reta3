import type { CSSProperties } from "react";
import { profile, profilePhoto } from "@/data/portfolio";

const NAME_LINES = profile.displayName.split(" ");
const [ROLE, ...FOCUS] = profile.positioning.split(" · ");

/**
 * Opening: the name set large over two lines, a one-line role, two clear
 * actions, and the portrait on a plate in the same grey as its own backdrop.
 * The only motion is the one-time entrance (name rises from a mask, plate
 * unveils); nothing loops or reacts to scrolling.
 */
export function Hero() {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container-page grid gap-12 md:grid-cols-12 md:items-end md:gap-x-10">
        <div className="md:col-span-7">
          {/* <p className="inline-flex items-center gap-2.5 text-sm text-mist">
            <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
            Eager to contribute as a SOC Analyst
          </p> */}

          <h1 className="type-display mt-6 text-paper">
            {NAME_LINES.map((word, index) => (
              <span key={word} className="-my-[0.08em] block overflow-hidden py-[0.08em]">
                <span className="hero-rise block" style={{ "--i": index } as CSSProperties}>
                  {word}
                </span>
              </span>
            ))}
            <span className="sr-only"> Roselani Bramanjaya</span>
          </h1>

          <p className="type-lead mt-8 text-paper">
            {ROLE} at {profile.university}
          </p>
          <p className="mt-1.5 max-w-md text-mist">{FOCUS.join(", ")}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="press-feedback rounded-control bg-cobalt px-5 py-3 text-sm font-medium text-white transition-colors duration-200 can-hover:bg-cobalt-deep"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="press-feedback rounded-control border border-line-strong px-5 py-3 text-sm font-medium text-paper transition-colors duration-200 can-hover:border-paper"
            >
              Get in touch
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <dt className="type-meta">University</dt>
              <dd className="mt-1 text-sm text-paper">{profile.university}</dd>
            </div>
            <div>
              <dt className="type-meta">Program</dt>
              <dd className="mt-1 text-sm text-paper">
                {profile.program} · GPA {profile.gpa}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="type-meta">Based in</dt>
              <dd className="mt-1 text-sm text-paper">{profile.contact.location}</dd>
            </div>
          </dl>
        </div>

        <figure className="hero-plate md:col-span-5">
          <div className="overflow-hidden rounded-surface bg-plate">
            <img
              src={profilePhoto}
              alt={`Portrait of ${profile.fullName}`}
              width={1000}
              height={1500}
              fetchPriority="high"
              decoding="async"
              className="aspect-[5/6] w-full object-cover object-[50%_18%] md:aspect-[4/5]"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
