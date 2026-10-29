# Mohamed Alaa — Portfolio

Bilingual (EN / Egyptian-Arabic) single-page portfolio for **Mohamed Alaa**, web
developer in Cairo. Dark-gold aesthetic: a WebGL field of drifting gold particles
(Particles, React Bits) behind the page — the camera dives deeper into the field
as you scroll, the stream accelerates, particles brighten, and near the contact
section they link up into a constellation. Fast scrolling cracks the field:
velocity drives a twinkle surge, a drift burst and a subtle skew on headlines.

**Stack:** React 19 + Vite 7 + GSAP (ScrollTrigger) + Particles (WebGL2) · no UI libraries.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## What's inside

| Piece | Where |
| --- | --- |
| Particles field background (React Bits, with a local `dynamic` prop so GSAP drives camera / speed / glow / opacity / drift per frame) | `src/components/Particles.jsx` + `Particles.css` |
| Scroll engine: intro reveal, word-mask hero, background parallax, section-title drift, icon float, pinned steps, contact ghost word, velocity skew + particle boost, scroll-spy, progress bar | `src/App.jsx` |
| Hero (name as word masks — Arabic-safe) | `src/components/Hero.jsx` |
| Services (4 cards, 3D tilt-in, floating icons) | `src/components/Services.jsx` |
| Steps (3 steps, pinned rail that draws on desktop) | `src/components/Steps.jsx` |
| Contact (Phone/WhatsApp + Email, copy-email, scrubbed ghost word) | `src/components/Contact.jsx` |
| Stroke icon set | `src/components/Icons.jsx` |
| All copy (EN + Egyptian Arabic) | `src/i18n.js` |
| Theme tokens + all styling | `src/index.css` |

## Customize (the manager's checklist)

1. **Contact info** — `contact.channels` in `src/i18n.js` (one Phone/WhatsApp card + email).
2. **Copy** — everything lives in `src/i18n.js`, both languages side by side.
3. **Colors** — tokens at the top of `src/index.css` (`--accent`, `--bg`, `--ink`…), plus the particle color arrays in `src/App.jsx` (`particleProps`).
4. **Services / steps** — `services.items` and `steps.items` in `src/i18n.js`.
5. **Brand line** — `brand.est` in `src/i18n.js` (currently `EST. 2026 · CAIRO`).

## Deploy to Cloudflare Pages

This repository **is** the site: `package.json` sits at the repo root, so Cloudflare
Pages builds it with no root-directory override.

Settings in **Cloudflare dashboard -> Workers & Pages -> your project -> Settings -> Build**:

| Setting | Value |
| --- | --- |
| Framework preset | React (Vite) |
| Root directory | *(empty - the repository root)* |
| Build command | `npm run build` |
| Build output directory | `dist` |

If a build fails with `Cannot find cwd: /opt/buildhome/repo/<folder>`, the **Root
directory** field still names a folder that does not exist here - clear it.

Why the other files exist:

- `.nvmrc` pins Node 22 - Vite 7 needs `^20.19.0 || >=22.12.0` and the Pages default can be older.
- `package.json` -> `engines` mirrors that requirement.
- `public/_redirects` serves `index.html` for unknown paths, so deep links get the SPA instead of a Cloudflare 404.
- `public/logo/logo.png` is referenced by `index.html` as the favicon but is not committed yet - add the real file.

Before this commit the repo only held a flat copy of `src/` - no `package.json`, no
`index.html`, no Vite config - so every deployment failed before Vite ever started.

## Notes

- Dark theme is default; light theme switches the field to dark-gold ink on paper (`lightMode`).
- Arabic is Egyptian colloquial, RTL via `dir` + logical CSS; the name is split into **word** masks only, never letters, so Arabic shaping never breaks.
- Animations respect `prefers-reduced-motion` (static fallback, field paused).
- Fonts: Cairo (display) + IBM Plex Sans / IBM Plex Sans Arabic (body) via Google Fonts.
- Dev-only gotcha, handled: React StrictMode double-mounts effects — the Particles cleanup never kills the GL context (a lost context composites as an opaque white layer over the page), and the component self-heals from real context loss.
