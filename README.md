# Margareta Nadya — Cyber Security Portfolio

An editorial, art-directed portfolio for Margareta Nadya Roselani Bramanjaya, a
Cyber Security student at BINUS University. Built with React, Vite,
TypeScript, and Tailwind CSS v4.

Every fact on the site — dates, GPA, organizational titles, project scope,
tools, metrics — is sourced from the CV or from certificates/photos/project
case studies supplied directly. See **Content accuracy** below.

## Getting started

```bash
npm install
npm run dev       # dev server, usually http://localhost:5173
```

```bash
npm run build      # type-check + production build → dist/
npm run preview    # preview the production build locally
npm run lint       # oxlint
```

Deploy `dist/` anywhere static: on Vercel or Netlify, framework preset
"Vite", no extra config needed.

This repo is git-initialized with one commit per build phase, so you can
`git log --oneline` to see how the design evolved and `git diff` between
phases if you want to roll part of it back.

## Project structure

```text
src/
├── assets/images/        Optimized WebP photos, certificates, project shots
├── components/
│   ├── sections/         Page sections (Hero, About, Projects, ...)
│   └── ui/                Reusable primitives (Dialog, Reveal, EditorialImage, ...)
├── data/portfolio.ts      All content — the single source of truth
├── types/portfolio.ts     TypeScript interfaces for the data above
├── hooks/                 useActiveSection (navbar), useDialogBehavior (modals)
├── lib/cn.ts              Tiny classnames helper
├── App.tsx
├── main.tsx
└── index.css              Design tokens, type roles, layout utilities, motion
```

To change any text, edit `src/data/portfolio.ts` — components read from
there rather than hardcoding copy.

## Design system

Everything lives in `src/index.css`; components never set ad hoc sizes or colours.

- **Palette**: sampled from the portrait. `void`/`ink`/`ink-raised` are a deep
  navy base, `paper`/`mist` are the text colours, `cobalt` is the fill colour
  (primary buttons, the monogram, the contact band), and `signal` is the same
  hue lifted for accent text on dark. `plate` is the portrait's own grey
  backdrop. Severity colours (`crimson` / `amber` / `low`) are semantic and
  independent of the brand hue.
- **Type**: two families only. Bricolage Grotesque (display, with its optical-size
  axis) and Instrument Sans (everything else). Six roles as utilities:
  `type-display`, `type-h2`, `type-h3`, `type-lead`, `type-meta`, plus body.
- **Layout**: `container-page` (one container width) and `section-y` (one
  vertical rhythm). Most sections use `SectionRail`: a title column on the left
  (sticky on wide screens) and content on the right. Projects (a lighter full-bleed
  band) and Contact (a cobalt band) deliberately break the pattern.
- **Radius**: two steps, `rounded-control` for buttons/chips and
  `rounded-surface` for cards and the portrait.
- **Motion**: one orchestrated entrance in the hero, a quiet `Reveal`
  (opacity + 8px) for content, hover scale on project images, and the nav
  and mobile-menu transitions. Nothing scrubs against scroll. Under
  `prefers-reduced-motion`, animations and movement are removed.
- **`can-hover:`** replaces Tailwind's `hover:` everywhere. It is gated behind
  `@media (hover: hover) and (pointer: fine)`, so tapping on touch devices never
  leaves an element stuck mid-hover.
- **Navigation**: a fixed top bar (monogram + name, five links, a "Get in touch"
  button) with an active-section underline driven by `useActiveSection`, and a
  blurred background that appears on scroll. On mobile it becomes a hamburger with a
  compact dropdown; tapping a link, pressing Escape, or tapping outside closes it.

## Content accuracy

- CV facts (dates, GPA, titles, project scope, tools, metrics) are
  transcribed verbatim or lightly reworded for flow — never changed in
  substance.
- ICPC Asia Jakarta 2025 and Codeavour 7.0 are shown as photo evidence
  only, with no invented title, date, or responsibilities.
- The HILET "2nd Place — Best Noble, House Highspire" recognition is
  shown under SESVENT 2025 using the exact wording on the award slide,
  since it differs from "Best Mentor Award."
- **The Mobile Application Penetration Tester project deliberately omits
  the hospital's real name and does not reproduce the four technical
  evidence screenshots supplied for it.** Those images show a live API
  domain, real JWT payloads, an exposed email address, and a working
  OTP-brute-force sequence against a named, presumably still-operational
  hospital system — not appropriate for a public, search-indexable
  portfolio regardless of the academic context. Its visual is an
  abstract severity bar drawn from the real finding counts (1 High, 2 Medium,
  3 Low), and the write-up stays at the same descriptive level the CV already
  used.
- The ThreatBlueprint cover is cropped to its title area in the project card,
  so the group members' names and student IDs further down the page are not
  prominently displayed.
- WasteWise (project 04) has no CV entry; everything shown is drawn
  directly from the project image supplied for it, presented
  conservatively as an additional project.
- The EdTech project's case-study image states "22 math topics" while the
  CV says "30+" — the CV's figure was kept as the on-site claim since the
  CV is the designated source of truth; this discrepancy is simply
  worth knowing about.

## Accessibility & performance

- Skip-to-content link, semantic landmarks, full keyboard support, visible focus
  states (white on the cobalt band), `aria-current` on the active nav link, and a
  mobile menu whose closed links are `inert`. The project case-study modal and
  image lightbox share one focus-trapped, Escape-to-close dialog.
- All motion is removed under `prefers-reduced-motion`.
- The case-study modal and the lightbox are code-split (`React.lazy`).
- Photos and certificates are optimized WebP, lazy-loaded below the fold.
- `viewport-fit=cover` + `env(safe-area-inset-*)` so the fixed header clears
  notches and home indicators.
- Removing `gsap`, `@gsap/react` and `motion` (used only by three decorative
  effects) cut the main JS bundle from ~525 kB to ~266 kB (~175 kB to ~84 kB gzipped).
