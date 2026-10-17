---
name: anti-slop-web-design
description: Critical anti-default web design protocol. Prevents generic AI statistical defaults (interchangeable hero sections, random purple gradients, 3 identical cards, rounded-xl everywhere). Enforces 5 mandatory design decisions (named typography pairing, tokenized color system, asymmetric 12-column grid, orchestrated motion, real media assets).
---

# 🎨 Anti-Slop Web Design Protocol

## Overview
When designing or coding web interfaces, AI agents default to predictable statistical patterns (Inter font, generic purple gradients, identical cards, rounded-xl everywhere). This skill strictly enforces distinctive, intentional, high-craft design decisions.

---

## The 5 Mandatory Design Decisions

### 1. Named Typography Pairing
- **Never** use unstyled browser fallbacks or generic Inter-only styling.
- Pair a distinctive display font with a crisp, readable body font:
  - *Editorial / High-End*: Playfair Display or Cormorant Garamond + Plus Jakarta Sans / Inter
  - *Modern Tech / Futuristic*: Space Grotesk / Syne + DM Sans / Satoshi
  - *Clean SaaS / Corporate*: Plus Jakarta Sans / Outfit + Inter / Geist Sans
- Set intentional tracking (letter-spacing) and line-heights.

### 2. Tokenized Color System (Ban Generic Gradients)
- Define semantic CSS custom properties in `index.css`:
  - `--primary`, `--primary-hover`
  - `--accent`, `--accent-glow`
  - `--bg-surface`, `--bg-elevated`, `--bg-subtle`
  - `--text-ink`, `--text-muted`, `--text-subtle`
  - `--border-subtle`, `--border-prominent`
- **Ban** generic rainbow/purple gradients. Curate intentional, high-contrast HSL color palettes with deep contrast ratios (WCAG AAA/AA).

### 3. Asymmetric Structural Layout
- **Ban** repetitive identical 3-card rows.
- Use an intentional 12-column grid with:
  - Offset hero copy and full-bleed media crops.
  - Bento grids with asymmetric card spans (e.g. 8-col hero feature + 4-col stat stack).
  - Rhythmic spacing variations (`32px`, `48px`, `64px`, `96px`).

### 4. Orchestrated Motion
- Single-coordinated load entrances (e.g. 80ms stagger fade-up).
- Fluid spring transitions using `transitions-dev` tokens.
- **Never** animate properties that trigger layout re-flow (`width`, `height`, `top`, `left`).
- Animate only hardware-accelerated compositor properties: `transform` and `opacity`.

### 5. Real Visual Assets
- Integrate actual, high-resolution media, photography, or generated SVG graphics rather than gray blank placeholder boxes.
- Use contextual imagery, crisp badges, and authentic icons.
