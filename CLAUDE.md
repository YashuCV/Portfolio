# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands must be run from the `app/` directory:

```bash
cd app

npm run dev        # Start dev server at http://localhost:5173
npm run build      # Type-check + production build (outputs to app/dist/)
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

Deployment is fully automated — pushing to `main` triggers `.github/workflows/deploy.yml`, which builds from `app/` and deploys to GitHub Pages at `/Portfolio/`.

## Architecture

This is a **single-page portfolio** built with React 19 + TypeScript + Vite. The entire app renders in `app/src/App.tsx` as a vertically stacked sequence of full-screen sections.

### Section pattern

Each section in `app/src/sections/` follows one of two CSS classes defined in `index.css`:
- **`section-pinned`** — `position: relative; width: 100vw; height: 100vh; overflow: hidden` — used for sections with GSAP pin-based scroll animations (Hero, About, Education, Experience, Skills, Projects, Certifications).
- **`section-flowing`** — `position: relative; width: 100%; padding: 5rem 0` — used for unpinned sections.

### GSAP scroll animation pattern

Pinned sections use a two-`useEffect`/`useLayoutEffect` pattern:
1. `useEffect` — entrance animation on mount (runs once, no scroll dependency).
2. `useLayoutEffect` — scroll-driven timeline via `ScrollTrigger` with `pin: true` and `scrub`. Animations are structured in three phases: entrance (0–30%), hold (30–70%), exit (70–100%).

`App.tsx` sets up a global `ScrollTrigger.snap` after a 500ms delay to snap scroll position to the center of each pinned section. All `ScrollTrigger` instances are cleaned up on unmount via `ctx.revert()`.

### Styling conventions

Custom design tokens are defined in **two places** that must stay in sync:
- `app/tailwind.config.js` — Tailwind color extensions (`bg-primary`, `bg-secondary`, `accent-lime`, `text-primary`, `text-secondary`; font families `display`, `mono`).
- `app/src/index.css` — CSS custom properties and component classes (`.glass-card`, `.skill-tag`, `.section-pinned`, `.section-flowing`, `.grain-overlay`, etc.).

The design uses a dark theme: `#0B0C0F` background, `#F2F5F9` primary text, `#B8FF2C` lime accent.

### Path alias

`@` resolves to `app/src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

### Images

Static images live in `app/public/images/` and are referenced with relative paths like `./images/hero_3d.png`. The CI workflow copies `public/images/` into `dist/` after the Vite build.

### UI components

`app/src/components/ui/` contains shadcn/ui components. These are source files (not a published package) and can be edited directly. The `Navigation` component at `app/src/components/Navigation.tsx` uses `document.getElementById` + `scrollIntoView` for in-page navigation.

### Vite base path

`vite.config.ts` sets `base: '/Portfolio/'`. This must match the GitHub repository name for asset paths to work correctly on GitHub Pages.
