# portfolio-site — Project Instructions

Isaac Kaczor's personal portfolio. **Static HTML/CSS/JS — no build, no
dependencies, no framework.** Live at https://isaac-kaczor.vercel.app.

## Git Workflow
- Single repo, branch `main` (own git repo nested under `~/claude-projects/`; the
  home dir is a separate repo — keep them straight).
- **Never `git add -A`** — stage explicit paths.
- Never stage: `.vercel/`, `.claude/`, `node_modules/`, `.DS_Store` (gitignored).
- End commit messages with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Commit/push only when asked.

## Tooling
- No package manager / build. View locally: `python3 -m http.server 8088`.
- Deploy: `vercel --prod` from the repo root (Vercel project `portfolio`, team
  `kaczor594s-projects`; static, preset Other, output dir `.`). Git push does NOT
  auto-deploy — redeploy via CLI.
- Functional checks: headless Chrome at
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
  (+ `puppeteer-core` in a throwaway dir if scripting clicks).

## Key Files
- `index.html` — entire page. Case-study modals are pre-rendered
  `.sheet-scrim[data-sheet="…"]` toggled by `.work-card[data-open="…"]`. Head
  holds canonical/OG tags (absolute, pointing at the prod domain).
- `styles.css` — kit styles + `.live-*` band + responsive (`@media` 880/480) +
  a11y/reduced-motion. Imports `tokens.css` first.
- `tokens.css` — vendored `kaczor-design` tokens; **keep whole** (mirrors the set
  used in wc26-dashboard and municipal-analytics-app).
- `app.js` — vanilla behaviors: topbar dissolve, scrollspy, theme toggle
  (system + `localStorage`), modals (Esc/backdrop + focus trap), footer year.
- `assets/` — `photos/hero-dolomites.jpeg`, `photos/rope-team.jpg`,
  `logo/monogram.svg` (favicon).

## Content rules
- Copy is inline in `index.html` (no CMS). Source of truth is
  `~/job-application-pipeline/profile.json`.
- Voice: finding-first, sentence case, tabular numerals, **no emoji**. Frame the
  forecasting projects (World Cup, cbb) as model evaluation vs. market consensus —
  **never as betting/gambling**. Don't present AI-generated frontends (e.g.
  Next.js) as personal engineering skills. Municipal Analytics is a normal role —
  never "freelance".
