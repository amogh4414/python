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

## 2. Python Technical Terminology (Programming Concepts)

The backend uses several specific Python and Data Science concepts to function. Here is a breakdown of the terms found in the code:

### Core Python
*   **`class` (e.g., `DataProcessor`)**: A blueprint for creating objects. It groups data and functions together.
*   **`def __init__(self, ...)` (Constructor)**: A special method that runs automatically when a class is created. It sets up the initial variables (like the company name).
*   **`self`**: A keyword that refers to the specific instance of the class. It allows methods to access variables belonging to that class.
*   **`import ... as ...`**: Used to bring in external libraries. We use `pd` for Pandas and `np` for NumPy to make the code shorter.
*   **`if __name__ == "__main__":`**: A safety check that ensures the code only runs if the file is executed directly, not if it's imported by another file.
*   **`try...except`**: Error handling. It "tries" to run a block of code and "catches" any errors (like a missing file) so the whole server doesn't crash.
*   **`json.dumps()` & `json.load()`**: **Serialization**. This converts Python dictionaries into a string format (JSON) that the JavaScript frontend can understand.
*   **`with open(...) as f:` (Context Manager)**: A safe way to handle files. It automatically closes the file after reading or writing, even if an error occurs.

### Data Processing (Pandas & NumPy)
*   **`DataFrame` (`df`)**: The primary data structure in Pandas. Think of it as a super-powered Excel spreadsheet inside the code.
*   **`pd.read_csv()`**: The function used to "ingest" or load the data from your `.csv` files into a DataFrame.
*   **`df.drop_duplicates()`**: A cleaning function that finds and removes identical rows.
*   **`df.fillna()`**: A method to handle missing data. We use it to replace `NaN` (Not a Number/Empty) values with the median of the column.
*   **`df.loc[]`**: Used for "Label-based indexing." It allows us to select specific rows or columns based on conditions (e.g., `revenue > 100`).
*   **`df.quantile()`**: A statistical function used to find the "percentiles" of data, helping us identify and cap extreme outliers.

### Web & API (`api.py`)
*   **`BaseHTTPRequestHandler`**: A standard Python tool we "extend" to define how our server should react when a browser asks for data.
*   **`do_GET`**: An **Overridden Method**. It specifically tells the server: "When a GET request (data request) comes in, run this specific logic."
*   **`urlparse` & `parse_qs`**: Tools to "dissect" the website address. They pull the `?company=spacex` part out of the URL so we know which data to fetch.
*   **`encode('utf-8')`**: Converts the text data into **binary format** (bytes) so it can be sent over the internet.

---

## 3. System Connection (Frontend ↔ Backend)

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
