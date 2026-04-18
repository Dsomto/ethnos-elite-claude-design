# Claude Design — Ethnos-Elite Brand Kit

Drop-in for Anthropic's Claude Design tool. Holds the brand brief, infomercial brief, brand fonts, and visual references so Claude Design stays on-brand across every artifact it generates.

## Folder contents
- `BRAND_BRIEF.md` — company blurb, palette, typography, voice, do's and don'ts
- `INFOMERCIAL_BRIEF.md` — the 60-second video infomercial spec
- `assets/` — logos, favicon, team/office imagery
- `assets/fonts/` — self-hosted Inter + JetBrains Mono so Claude Design never substitutes
- `reference/design/` — 20 landing-page HTML explorations (visual language reference)
- `reference/landing/` — production `Landing.jsx` + `index.css` (source of truth for tokens)

## How to fill in the Claude Design setup form

**Company name and blurb →** paste the "Longer blurb" from `BRAND_BRIEF.md`.

**Link code on GitHub →** `https://github.com/Dsomto/ethnos-elite-claude-design`

**Upload a .fig file →** skip (we don't have one).

**Add fonts, logos, assets →** drag everything in `assets/` **including `assets/fonts/`** into this field. The `.woff2` and `.ttf` files are critical — without them Claude Design substitutes with Helvetica/Arial and the brand breaks.

**Any other notes? →** paste:

> Brand is `#1B4FBF` royal blue with `#163FA0` navy gradient. Typography: **Inter** for UI/body/headings, **JetBrains Mono** for code/terminal — both self-hosted in `assets/fonts/` via `fonts.css`. Do not substitute typefaces under any condition. African SME audience — empathetic, calm, confident voice. Never use hacker-in-hoodie, matrix-green, or floating-padlock imagery. First artifact we want is a 60-second video storyboard — see `INFOMERCIAL_BRIEF.md`.

## After setup — first prompts to run
See the "First prompt to paste" block at the bottom of `INFOMERCIAL_BRIEF.md`.

## What's authoritative if the brief drifts
- `reference/landing/index.css` — colors/tokens
- `reference/landing/Landing.jsx` — hero + section patterns
- `reference/design/02-clean-pro.html` — closest current aesthetic
