# Claude Code Handoff — portfolio-site

> Last updated: 2026-06-17
> Repo: https://github.com/Kaczor594/portfolio-site.git
> Branch: main

## Project Summary
Isaac Kaczor's recruiter-facing personal portfolio. A single-page **static
HTML/CSS/JS** site — no build step, no dependencies, no framework. Uses the
`kaczor-design` system (editorial/analog look: paper/stone/moss/terracotta,
Fraunces + EB Garamond + Geist, light-first with a dark toggle). Originated as a
Claude Design handoff; rebuilt here as a real, deployable site. **Live at
https://isaac-kaczor.vercel.app.**

## Current State
Shipped and live (last deploy 2026-06-17). Everything works:
- Sections: topbar · hero · selected work (case-study modals) · **Live projects**
  band · about · CV · footer. (Professional work leads; sports forecasting follows.)
- Hero shows a target-role band ("Open to data, analytics & actuarial roles") and a
  "See my work" primary CTA → `#work`.
- CV section has a **Download CV (PDF)** button → `assets/cv/Isaac-Kaczor-CV.pdf`
  (a generated one-page CV; swap the file freely — see `assets/cv/README.md`).
- Behaviors (vanilla JS): dissolving topbar, scrollspy, theme toggle (system
  default + `localStorage` override), work-detail modals (open on click, close on
  Esc/backdrop, focus trap), reduced-motion guard, footer year.
- SEO/perf: `robots.txt` + `sitemap.xml` live; hero served as WebP (~122K) via CSS
  `image-set()` with a ~263K JPEG fallback.
- Verified: no horizontal overflow ≥360px, dark mode (system + toggle), modals,
  all assets 200, OG/canonical absolute URLs resolve. Public (Deployment
  Protection disabled).

## Environment Setup
No install needed — it's static. To view locally:
```bash
cd ~/claude-projects/portfolio
python3 -m http.server 8088   # open http://localhost:8088
```
Fonts load from Google Fonts CDN (in `tokens.css` `@import`). To screenshot /
functionally test, headless Chrome at
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` + (optionally)
`puppeteer-core` installed in a throwaway /tmp dir.

## File Structure
- `index.html` — the whole page. Work case studies are pre-rendered
  `.sheet-scrim[data-sheet="…"]` blocks toggled by matching
  `.work-card[data-open="…"]`. Head has title/description/canonical/OG tags.
- `styles.css` — kit styles ported from the design's `ui_kits/portfolio`, plus
  the new `.live-*` band, responsive `@media` blocks (880px / 480px), a11y
  (skip-link, focus rings), and reduced-motion. `@import url('tokens.css')` first.
- `tokens.css` — vendored `kaczor-design` tokens (colors, type, spacing, shadow,
  motion) + Google Fonts `@import`. Kept whole on purpose (mirrors the token set
  in wc26-dashboard and municipal-analytics-app); do not trim.
- `app.js` — vanilla behaviors (see Current State). No framework.
- `assets/photos/` — `hero-dolomites.jpeg` + `hero-dolomites.webp` (hero bg, served
  via CSS `image-set()`; WebP primary ~122K, JPEG fallback ~263K), `rope-team.jpg` (about).
- `assets/cv/` — `Isaac-Kaczor-CV.pdf` (the Download-CV button target),
  `Isaac-Kaczor-CV.src.html` (layout source), `README.md` (regen steps).
- `assets/logo/monogram.svg` — favicon (self-contained; renders "ik" + moss tick).
- `robots.txt` + `sitemap.xml` — SEO; robots references the sitemap.
- `deploy.sh` — deploy + canonical re-alias (see Deploy).
- `README.md` — view/deploy/editing notes.
- `.claude/cleanup_report.md` — gitignored, not in the repo.

## Architecture
Flat static site. `index.html` loads `styles.css` (which imports `tokens.css`)
and `app.js`. No data fetching, no backend, no JS framework. Content is authored
inline in `index.html` (no CMS). Source of truth for the *copy* is
`~/job-application-pipeline/profile.json`.

## Git Workflow
- Single repo, branch `main`. This is its own git repo nested under
  `~/claude-projects/` (the home dir is a separate repo — don't confuse them).
- **Never `git add -A`**; stage explicit paths.
- Never stage: `.vercel/`, `.claude/`, `node_modules/`, `.DS_Store` (all
  gitignored).
- End commit messages with the `Co-Authored-By: Claude Opus 4.8` line.

## Deploy
- Vercel project **`portfolio`** (team `kaczor594s-projects`). Static, framework
  preset Other, no build, output dir `.`.
- **Redeploy: `./deploy.sh` from the repo root.** It runs `vercel --prod` then
  re-aliases `isaac-kaczor.vercel.app` to the new deployment. ⚠️ Do NOT use a bare
  `vercel --prod`: `isaac-kaczor.vercel.app` is a manual `.vercel.app` alias, not the
  project's auto-following production domain, so `--prod` alone leaves the live site
  on the OLD build. (Root-cause fix for later: attach the domain as a Production
  domain in the Vercel dashboard, then plain `--prod` auto-aliases it and `deploy.sh`
  can retire.)
- **Git auto-deploy is NOT connected** — the Vercel GitHub app lacks access to
  `portfolio-site`. To enable push-to-deploy: Vercel dashboard → project →
  Settings → Git → Connect (grant the app access to the repo). Until then,
  redeploy via the CLI.
- Public URLs: clean **https://isaac-kaczor.vercel.app** (a claimed `.vercel.app`
  alias) + the auto alias `portfolio-ten-eosin-ry7mu3mr3d.vercel.app`. Deployment
  Protection / Vercel Authentication is OFF (required for the clean alias to be
  public).

## Recent Changes
### Session 2026-06-17 (site pass — review fixes)
Acting on a multi-agent employer review of the live site. Two commits (`6e04283`,
`2a68ca1`), **not yet pushed to GitHub**; deployed to prod via `./deploy.sh`.
- Added a **Download CV (PDF)** button + `assets/cv/` (generated one-page PDF,
  `*.src.html` layout source rendered with headless Chrome, `README.md` regen steps).
- **Reordered** so Selected work (Holidu, Municipal) precedes the sports Live
  projects; updated the nav, the `app.js` scrollspy `spy` array, and the hero CTA.
- Added a target-role band above the fold (kept as a band, not one title, since the
  roles applied to vary).
- SEO/perf: added `robots.txt` + `sitemap.xml`; optimized the hero (645K → 122K
  WebP via `image-set()`, 263K JPEG fallback).
- Added **`deploy.sh`** (deploy + re-alias the manual `isaac-kaczor.vercel.app`
  alias) after discovering a bare `vercel --prod` left the canonical domain on the
  old build. Fixed stale `vercel --prod` deploy docs across CLAUDE.md / this file /
  README. Ran `/clean` (report at `.claude/cleanup_report.md`, all items resolved).

### Session 2026-06-17 (build → ship)
- Built the site from the Claude Design handoff bundle; rebuilt the React-CDN
  prototype as static HTML/CSS/JS. Added a "Live projects" band (World Cup 2026
  model = live link; March Madness/cbb = "coming soon").
- Content from `profile.json`. Iterated on copy: removed hero stat strip; dropped
  the cbb +3.0 pp market claim (flagged "pre-cleanup" in the cbb handoff) for
  structural facts; removed Next.js from the WC stack (AI-generated frontends not
  presented as personal skills); reframed the Municipal card as a
  data-standardization + rate-optimization engine (focus project:
  `~/municipal-analytics-app`); removed the synthetic Bundesliga chart;
  Americanized spellings; de-pigeonholed the About copy; fixed the photo caption
  (Piz Buin, Vorarlberg, 2025).
- Also edited `~/job-application-pipeline/profile.json` (separate repo): expanded
  the Holidu data-spine bullet (collaboration + groupings/Slack/troubleshooting/
  dashboards) and added a `municipal-analytics-app` projects entry.
- Ran `/clean`: removed dead CSS/JS/assets orphaned by the edits.
- Shipped: 2 commits, pushed to GitHub, deployed to Vercel prod, set
  canonical/OG to the production domain.

## Known Issues
- Git push does not auto-deploy (see Deploy) — redeploy with `./deploy.sh`.
- At <320px viewport the theme toggle clips ~16px (no page scroll; 320px is
  effectively extinct). Fine ≥360px.
- OG/canonical are hardcoded to `isaac-kaczor.vercel.app`; if a custom domain
  (e.g. isaackaczor.com) is added later, update the head tags + redeploy.

## Next Steps
- [ ] When the cbb/March Madness dashboard ships: flip the `.live-card.soon`
  block in `index.html` from a `<div>` to an `<a class="live-card" href="…">`
  and update its stats; redeploy.
- [ ] (Optional) Connect Vercel ↔ GitHub for push-to-deploy.
- [ ] (Optional) Add a custom domain in Vercel and update head tags.
- [x] Add a "Download CV (PDF)" link — done (button in the CV section + a generated
  one-page PDF at `assets/cv/`; swap in a pipeline résumé export anytime).
