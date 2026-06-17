import Link from 'next/link'

export default function VivaPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-32">
      {/* Navigation */}
      <header className="px-12 py-8 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">← Back</Link>
          <div className="w-px h-4 bg-[var(--color-border)]"></div>
          <span className="font-serif font-bold text-xl">Axiom Viva</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-12 py-24 space-y-24 animate-in">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted)]">Educational Guide</p>
          <h1 className="text-6xl font-serif font-bold leading-tight text-[var(--color-primary)]">The Math Behind the Magic</h1>
          <p className="text-xl text-[var(--color-muted)] leading-relaxed">
            Axiom is built on a "beginner-friendly backend" constraint. We deliberately avoided complex machine learning 
            models in favor of transparent, explainable financial formulas. Here is exactly how Axiom calculates a company's worth.
          </p>
        </div>

        <section className="space-y-8">
          <h2 className="text-3xl font-serif border-b border-[var(--color-border)] pb-4">1. Comparable Company Analysis (Comps)</h2>
          <div className="space-y-4 text-[var(--color-foreground)] leading-relaxed">
            <p><strong>The Simple Explanation:</strong> If you are selling your house, you look at what similar houses on your street sold for. If houses usually sell for $200 per square foot, and your house is 1,000 square feet, your house should be worth $200,000.</p>
            <p><strong>How Axiom Uses It:</strong> Instead of "price per square foot," we use "Enterprise Value to Revenue" (EV/Rev). We look at a public company (like Lockheed Martin), find out their EV/Rev multiple (e.g., 2x), and apply it to our private company's revenue.</p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-serif border-b border-[var(--color-border)] pb-4">2. Discounted Cash Flow (DCF)</h2>
          <div className="space-y-4 text-[var(--color-foreground)] leading-relaxed">
            <p><strong>The Simple Explanation:</strong> Imagine you have a machine that prints money every year for 5 years, and then you sell the machine. To know what the machine is worth *today*, you have to "shrink" the value of the future money because you have to wait to get it.</p>
            <p><strong>How Axiom Uses It:</strong> The Valuation Lab's "Discount Rate" (WACC) slider is how much we shrink the future money. A higher discount rate (e.g., 15%) means the company is riskier, so future money is worth much less today.</p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-serif border-b border-[var(--color-border)] pb-4">3. Sum of the Parts (SOTP)</h2>
          <div className="space-y-4 text-[var(--color-foreground)] leading-relaxed">
            <p><strong>The Simple Explanation:</strong> If you own a farm that grows apples and also has a gold mine on it, you can't price the whole farm using just "farm prices." You price the apples, price the gold, and add them together.</p>
            <p><strong>How Axiom Uses It:</strong> SpaceX isn't just one company. It's an aerospace company (Launch) AND a high-growth internet provider (Starlink). Axiom isolates these segments and lets you apply different multiples to each in the Valuation Lab.</p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-serif border-b border-[var(--color-border)] pb-4">4. The Valuation Lab (Live Math)</h2>
          <div className="space-y-4 text-[var(--color-foreground)] leading-relaxed">
            <p><strong>The Architecture:</strong> To ensure the UI feels instantaneous (60fps), we decouple the baseline backend math from the UI slider math. The backend provides the verified baseline (e.g., $18.7B revenue). When you drag a slider, React instantly recalculates the algebraic permutations locally.</p>
            <p><strong>The Heatmap:</strong> The grid at the bottom of the lab runs dozens of tiny DCF models simultaneously, showing how the company's value changes at the exact intersection of different Growth Rates and Discount Rates.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
