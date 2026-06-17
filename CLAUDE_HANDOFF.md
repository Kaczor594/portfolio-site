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
Shipped and live. Everything works:
- Sections: topbar · hero · **Live projects** band · selected work (case-study
  modals) · about · CV · footer.
- Behaviors (vanilla JS): dissolving topbar, scrollspy, theme toggle (system
  default + `localStorage` override), work-detail modals (open on click, close on
  Esc/backdrop, focus trap), reduced-motion guard, footer year.
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
- `assets/photos/` — `hero-dolomites.jpeg` (hero bg), `rope-team.jpg` (about).
  Downscaled from ~12 MB → ~1.2 MB via `sips`.
- `assets/logo/monogram.svg` — favicon (self-contained; renders "ik" + moss tick).
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
- Redeploy: `vercel --prod` (or `vercel deploy --prod --yes`) from the repo root.
- **Git auto-deploy is NOT connected** — the Vercel GitHub app lacks access to
  `portfolio-site`. To enable push-to-deploy: Vercel dashboard → project →
  Settings → Git → Connect (grant the app access to the repo). Until then,
  redeploy via the CLI.
- Public URLs: clean **https://isaac-kaczor.vercel.app** (a claimed `.vercel.app`
  alias) + the auto alias `portfolio-ten-eosin-ry7mu3mr3d.vercel.app`. Deployment
  Protection / Vercel Authentication is OFF (required for the clean alias to be
  public).

## Recent Changes
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
- Git push does not auto-deploy (see Deploy) — redeploy manually with `vercel --prod`.
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
- [ ] (Optional) Add a "Download CV (PDF)" link if a canonical CV PDF is produced.
