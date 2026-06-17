# Final Design Debt & Future Improvements

*This document captures minimal design debt and suggestions for post-MVP iteration, maintaining strict adherence to the "no new features" rule for the current phase.*

## 1. Typography Enhancements (Micro-typography)
- **Current State:** We are using standard system fonts mapped to Tailwind's `font-serif` and `font-mono`.
- **Debt:** To achieve true PitchBook/FT perfection, we should load a premium web font (e.g., *Tiempos Text*, *GT Sectra*, or *Inter Display*) rather than relying on the user's local serif fallback (which varies wildly between Mac, Windows, and Linux).
- **Action:** Add `@next/font/google` for a consistent, cross-platform serif like *Merriweather* or *Playfair Display* in the next minor version.

## 2. Animation & Microinteractions
- **Current State:** Hover states are applied (e.g., `transition-colors duration-300`).
- **Debt:** The page transitions are abrupt.
- **Action:** Add a subtle `framer-motion` fade-in (150ms opacity 0->1) on the `ValuationLab` heatmap when sliders are dragged, rather than an instant numeric snap. This makes the math feel "calculated" in real-time.

## 3. Dark Mode
- **Current State:** We hardcoded the application to a Light/Warm Paper theme (`bg-[#F9F9F6]`) to match institutional reports.
- **Debt:** High-end terminals (like Bloomberg) offer a strict Dark Mode.
- **Action:** Implement a CSS variable system mapping the graphite, borders, and warm paper to a deep charcoal/OLED dark mode.

## 4. Chart Visualization
- **Current State:** We rely heavily on tabular data and the Sensitivity Heatmap.
- **Debt:** There is no line chart showing the historical generated data (e.g., the 2300+ rows we generate in the backend).
- **Action:** When charting is introduced, use D3.js or a highly customized Recharts instance with zero gridlines, a single solid black/gray line, and a tiny dot at the current valuation, mirroring the FT aesthetic. No rounded corners or gradients.