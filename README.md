# Isaac Kaczor — portfolio

Personal portfolio site. Static HTML/CSS/JS — no build step, no dependencies.

Editorial, analog aesthetic from Isaac's `kaczor-design` system (paper / stone / moss /
terracotta, Fraunces + EB Garamond + Geist; light-first with a dark toggle). Originated as
a Claude Design handoff; rebuilt here as a real, deployable site. Content is sourced from
`~/job-application-pipeline/profile.json`.

## Structure

```
index.html    one page — topbar · hero · live projects · selected work · about · CV · footer
styles.css    kit styles (ported from the design's ui_kits/portfolio) + live-projects band + responsive
tokens.css    design tokens (colors, type, spacing, shadow, motion) + Google Fonts @import
app.js        topbar dissolve · scrollspy · theme toggle · work-detail modals
assets/
  photos/     hero-dolomites.jpeg, rope-team.jpg
  logo/       monogram.svg (favicon)
```

## View locally

It's static, so any static server works:

```bash
cd ~/claude-projects/portfolio
python3 -m http.server 8088
# open http://localhost:8088
```

(Opening `index.html` directly works too, but a server is closer to production and avoids
any `file://` quirks.)

## Featured projects

- **World Cup 2026 prediction model** — live at https://wc26-dashboard-nu.vercel.app
- **NCAA March Madness model** — dashboard *coming soon*; flip the `.live-card.soon` block in
  `index.html` to an `<a class="live-card" href="…">` once it's live.

## Editing content

- Copy lives inline in `index.html` (no CMS). Keep the voice finding-first, sentence case,
  tabular numerals, no emoji, and frame the forecasting projects as model evaluation against
  market consensus — never as betting.
- Work case studies are pre-rendered `.sheet-scrim[data-sheet="…"]` blocks toggled by the
  matching `.work-card[data-open="…"]`.

## Deploy (when ready)

Any static host. For Vercel: `vercel` from this directory (framework preset **Other**, no
build command, output dir `.`). For GitHub Pages: push and enable Pages on the root.
```
```
