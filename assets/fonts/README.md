# Brand fonts — Ethnos-Elite

Self-hosted so Claude Design never has to fall back to a web-safe substitute.

## Files
- `Inter-Variable.woff2` — variable weight 100–900. Primary UI + body + headings.
- `JetBrainsMono-Regular.ttf` — code/terminal blocks, version strings, scan log excerpts.
- `fonts.css` — `@font-face` declarations + CSS variables `--font-ui` and `--font-code`.

## Usage in Claude Design
Upload all three files via the setup form's "Add fonts, logos and assets" field. Claude Design will register them as the brand typefaces and stop substituting.

## Usage in HTML/React prototypes
```html
<link rel="stylesheet" href="assets/fonts/fonts.css">
<style>
  body { font-family: var(--font-ui); }
  code, pre { font-family: var(--font-code); }
</style>
```

## Licenses
- **Inter** — SIL Open Font License 1.1 (https://github.com/rsms/inter) — free to use, modify, redistribute.
- **JetBrains Mono** — SIL Open Font License 1.1 (https://www.jetbrains.com/lp/mono/) — free to use commercially.
