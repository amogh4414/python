'use client'

import Link from 'next/link'
import { use } from 'react'
import { ValuationLab } from '@/components/valuation-lab'
import { companies } from '@/lib/data'
import { notFound } from 'next/navigation'

export default function CompanyReport({ params }: { params: Promise<{ ticker: string }> }) {
  const unwrappedParams = use(params)
  const ticker = unwrappedParams.ticker
  const company = (companies as any)[ticker]

  if (!company) {
    notFound()
  }

  const baseline = company.baseline_metrics;

  return (
    <div className="min-h-screen bg-[#F9F9F6] text-[#111111] pb-24">
      {/* Navigation */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-[#E5E5E5] bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[#666666] hover:text-black transition-colors text-sm uppercase tracking-widest font-semibold">← Back</Link>
          <div className="w-px h-4 bg-[#E5E5E5]"></div>
          <span className="font-serif font-bold text-xl">Axiom Research</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-[10px] uppercase tracking-widest text-[#666666] font-semibold">Strictly Confidential</span>
          <Link href={`/company/${ticker}/report`} className="px-4 py-2 border border-black text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors duration-300">
            Export PDF
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-16 space-y-16 animate-in">
        
        {/* Title Block */}
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-[#666666] font-semibold">Initiating Coverage • {company.status_badge}</p>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.95] tracking-tight text-black">{company.label}</h1>
          <p className="text-2xl font-serif text-[#666666] italic max-w-3xl leading-relaxed mt-4">
            {company.headline}
          </p>
        </div>

        {/* Executive Summary Metrics - Redesigned KPI Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#E5E5E5] py-8 gap-8">
          <div className="flex flex-col border-r border-[#E5E5E5] pr-8">
            <span className="text-[10px] uppercase tracking-widest text-[#666666] font-semibold mb-2">Reported Valuation</span>
            <span className="text-4xl font-mono text-black">${baseline.reported_valuation.toFixed(1)}B</span>
            <div className="mt-3 text-[10px] uppercase font-bold text-green-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-700"></span> Secondary / News
            </div>
          </div>
          <div className="flex flex-col border-r border-[#E5E5E5] pr-8">
            <span className="text-[10px] uppercase tracking-widest text-[#666666] font-semibold mb-2">Expert Consensus</span>
            <span className="text-4xl font-mono text-black">${baseline.expert_consensus.toFixed(1)}B</span>
            <div className="mt-3 text-[10px] uppercase font-bold text-[#666666] flex items-center gap-1">
              Analyst Average
            </div>
          </div>
          <div className="flex flex-col border-r border-[#E5E5E5] pr-8">
            <span className="text-[10px] uppercase tracking-widest text-[#666666] font-semibold mb-2">Axiom Fair Value</span>
            <span className="text-4xl font-mono text-black">${baseline.axiom_fair_value.toFixed(1)}B</span>
            <div className="mt-3 text-[10px] uppercase font-bold text-black flex items-center gap-1">
              Intrinsic Model
            </div>
          </div>
          <div className="flex flex-col pr-8">
            <span className="text-[10px] uppercase tracking-widest text-[#666666] font-semibold mb-2">Market Premium</span>
            <span className={`text-4xl font-mono ${baseline.market_premium > 0 ? 'text-red-700' : 'text-green-700'}`}>
              {baseline.market_premium > 0 ? '+' : ''}{(baseline.market_premium * 100).toFixed(1)}%
            </span>
            <div className="mt-3 text-[10px] uppercase font-bold text-[#666666] flex items-center gap-1">
              Valuation vs Fair Value
            </div>
          </div>
        </section>

        {/* Valuation Reasoning */}
        <section className="bg-white border border-[#E5E5E5] p-10 mt-8 shadow-sm">
          <h2 className="text-lg font-serif text-black mb-4">Valuation Premium Reasoning</h2>
          <p className="text-lg text-[#444444] font-sans leading-relaxed">{baseline.valuation_reasoning}</p>
        </section>

        {/* Valuation Lab Integration */}
        <section className="space-y-4">
          <ValuationLab company={company} />
        </section>

        {/* Methodology */}
        <section className="max-w-3xl space-y-6">
          <h2 className="text-2xl font-serif border-b border-[var(--color-border)] pb-2">Methodology</h2>
          <div className="space-y-6 text-base text-[var(--color-foreground)] leading-relaxed">
            <p>
              {company.description}
            </p>
            <p>
              <strong>Handling of Estimates:</strong> We do not present single-point forecasts for unverified future metrics. Forward revenue is presented as a range based on median analyst consensus and internal Axiom modeling.
            </p>
          </div>
        </section>

        {/* Sources Directory */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif border-b border-[var(--color-border)] pb-2">Sources & Audit Trail</h2>
          <table className="w-full text-sm text-left border border-[var(--color-border)]">
            <thead className="bg-[#F9F9F6] text-[var(--color-muted)] uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-medium border-b border-[var(--color-border)]">Metric</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--color-border)]">Source</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--color-border)]">Tier</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--color-border)]">Date</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--color-border)] text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] font-mono text-[var(--color-muted)]">
              {company.sources.map((source: any, idx: number) => (
                <tr key={idx} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-6 py-4 font-sans text-[var(--color-foreground)]">{source.metric}</td>
                  <td className="px-6 py-4">
                    {source.url !== '#' ? <a href={source.url} className="hover:text-[var(--color-primary)] underline">{source.source_name}</a> : source.source_name}
                  </td>
                  <td className="px-6 py-4">{source.tier}</td>
                  <td className="px-6 py-4">{source.date}</td>
                  <td className={`px-6 py-4 text-right ${source.status === 'Verified' ? 'text-[var(--color-success)]' : source.status === 'Estimated' ? 'text-[var(--color-warning)]' : 'text-[var(--color-danger)]'}`}>
                    {source.confidence}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </main>
    </div>
  )
}
