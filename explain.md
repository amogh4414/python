# Axiom: System Terminology & Architecture

This document explains the technical structure of Axiom, the logic behind the Python backend, and the financial terminologies used in the valuation models.

---

## 1. Backend Logic (`backend/`)

### `data_processor.py`
This is the core engine of the application. It handles data ingestion, cleaning, and financial modeling.

*   **`COMPANY_CONFIGS`**: A dictionary containing baseline financial assumptions for each company (growth rates, WACC, margins).
*   **`load_and_clean_data()`**: 
    *   Loads raw CSV files from the `data/` folder.
    *   **Data Cleaning**: Removes duplicates, replaces "garbage" text (like `---` or `N/A`) with usable values, and caps outliers to prevent skewed charts.
*   **`calculate_dcf()`**: 
    *   Calculates the **Discounted Cash Flow**. It projects future revenue for 5 years and "discounts" it back to today's value using the **WACC**.
*   **`calculate_comparables()`**: 
    *   Estimates value by multiplying the company's revenue by a "Peer Multiple" (how much similar public companies are worth).
*   **`get_full_analysis()`**: 
    *   The orchestrator. It combines cleaned data with the final valuation results to send to the frontend.

### `api.py`
This is a lightweight Python web server (`HTTPServer`).

*   **Purpose**: It listens for requests from the Next.js frontend.
*   **Endpoint**: `/api/valuation?company=name`
*   **CORS**: It includes headers (`Access-Control-Allow-Origin: *`) to allow your browser to talk to the backend while developing locally.

### `export_metrics.py`
A utility script used to generate a static snapshot of data.

*   **`export_all()`**: Loops through all companies, runs the `DataProcessor`, and saves the results into `frontend/src/lib/metrics.json`. This allows the frontend to show data even if the Python API is temporarily offline.

---

## 2. System Connection (Frontend ↔ Backend)

Axiom uses a **Decoupled Architecture**:

1.  **Request**: The Frontend (React/Next.js) sends a `fetch()` request to `http://localhost:8000/api/valuation?company=spacex`.
2.  **Processing**: The Python backend receives the `company_id`, runs the financial logic in `data_processor.py`, and generates a JSON object.
3.  **Response**: The backend sends the JSON back.
4.  **Display**: The React components (like `ValuationLab`) receive the JSON and update the interactive charts and badges instantly.

---

## 3. Financial Terminology

To understand the reports, you should be familiar with these terms:

*   **Valuation**: The total estimated worth of the company.
*   **DCF (Discounted Cash Flow)**: A method of valuing a company by estimating the "present value" of all the money it will make in the future.
*   **WACC (Weighted Average Cost of Capital)**: The "discount rate." It represents the risk of the company. A higher WACC means the company is riskier, which lowers its current value.
*   **EBITDA**: Earnings Before Interest, Taxes, Depreciation, and Amortization. A common measure of a company's operational profitability.
*   **Peer Multiple**: A ratio used to compare companies (e.g., Price-to-Sales). If a peer is worth 10x their revenue, we apply a similar multiple to our target company.
*   **Market Premium**: The difference between what the private market says a company is worth (e.g., a recent funding round) and what our math says it's actually worth.
*   **TGR (Terminal Growth Rate)**: The rate at which we expect the company to grow forever after the initial 5-year projection period.

---

## 4. Why Use These Methods?

*   **Python for Data**: Python (Pandas/NumPy) is the industry standard for financial modeling because it handles large datasets and complex math much faster and more accurately than JavaScript.
*   **CSV as Database**: We use CSV files instead of a heavy database (like SQL) to keep the project "Zero-Config." You can open and edit the data in Excel easily.
*   **Next.js for UI**: React allows the "Valuation Lab" to feel "alive"—when you change a number, the UI updates at 60 frames per second without reloading the page.
