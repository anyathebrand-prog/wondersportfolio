# Prompt: Portfolio Website for a Creative Director / Content Strategist / Content Creator

Design and build a portfolio website for a multi-disciplinary creative professional who works as a **Creative Director, Content Strategist, and Content Creator**. The site should feel premium, cinematic, and confident — this is someone who directs brand storytelling for a living, so the site itself is their biggest portfolio piece.

## Brand & Visual Identity
- **Palette:** Purple and black as the core identity. Use a deep, near-black base (not pure #000) paired with a rich, saturated purple as the signature accent — avoid a generic lavender/pastel purple. Introduce 1–2 supporting tones (a muted lilac or electric violet highlight, plus an off-white/warm grey for body text) so the palette has range beyond the two anchor colors.
- **Typography:** Pair a bold, editorial display typeface (for hero statements and section titles) with a clean, highly readable body face. Typography should carry authority — this is a director's voice, not a template.
- **Overall tone:** Confident, cinematic, a little theatrical — like walking into a screening room, not a generic agency site.

## Site Structure
1. **Hero** — the single most important moment on the site. Should feel like an opening title sequence, not a headline-with-CTA template.
2. **About / Bio** — who they are, their POV on creative direction and content strategy.
3. **Expertise / Services** — creative direction, content strategy, content creation, shown as distinct but connected disciplines.
4. **Selected Work / Case Studies** — visual-first, with room for video/imagery per project and a short strategic narrative per piece (problem → direction → outcome).
5. **Clients / Brand logos** (if applicable).
6. **Testimonials** (if applicable).
7. **Contact / Booking** — clear, low-friction call to action.

## Motion — use where it serves the story, not everywhere
- One **orchestrated hero sequence** on load (staged text/element reveal) rather than scattered effects across the page.
- **Scroll-triggered reveals** for case studies and section transitions — content should feel directed, like scenes, not just fading in uniformly.
- Subtle **hover micro-interactions** on work thumbnails and nav (e.g., magnetic buttons, image reveal on hover, cursor-aware accents).
- Respect `prefers-reduced-motion` throughout — motion should enhance, never trap or slow down a visitor trying to get to the work.

## 3D — one signature moment, not decoration
- Consider a **single 3D signature element** in the hero — an abstract purple/black geometric form, particle field, or fluid/gradient mesh that reacts subtly to cursor or scroll. This should function as the page's "thesis," not a gimmick bolted on.
- Keep 3D contained to where it earns its place (likely just the hero, or one transition moment) — don't scatter 3D across every section, and always provide a static/lightweight fallback for mobile and low-power devices.
- Suggested approach: Three.js / React Three Fiber for the 3D layer, combined with GSAP or Framer Motion for scroll/hover choreography.

## Technical & UX Baseline
- Fully responsive, mobile-first fallback for any 3D/heavy motion.
- Fast initial load — defer/lazy-load 3D and heavy animation assets.
- Visible keyboard focus states and accessible contrast even within the dark palette.
- Case study pages should support mixed media (video, image galleries, embedded content).

## What to avoid
- Generic AI-website defaults: cream background with terracotta accent, numbered (01/02/03) markers where there's no real sequence, or animation added just to look "impressive" rather than to support the story.
- Overloading the page with multiple competing motion/3D moments — restraint is part of the premium feel.
