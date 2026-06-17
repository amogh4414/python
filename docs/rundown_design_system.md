# Axiom Design System

This document captures the exact design tokens and component hierarchy extracted from the Next.js frontend, to be applied to the single-file Streamlit rundown.

## 1. Core Tokens

### Typography
*   **Sans-Serif (Body & Labels)**: `Geist`, `Inter`, `Helvetica Neue`, `sans-serif`
*   **Serif (Display & Headings)**: `Newsreader`, `Playfair Display`, `Georgia`, `serif`
*   **Monospace (Financial Data)**: `Geist Mono`, `JetBrains Mono`, tabular-nums enabled.

### Color Palette
*   **Background (Canvas)**: `#F9F9F6` (Warm off-white paper)
*   **Surface (Cards)**: `#FFFFFF`
*   **Foreground (Primary Text)**: `#111111` or `#222222`
*   **Muted (Secondary Text/Borders)**: `#666666` or `#737373`
*   **Border (Dividers)**: `#E5E5E5` or `#E8E8E3`
*   **Success**: `#15803D` (Green-700)
*   **Danger/Premium**: `#B91C1C` (Red-700)

### Spacing & Borders
*   **Cards**: 1px solid border (`#E5E5E5`), no rounded corners (`border-radius: 0`), very subtle shadow (`shadow-sm`).
*   **Padding**: Heavy inner padding for cards (`p-10` / `2.5rem`), wide margins between sections.

## 2. Component Archetypes

### A. The KPI Strip (Executive Summary)
*   Layout: 4-column horizontal grid.
*   Separators: 1px right border between metrics.
*   Label: 10px uppercase, tracking-widest, color `#666666`, font-semibold.
*   Value: 4rem (4xl) font-mono, color `#111111`.
*   Subtitle: 10px uppercase bold with a colored status dot.

### B. Valuation Reasoning Card
*   Layout: Full width, white background, 1px border.
*   Typography: Title is 1.125rem (lg) font-serif. Body is 1.125rem font-sans, color `#444444`.

### C. Valuation Lab
*   Header: Serif title, scenario toggle buttons (pill-shaped, border only, invert on active).
*   Columns: Inputs (left), Hero EV (center), Heatmap (right).
*   Sliders: Custom styled, thin track, solid black thumb.
*   Hero EV: 4xl/5xl font-serif bold.

### D. Sources Table
*   Style: Clean minimal borders. Header is light background (`#F9F9F6`), text muted uppercase. Body rows have hover effects (`hover:bg-[#FDFDFB]`), text font-mono.

## 3. Interaction & Motion Rules
*   **Hover States**: Links and buttons transition to black. Cards transition border colors slightly.
*   **No Glassmorphism**: Flat design only.
*   **No Heavy Shadows**: Use hairline borders for depth instead of drop shadows.
