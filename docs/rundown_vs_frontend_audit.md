# Rundown vs. Frontend Audit

## Executive Summary
The current Streamlit rundown fails to capture the "Axiom" institutional identity. It relies too heavily on default Streamlit layout mechanics (sidebar inputs, generic metric cards, Plotly defaults) which signals "Data Science Dashboard" rather than "Premium Research Report".

## Detailed Discrepancies

### 1. The Canvas & Background
*   **Frontend**: Uses a warm paper background (`#F9F9F6`) with stark white (`#FFFFFF`) cards to create depth via contrast.
*   **Rundown**: Uses a plain white or default Streamlit gray background. 

### 2. Information Density & Spacing
*   **Frontend**: Uses an "Editorial" layout. Large, aggressive serif headers (e.g., `text-6xl md:text-8xl`), followed by a tight, dense horizontal KPI strip separated by vertical hairlines.
*   **Rundown**: Uses `st.columns` with `st.metric`. `st.metric` injects unwanted padding, large labels, and floaty arrows that destroy the rigid, tabular look of the original KPIs.

### 3. Valuation Lab Placement
*   **Frontend**: The Valuation Lab is a centerpiece component. The inputs (sliders), output (Enterprise Value), and sensitivity table sit side-by-side in a 3-column layout.
*   **Rundown**: Moved all sliders to the Streamlit sidebar. This breaks the mental connection between adjusting an assumption and seeing the output change adjacent to it.

### 4. Typography Hierarchy
*   **Frontend**: Strict separation of concerns. `Geist Serif` for headers/titles to give a traditional financial report feel. `Geist Mono` with tabular numbers for financial figures to ensure alignment. `Geist Sans` for UI labels.
*   **Rundown**: Applied a global `Inter` font. Values and labels mush together without distinct typographic voices.

### 5. Charts
*   **Frontend**: Charts are minimal. The SOTP visualization is usually integrated into the Valuation Lab or shown as clean HTML/CSS bars, not interactive Plotly/Matplotlib charts with toolbars.
*   **Rundown**: Uses Plotly charts with visible axes, toolbars, and generic layouts.

## Action Plan for Rebuild
To achieve "Axiom Lite", the Streamlit app must bypass default components using `st.markdown(..., unsafe_allow_html=True)` to inject bespoke HTML/CSS that exactly mirrors the Tailwind classes from the frontend. The Valuation Lab must move from the sidebar into the main layout.
