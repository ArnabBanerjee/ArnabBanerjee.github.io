# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Layout

This repo hosts a personal portfolio site. The active project is in `MyPortfolio/`. The root `index.html` and `css/`/`scripts/` directories are the old static site (being replaced).

```
MyPortfolio/          ← active SolidJS portfolio
  src/
    app.jsx           ← root component, section order
    index.jsx         ← SolidJS entry point
    index.css         ← CSS custom properties + Tailwind import
    data/resume.js    ← single source of truth for all content
    lib/animations.js ← GSAP + ScrollTrigger setup, shared helpers
    components/       ← one file per section + shared components
    assets/animations/  ← .lottie files
```

## Commands

All commands run from `MyPortfolio/`:

```bash
bun run dev      # dev server on :3000
bun run build    # production build → dist/
bun run serve    # preview the production build
```

Node ≥ 22 required; `bun` is the preferred package manager (lockfile present).

## Architecture

**Stack:** SolidJS + Vite + Tailwind CSS v4 (via `@tailwindcss/vite`). No router — single page with anchor-based nav.

**Content:** All text, links, experience, skills, certifications, and education live in `src/data/resume.js`. Update this file to change any displayed content; components consume it directly.

**Animations:** `src/lib/animations.js` exports a pre-configured `gsap` and `ScrollTrigger` instance, plus `splitChars`, `splitWords`, `revealOnScroll`, and `animateCounter` helpers. All GSAP context objects must be reverted in `onCleanup` to avoid memory leaks. Nav link underlines use Vivus (SVG stroke animation).

**Key components:**
- `SectionWrapper` — standard section shell with animated title + accent underline; wraps every main section. Props: `id`, `title`, `dark` (alternates `bg-surface` vs `bg-bg`).
- `LottiePlayer` — canvas-based `.lottie` renderer via `@lottiefiles/dotlottie-web`; lazy-loaded.
- `SkillsCanvas` — canvas particle system floating skill names derived from `resume.coreStack` + `resume.skills`.
- `Nav` — fixed top nav with IntersectionObserver active-section tracking, scroll-based blur, GSAP entrance, and full-screen mobile overlay.

**CSS design tokens** (defined in `index.css`, consumed everywhere via `var()`):

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#020617` | page background |
| `--color-surface` | `#0f172a` | alternate section bg |
| `--color-card` | `#1e293b` | card/chip backgrounds |
| `--color-accent` | `#38bdf8` | primary accent (sky-400) |
| `--color-text` | `#f1f5f9` | body text |
| `--color-muted` | `#94a3b8` | secondary text |
| `--nav-height` | `64px` | nav offset for scroll-margin |

Tailwind classes reference these tokens as `text-(--color-accent)`, `bg-(--color-card)`, etc. — using the CSS-variable shorthand syntax supported by Tailwind v4.

**Path alias:** `~` resolves to `src/` (configured in `vite.config.js`).

**Asset imports:** `.lottie` files must be imported with the `?url` suffix: `import src from "~/assets/animations/Foo.lottie?url"`.
