# Visual reference — what Claude Design should learn from

This folder exists so Claude Design can ingest the actual Ethnos-Elite visual language instead of guessing from a written brief.

## Contents

### `design/` — 20 landing-page explorations (standalone HTML)
Each file renders a full hero/landing concept. Closest to our production aesthetic: `02-clean-pro.html` and `r2-corporate.html`. Treat the rest as exploratory — palette ideas, layout rhythm, typographic scale.

### `landing/Landing.jsx`
The production React landing page. Truth source for current layout, section order, copy tone, and component patterns (hero, feature grid, testimonial strip, CTA).

### `landing/index.css`
Tailwind config layer + the authoritative brand tokens:
- `--brand: #1B4FBF`
- `--brand-dk: #163FA0`
- `--brand-grd: linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)`
- Inter typeface
- Severity palette for findings (critical/high/medium/low/info)

## How to use with Claude Design

Point Claude Design at this repo. In the setup form's "Link code on GitHub" field, paste the repo URL. Claude Design will read this `reference/` folder alongside the briefs and absorb the visual system automatically.
