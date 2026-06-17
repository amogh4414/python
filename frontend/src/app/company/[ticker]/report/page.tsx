'use client'

import { use } from 'react'
import { companies } from '@/lib/data'
import { notFound } from 'next/navigation'

export default function PrintableReport({ params }: { params: Promise<{ ticker: string }> }) {
  const unwrappedParams = use(params)
  const ticker = unwrappedParams.ticker
  const company = (companies as Record<string, any>)[ticker]

  if (!company) {
    notFound()
  }

  const baseline = company.baseline_metrics;
  const impliedMultiple = (baseline.reported_valuation / baseline.revenue_actual).toFixed(1);

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 print:pb-0">
      
      {/* Print Header */}
      <header className="px-12 py-8 flex items-center justify-between border-b-[0.5px] border-black">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-serif font-bold text-lg">A</div>
          <span className="font-serif text-xl font-bold tracking-tight">Axiom Research</span>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Institutional Report</p>
          <p className="text-xs text-[#666666] font-mono mt-1">Date: June 9, 2026</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-12 py-12 space-y-12">
        
        {/* Title Block */}
        <div className="space-y-4">
          <h1 className="text-5xl font-serif font-bold leading-tight">{company.label}</h1>
          <p className="text-xl font-serif text-[#666666] italic">{company.headline}</p>
        </div>

        {/* Executive Summary */}
        <section className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b-[0.5px] border-black pb-2 text-[#666666]">Executive Summary</h2>
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="p-5 border border-[#E5E5E5] bg-[#F9F9F6]">
              <p className="text-[10px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Reported Valuation</p>
              <p className="text-2xl font-mono text-black">${baseline.reported_valuation.toFixed(1)}B</p>
            </div>
            <div className="p-5 border border-[#E5E5E5] bg-[#F9F9F6]">
              <p className="text-[10px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Axiom Fair Value</p>
              <p className="text-2xl font-mono text-black">${baseline.axiom_fair_value.toFixed(1)}B</p>
            </div>
            <div className="p-5 border border-[#E5E5E5] bg-[#F9F9F6]">
              <p className="text-[10px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Current Revenue</p>
              <p className="text-2xl font-mono text-black">${baseline.revenue_actual}B</p>
            </div>
            <div className="p-5 border border-[#E5E5E5] bg-[#F9F9F6]">
              <p className="text-[10px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">Implied Multiple</p>
              <p className="text-2xl font-mono text-black">{impliedMultiple}x</p>
            </div>
          </div>
          <p className="text-base leading-relaxed text-[#444444] font-sans">
            {company.description}
          </p>
        </section>

        {/* Source Traceability */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b-[0.5px] border-black pb-2 text-[#666666]">Source Transparency & Audit</h2>
          <table className="w-full text-sm text-left border-collapse border border-[#E5E5E5]">
            <thead className="bg-[#F9F9F6] text-[#666666] uppercase tracking-wider text-[10px] font-semibold">
              <tr>
                <th className="px-4 py-3 border-b border-[#E5E5E5]">Metric</th>
                <th className="px-4 py-3 border-b border-[#E5E5E5]">Source</th>
                <th className="px-4 py-3 border-b border-[#E5E5E5]">Tier</th>
                <th className="px-4 py-3 border-b border-[#E5E5E5]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] font-mono text-xs">
              {company.sources.map((source: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-4 py-4 font-sans text-black">{source.metric}</td>
                  <td className="px-4 py-4 text-[#444444]">{source.source_name}</td>
                  <td className="px-4 py-4 text-[#666666]">{source.tier}</td>
                  <td className={`px-4 py-4 font-bold ${source.status === 'Verified' ? 'text-green-700' : source.status === 'Estimated' ? 'text-amber-700' : 'text-red-700'}`}>
                    {source.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Valuation Methodology */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b-[0.5px] border-black pb-2 text-[#666666]">Sum-Of-The-Parts (SOTP) Baseline</h2>
          <table className="w-full text-sm text-left border-collapse border border-[#E5E5E5]">
            <thead className="bg-[#F9F9F6] text-[#666666] uppercase tracking-wider text-[10px] font-semibold">
              <tr>
                <th className="px-4 py-3 border-b border-[#E5E5E5]">Segment</th>
                <th className="px-4 py-3 border-b border-[#E5E5E5] text-right">Revenue</th>
                <th className="px-4 py-3 border-b border-[#E5E5E5] text-right">Target Multiple</th>
                <th className="px-4 py-3 border-b border-[#E5E5E5] text-right">Implied EV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] font-mono text-xs">
              {company.segments.map((seg: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-4 py-4 font-sans font-medium text-black">{seg.label}</td>
                  <td className="px-4 py-4 text-right text-[#444444]">${seg.revenue.toFixed(1)}B</td>
                  <td className="px-4 py-4 text-right text-[#444444]">{seg.default_multiple.toFixed(1)}x</td>
                  <td className="px-4 py-4 text-right text-black font-bold">${(seg.revenue * seg.default_multiple).toFixed(1)}B</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </main>
    </div>
  )
}
