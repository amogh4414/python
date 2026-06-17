# Rundown Design Audit: Axiom Production vs. Rundown Prototype

This document isolates the visual and structural discrepancies between the production Next.js frontend and the current Streamlit rundown implementation.

## 1. Visual Identity & Typography

| Element | Production Frontend (Next.js) | Current Rundown (Streamlit) | Gap Analysis |
| :--- | :--- | :--- | :--- |
| **Header Font** | High-contrast Serif (Institutional) | Standard Sans-Serif | Rundown feels like an "internal tool" rather than a "research report." |
| **Data Font** | Tight Monospace (Financial) | Proportional Sans-Serif | Numbers lack the precision-look of a terminal. |
| **Color Palette** | Off-white (#F9F9F6), Deep Gray (#111111) | Standard White/Slate | Rundown is too bright; lacks the "ivory paper" feel of premium reports. |
| **Borders** | hairline 0.5px or 1px (#E5E5E5) | Default Streamlit shadows/padding | Rundown lacks the "grid-based" architectural feel. |

## 2. Layout & Spacing

| Section | Production Frontend Layout | Current Rundown Layout | Gap Analysis |
| :--- | :--- | :--- | :--- |
| **Executive Summary** | Horizontal KPI strip with labels above numbers. | Vertical or side-by-side metrics. | Rundown lacks the "Executive Brief" density. |
| **Valuation Lab** | Centerpiece component with inline sliders. | Sidebar-only interaction. | The sidebar hides the core value proposition of the project (interactivity). |
| **Methodology** | Multi-layered breakdown (DCF vs SOTP). | Simple table or text. | Rundown misses the "Weighted Blending" visual hierarchy. |

## 3. Interaction Patterns

| Feature | Production Behavior | Current Rundown Behavior | Gap Analysis |
| :--- | :--- | :--- | :--- |
| **Scenario Toggle** | Institutional tabs (Consensus, etc.) | Radio buttons or Selectbox | The UI feel is "web form" instead of "trading terminal." |
| **Data Audit** | Verification status and source tiers. | Simple list or hidden. | Rundown lacks the "Audit Trail" transparency required for viva. |

## 4. Why the Rundown feels "Disconnected"

1.  **Sidebar Over-reliance**: In Axiom, the data is the hero. Moving sliders to the sidebar treats them as "filters" rather than "model variables."
2.  **Chart Slop**: The current charts are generic. Axiom uses minimal, label-light charts that focus on the *gap* rather than the *trend*.
3.  **Density**: The production UI is dense and information-rich. The rundown is too "airy" and spread out.

## 5. Redesign Mandate

*   **Move the Valuation Lab to the center.**
*   **Inject custom Serif/Mono fonts via CSS.**
*   **Replicate the hairline border-grid.**
*   **Reconstruct the 'Sources' table exactly as it appears in the React code.**
*   **Weight methodologies visually (40/40/20).**
