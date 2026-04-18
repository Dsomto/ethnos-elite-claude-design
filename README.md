# Claude Design — Ethnos-Elite Brand Kit

This folder is the drop-in for Anthropic's Claude Design tool. It holds the brand brief, infomercial brief, and a small asset bundle so Claude Design can stay on-brand across every artifact it generates.

## Folder contents
- `BRAND_BRIEF.md` — company blurb, palette, type, voice, do's and don'ts
- `INFOMERCIAL_BRIEF.md` — the marketing piece we want to produce first
- `assets/` — logos, favicon, team/office imagery

## How to fill in the Claude Design setup form

**Company name and blurb →** paste the "Longer blurb" from `BRAND_BRIEF.md`.

**Link code on GitHub →** paste the repo URL (if this repo is on GitHub). Otherwise use the "Link code from your computer" option and select this `.claude-design/` folder plus `client/src/`.

**Upload a .fig file →** skip (we don't have one yet).

**Add fonts, logos, assets →** drag everything in `.claude-design/assets/` into this field.

**Any other notes? →** paste:

> Brand is `#1B4FBF` royal blue with `#163FA0` navy gradient. Inter typeface. African SME audience — empathetic, calm, confident voice. Never use hacker-in-hoodie, matrix-green, or floating-padlock imagery. First artifact we want is a 6-slide deck + one-page infomercial — see INFOMERCIAL_BRIEF.md in the code folder.

## After setup — first prompts to run
See the "First prompt to paste" block at the bottom of `INFOMERCIAL_BRIEF.md`.

## What's authoritative in the repo
If anything in `BRAND_BRIEF.md` drifts from the product, the truth lives in:
- `client/src/index.css` (colors/tokens)
- `client/src/pages/Landing.jsx` (hero + section patterns)
- `client/public/design/02-clean-pro.html` (closest current aesthetic)
