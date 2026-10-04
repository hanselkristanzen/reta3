import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Leadership" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Credentials" },
];

// Module-level so the active-section observer isn't torn down every render.
const TRACKED_IDS = ["home", ...NAV_ITEMS.map((item) => item.id), "contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection(TRACKED_IDS);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu is a dropdown, not a modal: Escape or a tap elsewhere closes it.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        isScrolled || isOpen ? "border-line bg-void/85 backdrop-blur-md" : "border-transparent",
      )}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#home" className="press-feedback flex items-center gap-3 font-display text-base font-semibold text-paper">
          {/* <span
            className="grid size-8 place-items-center rounded-control bg-cobalt text-[0.8125rem] font-bold tracking-tight text-white"
            aria-hidden="true"
          >
            MN
          </span> */}
          {profile.displayName}
        </a>

        <nav aria-label="Primary" className="hidden items-center md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative inline-flex h-16 items-center px-3.5 text-sm transition-colors duration-200",
                  isActive ? "text-paper" : "text-mist can-hover:text-paper",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3.5 -bottom-px h-0.5 origin-left bg-signal transition-transform duration-200 ease-out",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            );
          })}
          <a
            href="#contact"
            className="press-feedback ml-4 rounded-control bg-cobalt px-4 py-2 text-sm font-medium text-white transition-colors duration-200 can-hover:bg-cobalt-deep"
          >
            Get in touch
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="press-feedback -mr-2 grid size-11 place-items-center text-paper md:hidden"
        >
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Compact dropdown: grid-rows animates the height without measuring it. `inert` keeps
          closed links out of the tab order. */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out md:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="container-page pb-5">
            <ul>
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id} className="border-t border-line">
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "flex items-center justify-between py-3.5 font-display text-xl font-medium",
                        isActive ? "text-signal" : "text-paper",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="press-feedback mt-2 block rounded-control bg-cobalt py-3 text-center text-base font-medium text-white"
            >
              Get in touch
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
