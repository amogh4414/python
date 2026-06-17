import Link from 'next/link'
import { companies } from '@/lib/data'

export default function LandingPage() {
  const companyList = Object.values(companies)

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] text-[#111111]">
      {/* Navigation */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-[#E5E5E5] bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-serif font-bold text-lg">
            A
          </div>
          <span className="font-serif text-xl font-bold tracking-tight">Axiom</span>
        </div>
        <nav className="flex gap-8 text-xs font-semibold uppercase tracking-widest text-[#666666]">
          <Link href="/viva" className="hover:text-black transition-colors">Methodology</Link>
          <a href="https://github.com" className="hover:text-black transition-colors">Documentation</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 px-8 py-20 max-w-7xl mx-auto w-full animate-in">
        <div className="max-w-4xl space-y-6 mb-24">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Institutional Valuation Engine</p>
          <h1 className="text-6xl md:text-7xl font-serif text-black leading-[1.05] tracking-tight">
            How much is the next IPO <span className="italic text-gray-500">really</span> worth?
          </h1>
          <p className="text-lg text-[#444444] leading-relaxed max-w-2xl font-sans">
            Axiom bridges the gap between private market opacity and public market rigor. 
            We combine verified secondary transaction data with interactive fundamental analysis 
            to isolate the premium paid for market hype.
          </p>
        </div>

        {/* Featured Coverage */}
        <section className="space-y-8 border-t-[0.5px] border-[#CCCCCC] pt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif text-black">Coverage Universe</h2>
            <span className="text-[10px] uppercase tracking-widest text-[#666666] font-semibold">June 2026 Estimates</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyList.map((company) => (
              <Link key={company.id} href={`/company/${company.id}`} className="block group bg-white border border-[#E5E5E5] hover:border-black transition-colors duration-300">
                <div className="h-full p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-serif mb-1 group-hover:text-black transition-colors text-black">{company.label}</h3>
                        <p className="text-xs text-[#666666] uppercase tracking-wider">{company.industry}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-end border-b border-[#EEEEEE] pb-2">
                        <p className="text-[10px] text-[#666666] uppercase tracking-wider">Reported Val</p>
                        <p className="font-mono text-lg text-black">${company.baseline_metrics.reported_valuation.toFixed(1)}B</p>
                      </div>
                      <div className="flex justify-between items-end border-b border-[#EEEEEE] pb-2">
                        <p className="text-[10px] text-[#666666] uppercase tracking-wider">Expert Consensus</p>
                        <p className="font-mono text-lg text-black">${company.baseline_metrics.expert_consensus.toFixed(1)}B</p>
                      </div>
                      <div className="flex justify-between items-end border-b border-[#EEEEEE] pb-2">
                        <p className="text-[10px] text-[#666666] uppercase tracking-wider">Axiom Fair Value</p>
                        <p className="font-mono text-lg text-black">${company.baseline_metrics.axiom_fair_value.toFixed(1)}B</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 text-[10px] text-[#666666] uppercase tracking-wider pt-4 border-t border-[#EEEEEE]">
                    <div className="flex justify-between">
                      <span>Source: <span className="font-semibold text-black">{company.baseline_metrics.source}</span></span>
                      <span>{company.baseline_metrics.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{company.status_badge}</span>
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${company.baseline_metrics.confidence === 'High' ? 'bg-green-600' : 'bg-amber-500'}`}></span> 
                        {company.baseline_metrics.confidence} Confidence
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
