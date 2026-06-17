# CV asset

`Isaac-Kaczor-CV.pdf` is what the site's "Download CV (PDF)" button serves.

- **Content source:** `~/job-application-pipeline/profile.json` (approved facts).
- **Layout source:** `Isaac-Kaczor-CV.src.html` (self-contained; Fraunces + Geist
  via Google Fonts, natural palette matching the site).

## Regenerate

```sh
cd ~/claude-projects/portfolio/assets/cv
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="Isaac-Kaczor-CV.pdf" --virtual-time-budget=4000 \
  "file://$PWD/Isaac-Kaczor-CV.src.html"
```

## Replace

You can drop **any** PDF here as long as it's named `Isaac-Kaczor-CV.pdf` — e.g. a
résumé exported from the `job-application-pipeline` LaTeX system. No code change
needed; the button just links to this path.
