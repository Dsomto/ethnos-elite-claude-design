# Infomercial Brief — Ethnos-Elite VAPT for SMEs

## Format
A **60-second video** with a warm human voiceover (Nigerian English, female or male — pick one, stay consistent). Visuals are brand-consistent motion scenes that Claude Design generates as storyboard frames; a video editor stitches them with the VO.

## Goal
Convert SME founders/CTOs into booking a free scan. Emotion → proof → CTA.

## Audience mindset
- "Security feels expensive and complicated."
- "We had a small scare last year and nothing changed since."
- "Consultants quoted us ₦5M+ for a report we barely understood."
- "Am I one phishing email away from being the next headline?"

---

## The 60-second script — voiceover + on-screen

> **Legend:** **VO** = what the voice says · **SCENE** = what Claude Design renders · **TEXT** = on-screen words · **SFX** = sound effects

### Scene 1 — The Hook (0:00–0:07)
**SCENE:** Lagos night. A founder at her desk, laptop still glowing, notifications piling up. Soft overhead light. Warm tones.
**TEXT (fades in):** "You didn't start a business to become a cybersecurity expert."
**VO:** *"You didn't start your business to become a cybersecurity expert."*
**SFX:** Faint city hum, keyboard tap.

### Scene 2 — The Problem (0:07–0:18)
**SCENE:** Quick cuts — a ₦5,000,000 invoice from a consultant, an 80-page PDF thudding onto a desk, a "We'll get back to you next quarter" email. Desaturated, slightly cold.
**TEXT (beat-synced):** "Too slow." "Too expensive." "Too confusing."
**VO:** *"For years, the only way to secure a Nigerian business was to wait months, pay millions, and read reports you couldn't understand."*
**SFX:** Low drum, subtle paper-drop thud.

### Scene 3 — The Reveal (0:18–0:35)
**SCENE:** Hard cut to the Ethnos-Elite dashboard on a clean monitor — royal-blue gradient header, "Scan Now" button pulses, a URL gets typed in. Live progress bar fills, phase counters tick up (Recon → Ports → Web → CVEs → Report).
**TEXT callouts pop in as they're spoken:**
- "12-phase pentest"
- "Web + Infrastructure"
- "Agentic AI — Jacob"
- "Board-ready PDF in 45 minutes"
**VO:** *"Meet Ethnos-Elite. One URL. One click. Twelve phases of professional-grade testing — web and infrastructure — powered by our agentic AI, Jacob. In less time than your lunch break, you get a board-ready report. Written in plain English."*
**SFX:** Soft "scan" whoosh on each callout, a confident "ding" when the PDF appears.

### Scene 4 — The Proof (0:35–0:48)
**SCENE:** A short shot of the real Ethnos office (use `assets/ethnos-hq.jpg`). Then a testimonial card — royal-blue accent bar on the left.
**TEXT on card:** *"We caught a critical exposure before it cost us a client."* — CTO, Lagos fintech
**Then three trust pills animate in:** NDPR-aware · ISO 27001 aligned · Human + AI reviewed
**VO:** *"Built in Lagos. Trusted by fintechs, hospitals, and fast-growing teams across Africa. NDPR-aware. ISO-aligned. Reviewed by real humans — not just machines."*

### Scene 5 — The CTA (0:48–0:60)
**SCENE:** Full-bleed royal-blue gradient. Logo centered. Large button: **Start a free scan.** URL underneath.
**TEXT:** "ethnoscyber.com — Start a free scan"
**VO:** *"Ethnos-Elite. Fortune-500 security. Without the Fortune-500 bill. Start your free scan today."*
**SFX:** Short confident outro stinger.

---

## Voiceover direction
- **Voice:** Nigerian English, 30s–40s range, warm, measured. Think "calm CTO explaining to a peer" — not a hype reel.
- **Pace:** Slightly under 160 words per minute. Leave breathing room between scenes.
- **Emotion curve:** Empathetic → grounded → confident → inviting.
- **What NOT to say:** "You WILL be hacked." "Don't become the next victim." No fear-bait.

## Tone rules
- Empathy over fear.
- Specific over vague — numbers, phase names, real locations.
- Local over generic — Lagos, naira, NDPR.
- Short sentences. Confident. Calm.

## Visual rules
- Royal-blue gradient on hook/CTA only; problem scenes desaturated; reveal scene clean-white with brand accents.
- Inter typeface throughout.
- **Never:** hooded hacker, matrix green, floating padlocks, Anonymous masks, Hollywood keyboard shots.
- **Always:** real-looking African office environments, the actual product UI, clear readable dashboards.

## Assets already in this folder
- `assets/scanone-logo.png` — logo on dark gradient
- `assets/scanone-logo-blue.png` — logo on white
- `assets/favicon.svg` — the mark
- `assets/ethnos-hq.jpg` — office / team b-roll reference
- `assets/team-office.jpg` — team reference

---

## What Claude Design should produce (video storyboard only)

A **5-frame 16:9 storyboard** — one polished frame per scene above. Each frame shows the scene visual + the on-screen text overlay; the VO line sits in the frame notes. That storyboard feeds straight into the video editor. No deck, no PDF, no carousel — just the visual skeleton for the 60-second video.

## First prompt to paste into Claude Design after setup

> Using the Ethnos-Elite brand brief and INFOMERCIAL_BRIEF.md, produce a 5-frame 16:9 storyboard for a 60-second VAPT video infomercial aimed at Nigerian SME founders. Each frame = one scene from the brief. Include the on-screen text exactly as written and put the VO line in the frame notes. Royal-blue gradient on hook + CTA scenes only; clean white with navy type elsewhere. Inter typeface. No hacker/hoodie/matrix imagery. The final deliverable is a video, so style each frame as a cinematic key-frame — not a slide. Do not generate a PDF, deck, or carousel.

---

## How to turn the storyboard into the finished video

Claude Design produces the *visuals*. You add the *voice* and *motion* separately:

1. **Voice** — record the VO with a real person (best) or use ElevenLabs / Resemble AI with a Nigerian-English voice. Keep it ~58–60s.
2. **Motion** — import the Claude Design frames into **CapCut** (free, easy) or **Descript** (script-synced editing) or **Premiere**. Add the VO track, cross-dissolve between frames, layer SFX.
3. **Music bed — catchy + modern** — layered throughout the full 60s, not just background mush. Think: afrobeats-inflected cinematic score, clean 90–100 BPM, a melodic hook that lands on the logo reveal. Good references: Burna Boy / Rema production palettes mixed with Tom Misch / Nils Frahm cinematics. Stems to build or license:
   - **Intro (0:00–0:07)** — solo piano or kalimba, sparse, a single pulse on the hook word "expert"
   - **Problem (0:07–0:18)** — low sub-bass pad, muted percussion, tension building
   - **Reveal (0:18–0:35)** — drop: afrobeat-style shekere + snappy drums, melodic lead synth carries the brand hook
   - **Proof (0:35–0:48)** — back off the drums, keep the melodic lead, add warm strings
   - **CTA (0:48–0:60)** — full mix back, final melodic hook resolves on the logo stinger
   - **Mix rule:** music ducks -8dB under the voiceover automatically; never fights the VO.
   - **Licensing:** source from Artlist, Musicbed, or Epidemic Sound (search "afrobeat cinematic" / "uplifting tech"). For originality, commission a 60s custom bed from a Nigerian producer — budget ₦80k–₦200k.
4. **Captions** — burn them in (most SMEs watch on muted feeds).
5. **Export** — 1080p MP4 for LinkedIn/website; 1080×1920 for Instagram/WhatsApp status; a 15s cut-down for paid ads.

## Deliverable = video only

No PDF. No carousel. One deliverable: a 60-second video with human voiceover and a catchy afrobeats-cinematic music bed. Claude Design's role is to produce the storyboard frames (the visual skeleton); the final artifact is the edited MP4.
