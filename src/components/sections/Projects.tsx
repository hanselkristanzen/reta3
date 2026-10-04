import { lazy, Suspense, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PullQuote } from "@/components/ui/PullQuote";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import type { Project, Severity } from "@/types/portfolio";

const ProjectCaseStudyModal = lazy(() =>
  import("@/components/sections/ProjectCaseStudyModal").then((mod) => ({ default: mod.ProjectCaseStudyModal })),
);

const SEVERITY_LABEL: Record<Severity, string> = { high: "High", medium: "Medium", low: "Low" };
const SEVERITY_BAR: Record<Severity, string> = { high: "bg-crimson", medium: "bg-amber", low: "bg-low" };

const SURFACE =
  "group relative overflow-hidden rounded-surface border border-line bg-void transition-colors duration-300 can-hover:border-line-strong";

/**
 * The whole card is one click target: the button's ::after stretches over the
 * card, so there is a single tab stop. Real links inside sit above it (z-10).
 */
function CaseStudyButton({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group/cta inline-flex items-center gap-1.5 text-sm font-medium text-paper transition-colors duration-200 after:absolute after:inset-0 after:content-[''] can-hover:text-signal"
    >
      View case study
      <ArrowUpRight
        size={15}
        className="transition-transform duration-200 group-can-hover/cta:translate-x-0.5 group-can-hover/cta:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  );
}

function Tools({ tools, className }: { tools: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Tools">
      {tools.map((tool) => (
        <li key={tool}>
          <Badge>{tool}</Badge>
        </li>
      ))}
    </ul>
  );
}

function Metrics({ items }: { items?: { label: string; value: string }[] }) {
  if (!items?.length) return null;
  return (
    <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
      {items.map((metric) => (
        <div key={metric.label}>
          <dd className="font-display text-xl font-semibold text-paper tabular-nums">{metric.value}</dd>
          <dt className="type-meta">{metric.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/** Image cell with the shared hover treatment: a slow 3% scale, pointer devices only. */
function Shot({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-can-hover:scale-[1.03]"
      />
    </div>
  );
}

/**
 * Same proportions for every two-up card: a 16:10 media box, then a text body with its actions pinned to the
 * bottom. The box clips (overflow-hidden) so a tall image can never stretch it.
 */
function ProjectCard({
  project,
  media,
  onOpen,
  children,
}: {
  project: Project;
  media: ReactNode;
  onOpen: (project: Project) => void;
  children?: ReactNode;
}) {
  return (
    <article className={cn(SURFACE, "flex h-full flex-col")}>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-raised">
        <div className="absolute inset-0">{media}</div>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-sm font-medium text-signal">{project.category}</p>
        <h3 className="type-h3 mt-2 text-paper">{project.codename ?? project.title}</h3>
        {project.codename && project.title !== project.category && <p className="type-meta mt-1">{project.title}</p>}
        <p className="mt-4 text-mist">{project.summary}</p>
        <Metrics items={project.metrics} />
        <Tools tools={project.tools} className="mt-5" />
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <CaseStudyButton project={project} onOpen={onOpen} />
          {children}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const mobile = projects.find((p) => p.id === "mobile-pentest")!;
  const threat = projects.find((p) => p.id === "threat-modeling")!;
  const edtech = projects.find((p) => p.id === "edtech-platform")!;
  const wastewise = projects.find((p) => p.id === "wastewise")!;
  const [findingsMetric, standardMetric] = mobile.metrics ?? [];

  return (
    <section id="projects" className="section-y border-t border-line bg-ink">
      <div className="container-page">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <h2 className="type-h2 text-paper">What I&rsquo;ve built.</h2>
          <p className="type-lead mt-4 text-mist">
            Hands-on security and software work from coursework and CTF-style group projects, penetration testing,
            threat modeling, and secure development.
          </p>
        </Reveal>

        <div className="flex flex-col gap-6">
          {/* Featured: the mobile pentest. No screenshots on purpose (they'd expose a real system),
              so its visual is the findings themselves, drawn from the real counts. */}
          <Reveal>
            <article className={cn(SURFACE, "grid md:grid-cols-12")}>
              <div className="p-6 sm:p-9 md:col-span-7">
                <p className="text-sm font-medium text-signal">{mobile.category}</p>
                <h3 className="type-h3 mt-2 max-w-md text-paper">{mobile.title}</h3>
                <p className="mt-5 max-w-xl text-mist">{mobile.caseStudy.overview}</p>
                {mobile.quote && <PullQuote className="mt-7">{mobile.quote}</PullQuote>}
                <div className="mt-8">
                  <CaseStudyButton project={mobile} onOpen={setActiveProject} />
                </div>
              </div>

              <div className="border-t border-line bg-ink-raised/60 p-6 sm:p-9 md:col-span-5 md:border-t-0 md:border-l">
                {findingsMetric && (
                  <div>
                    <p className="font-display text-6xl leading-none font-semibold text-paper tabular-nums">
                      {findingsMetric.value}
                    </p>
                    <p className="type-meta mt-2">{findingsMetric.label}</p>
                  </div>
                )}

                {mobile.severityBreakdown && (
                  <div className="mt-6">
                    <div
                      className="flex h-2.5 gap-1"
                      role="img"
                      aria-label={mobile.severityBreakdown.map((s) => `${s.count} ${SEVERITY_LABEL[s.severity]}`).join(", ")}
                    >
                      {mobile.severityBreakdown.map((entry) => (
                        <span
                          key={entry.severity}
                          style={{ flexGrow: entry.count }}
                          className={cn("rounded-sm", SEVERITY_BAR[entry.severity])}
                        />
                      ))}
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {mobile.severityBreakdown.map((entry) => (
                        <li key={entry.severity}>
                          <Badge tone={entry.severity}>
                            {entry.count} {SEVERITY_LABEL[entry.severity]}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {standardMetric && (
                  <p className="mt-6 text-sm text-mist">
                    {standardMetric.label}: <span className="font-medium text-paper">{standardMetric.value}</span>
                  </p>
                )}
                <Tools tools={mobile.tools} className="mt-6" />
              </div>
            </article>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <ProjectCard
                project={threat}
                onOpen={setActiveProject}
                media={
                  threat.documentImage && (
                    <Shot src={threat.documentImage.src} alt={threat.documentImage.alt} className="h-full bg-plate" />
                  )
                }
              />
            </Reveal>

            <Reveal delay={80}>
              <ProjectCard
                project={edtech}
                onOpen={setActiveProject}
                media={
                  edtech.gallery && (
                    <div className="grid h-full grid-rows-[2fr_1fr] gap-px bg-line">
                      <Shot src={edtech.gallery[0].src} alt={edtech.gallery[0].alt} />
                      <div className="grid grid-cols-3 gap-px">
                        {edtech.gallery.slice(1).map((shot) => (
                          <Shot key={shot.src} src={shot.src} alt={shot.alt} />
                        ))}
                      </div>
                    </div>
                  )
                }
              >
                {edtech.link && (
                  <a
                    href={edtech.link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="relative z-10 inline-flex items-center gap-1.5 text-sm text-mist transition-colors can-hover:text-signal"
                  >
                    {edtech.link.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </ProjectCard>
            </Reveal>
          </div>

          {/* Additional project: no imagery exists for it, so it gets a compact row instead of an empty media slot. */}
          <Reveal>
            <article className={cn(SURFACE, "grid gap-6 p-6 sm:p-8 md:grid-cols-12 md:gap-10")}>
              <div className="md:col-span-5">
                <p className="text-sm font-medium text-signal">{wastewise.category}</p>
                <h3 className="type-h3 mt-2 text-paper">{wastewise.title}</h3>
                <Tools tools={wastewise.tools} className="mt-5" />
              </div>
              <div className="md:col-span-7">
                <p className="max-w-xl text-mist">{wastewise.summary}</p>
                {wastewise.quote && <PullQuote className="mt-6">{wastewise.quote}</PullQuote>}
                <div className="mt-7">
                  <CaseStudyButton project={wastewise} onOpen={setActiveProject} />
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>

      <Suspense fallback={null}>
        <ProjectCaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
      </Suspense>
    </section>
  );
}
