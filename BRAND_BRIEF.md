# Ethnos-Elite — Brand Brief for Claude Design

## Company name
Ethnos-Elite VAPT Platform (by Ethnos Cyber)

## One-line blurb
Enterprise-grade vulnerability assessment and penetration testing platform built for African SMEs — agentic AI scans, 12-phase web audits, infrastructure discovery, and executive PDF reports in under an hour.

## Longer blurb (for the Claude Design "company blurb" field)
Ethnos-Elite is a self-serve cybersecurity scanning platform from Ethnos Cyber. SMEs point it at a website or network range; within minutes our agentic AI "Jacob" runs a 12-phase web pentest plus infrastructure discovery, enriches findings with CVE/EPSS data, and delivers a board-ready PDF report with remediation steps and risk scoring. Clients include fintechs, healthcare, retail, and fast-growing African SaaS teams that can't afford a full-time security team. We believe every business deserves Fortune-500 security without Fortune-500 budgets.

## Target audience
Primary: SMEs in Nigeria and wider Africa — CEOs, CTOs, IT leads of 20–500-person companies.
Secondary: Compliance officers preparing for NDPR / ISO 27001 / PCI-DSS audits.

## Core problem we solve
SMEs don't have security teams. They either ignore security until a breach, or they pay consultants ₦5M+ for a one-off report. Ethnos-Elite gives them continuous, automated VAPT at a fraction of the cost — with language and reports they can actually understand.

## Visual identity

### Primary palette
- **Royal Blue:** `#1B4FBF` (primary / CTAs)
- **Deep Navy:** `#163FA0` (darker accents, gradients)
- **Brand gradient:** `linear-gradient(135deg, #1B4FBF 0%, #163FA0 100%)`

### Neutrals
- Ink: `#0F172A`
- Slate: `#1E293B`
- Canvas: `#F8FAFC`
- Border: `#CBD5E1`
- Hairline: `#E2E8F0`

### Severity palette (used in findings/reports)
- Critical: `#DC2626`
- High: `#EA580C`
- Medium: `#D97706`
- Low: `#2563EB`
- Info: `#64748B`

### Typography
- UI + body: **Inter** (self-hosted — `assets/fonts/Inter-Variable.woff2`), system-ui fallback
- Headings: **Inter** bold/semi-bold
- Code / terminal: **JetBrains Mono** (self-hosted — `assets/fonts/JetBrainsMono-Regular.ttf`), Menlo fallback
- Both fonts are registered via `assets/fonts/fonts.css`. Claude Design must load these files — **do not substitute** with Helvetica, Arial, or any web-safe fallback.

### Tone of voice
- Confident but not arrogant
- Technical where it must be, plain-English everywhere else
- Africa-proud — we name-drop Lagos, reference local compliance (NDPR), speak to local realities (power, bandwidth, procurement)
- Never fear-mongering. We teach, we don't threaten.

### What we avoid
- Green-on-black "hacker" matrix clichés
- Anonymous-mask / hoodie imagery
- Red alert fatigue (overuse of red)
- Generic stock photos of "cyber" with locks and padlocks floating in space

## Product surfaces to stay visually consistent with
- Landing page — hero uses royal-blue gradient, white card surfaces, Inter type, rounded-2xl corners, soft shadow
- Dashboard — light-canvas background, card-based KPIs, subtle brand accents
- PDF report — cover in brand gradient, body in serif/sans mix, severity pills matching palette above

## Reference material in this folder
- `assets/scanone-logo.png` — primary logo
- `assets/scanone-logo-blue.png` — logo on light backgrounds
- `assets/favicon.svg` — mark
- `assets/ethnos-hq.jpg` — team/office reference
- `assets/team-office.jpg` — team reference

## Live design references in the repo
- `client/public/design/` — 20 landing-page design explorations (use `02-clean-pro.html` and `r2-corporate.html` as the closest to current brand)
- `client/src/pages/Landing.jsx` — production landing page
- `client/src/index.css` — tokens are authoritative: the colors above came from here
