# Project Explanation

Axiom is a private-company valuation platform that compares: 1. Reported Valuation, 2. Expert Consensus Valuation, and 3. Axiom Fair Value, and explains exactly why they differ. By revealing the mathematical assumptions driving high private-market prices, it bridges the gap between opaque media headlines and objective financial reality.

## The User Workflow
1. **User opens company page:** The user lands on a specific private company profile (e.g., SpaceX).
2. **User reviews company data:** They read the institutional headline and methodology.
3. **User sees KPIs:** They instantly see the Reported Valuation, Expert Consensus, Axiom Fair Value, and the resulting Market Premium.
4. **User explores methodologies:** They review the underlying DCF, SOTP, and Comparable metrics.
5. **User uses the Valuation Lab:** They interact with sliders to challenge assumptions (like growth rate or WACC) and instantly generate alternative valuations.

## Input, Processing, Output
- **INPUT:** What data enters the system? Raw financial metrics like Revenue, Growth Rate, Employees, Reported Market Valuation, and Industry Multiples.
- **PROCESSING:** What calculations occur? The backend runs a Discounted Cash Flow (DCF) to estimate intrinsic value, a Sum-of-the-Parts (SOTP) to combine different business units, and Comparable Analysis to benchmark against public peers.
- **OUTPUT:** What results are generated? Axiom Fair Value, Market Premium (the % difference between Reported and Fair value), and dynamic Bull/Base/Bear scenarios.

## Valuation Methods Explained

### 1. DCF (Discounted Cash Flow)
- **Formula:** Sum of (Free Cash Flow / (1 + WACC)^Year) + Terminal Value
- **Simple Explanation:** It estimates how much cash a company will generate in the future and discounts it back to today's value, because money today is worth more than money tomorrow.
- **Why investors use it:** It calculates the absolute "intrinsic value" of a business based on its actual ability to generate cash, ignoring market hype.
- **How Axiom uses it:** We use it as the foundational anchor for our Axiom Fair Value, ensuring companies with high valuations must eventually justify them with high cash flows.

### 2. SOTP (Sum of the Parts)
- **Formula:** (Segment A Revenue * Multiple A) + (Segment B Revenue * Multiple B)
- **Simple Explanation:** Valuing a conglomerate by chopping it up into its distinct businesses, valuing each one separately, and adding them together.
- **Why investors use it:** A company like SpaceX has a manufacturing arm (Launch) and a software/telecom arm (Starlink). Applying one generic "space" multiple to both would be inaccurate.
- **How Axiom uses it:** We use it in our Valuation Lab, allowing users to apply different growth and multiple assumptions to different business segments.

### 3. Comparables (Comps)
- **Formula:** Company Metric (e.g., Revenue) * Public Peer Multiple (e.g., EV/Rev)
- **Simple Explanation:** Valuing a house by looking at what similar houses in the neighborhood sold for. 
- **Why investors use it:** It grounds theoretical math in current market reality. If public software companies are selling for 10x revenue, private ones likely will too.
- **How Axiom uses it:** We use it to derive the multiples used in our SOTP models.

## Bug Investigation: The $1.8T vs $350B SpaceX Bug
**The Issue:** The UI previously showed Axiom Fair Value = $1.8T and Reported Valuation = $350B, suggesting our model valued SpaceX at 5x its current market price.
**The Root Cause:** The $1.8T figure was mistakenly mapped to a long-term "Moonshot" IPO target for the year 2032, assuming Starship captures the entire orbital economy. It was confused with the Present Day Fair Value. The valuation formula itself wasn't broken, but the frontend was displaying the un-discounted terminal fantasy value instead of the strictly modeled present-day intrinsic value. 
**The Fix:** We have corrected the data structure to explicitly map Present Day Axiom Fair Value (~$500B), Expert Consensus (~$480B), and Reported Valuation ($1.2T rumor), calculating the Market Premium directly off these present-day figures.