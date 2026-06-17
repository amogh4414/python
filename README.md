# Axiom: IPO Valuation Intelligence Platform

> **Institutional-Grade Private Company Valuation Engine**

Axiom is a premium financial intelligence platform designed to estimate the fair enterprise value and IPO pricing ranges of elite private companies like SpaceX, OpenAI, and Stripe.

## 1. The Thesis
Axiom bridges the gap between private market opacity and institutional rigor. Instead of generic dashboards, Axiom delivers **digital research publications**—information-dense, editorial-quality reports that mimic the authority of PitchBook, Bloomberg, and the Financial Times.

## 2. Core Features
- **The Valuation Lab:** A flagship interactive environment allowing analysts to challenge baseline assumptions. Adjust Revenue Growth, Discount Rates (WACC), and Segment Multiples to see instant, 60fps valuation shifts.
- **Sum-of-the-Parts (SOTP) Engine:** Isolate complex business units (e.g., Starlink vs. Launch Services) to apply specific industry multiples.
- **Source Traceability:** Every data point is cited, dated, and categorized by Source Tier (Tier 1-4) and Verification Status.
- **Printable Research Reports:** Dedicated, print-optimized views for institutional distribution.

## 3. Tech Stack & Constraints
- **Frontend:** Next.js 15 (App Router), Tailwind CSS (Runway-inspired design system), Shadcn/UI (Heavily customized).
- **Backend:** Beginner-friendly Python (Pandas, Numpy). No ML/AI. The complexity resides in the **financial logic**, not the software engineering.
- **Performance:** Decoupled baseline math (Python) from UI perturbation math (React) to ensure instantaneous interaction quality.

## 4. Getting Started
```bash
# Clone the repository
git clone ...

# Install backend dependencies
pip install -r requirements.txt

# Start the frontend
cd frontend
npm install
npm run dev
```

## 5. Educational Purpose (Viva)
Axiom was built to be 100% explainable. A first-year engineering or finance student can explain every line of the backend logic. See `VIVA_README.md` and the `/viva` route for detailed walkthroughs of DCF, SOTP, and Comps.
