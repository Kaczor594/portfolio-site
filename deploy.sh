#!/usr/bin/env bash
# Deploy the portfolio to production AND move the canonical alias to it.
#
# Why this script exists: isaac-kaczor.vercel.app is a bare *.vercel.app alias
# that was manually pointed at a deployment — it is NOT the project's
# auto-following production domain. So `vercel --prod` on its own updates the
# project's default URLs but leaves isaac-kaczor.vercel.app on the OLD build.
# This script runs the deploy, then re-aliases the canonical domain to the
# fresh deployment. Always deploy with this, not a bare `vercel --prod`.
set -euo pipefail
cd "$(dirname "$0")"

ALIAS="isaac-kaczor.vercel.app"

echo "→ Deploying to production…"
# When stdout is not a TTY, the Vercel CLI prints the deployment URL to stdout
# and progress to stderr. Extract the deployment URL from stdout to be safe.
out="$(npx vercel --prod --yes)"
url="$(printf '%s\n' "$out" | grep -Eo 'https://[a-z0-9.-]+\.vercel\.app' | tail -1)"

if [ -z "${url:-}" ]; then
  echo "✗ Could not determine deployment URL. Output was:" >&2
  printf '%s\n' "$out" >&2
  exit 1
fi
echo "→ Deployed: $url"

echo "→ Aliasing $ALIAS → $url"
npx vercel alias set "$url" "$ALIAS"

echo "✓ Live at https://$ALIAS"
