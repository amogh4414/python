# Project Roadmap

This document outlines the planned future development for BlackRock Terminal Lite.

## Completed (v1.0 - MVP)
- [x] Premium Dual-Theme UI (Light/Dark mode)
- [x] Live Market Dashboard (`yfinance` integration)
- [x] Historical Financial Analysis (CSV based)
- [x] Company Comparison Tool (Radar Charts)
- [x] Algorithmic Buffett Score
- [x] Portfolio Simulator

## Upcoming (v1.1)
- [ ] **Performance:** Add `st.cache_data` decorators to API calls to prevent `yfinance` rate-limiting.
- [ ] **Expanded Coverage:** Increase tracking from 11 companies to the entire S&P 500.
- [ ] **Export Feature:** Allow users to download analysis reports as PDF or CSV.

## Planned (v2.0)
- [ ] **Database Migration:** Move historical data from local CSV files to a lightweight SQLite database.
- [ ] **Authentication:** Implement simple user login to save and persist Portfolio Simulator configurations.
- [ ] **News Sentiment:** Integrate a financial news API to display recent headlines and a basic sentiment score on the Dashboard.