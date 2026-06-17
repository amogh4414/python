'use client'

import { useState, useMemo, useEffect } from 'react'

export function ValuationLab({ company }: { company: Record<string, any> }) {
  const scenarios = company.scenarios

  const [activeScenario, setActiveScenario] = useState('consensus')
  const [inputs, setInputs] = useState(scenarios['consensus'])

  useEffect(() => {
    setActiveScenario('consensus')
    setInputs(company.scenarios['consensus'])
  }, [company])

  const handleScenarioChange = (s: string) => {
    setActiveScenario(s)
    setInputs(scenarios[s])
  }

  const baseEV = useMemo(() => {
    let ev = 0;
    company.segments.forEach((seg: any) => {
      const mult = inputs.multiples[seg.id] || seg.default_multiple;
      ev += seg.revenue * mult;
    });
    return ev;
  }, [inputs, company])

  const heatmapGrowth = [
    inputs.growth - 20, 
    inputs.growth - 10, 
    inputs.growth, 
    inputs.growth + 10, 
    inputs.growth + 20
  ].map(g => Math.max(0, g));
  
  const heatmapWacc = [
    inputs.wacc + 4, 
    inputs.wacc + 2, 
    inputs.wacc, 
    inputs.wacc - 2, 
    inputs.wacc - 4
  ].map(w => Math.max(1, w));

  const getCellColor = (ev: number) => {
    const target = company.baseline_metrics.reported_valuation;
    if (ev < target * 0.7) return 'bg-red-50 text-red-800'
    if (ev > target * 1.3) return 'bg-green-50 text-green-800'
    return 'bg-gray-50 text-gray-800'
  }

  return (
    <div className="border border-[#E5E5E5] bg-white p-10 shadow-sm mt-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 border-b border-[#E5E5E5] pb-6 gap-6">
        <div>
          <h2 className="text-2xl font-serif text-black">Interactive Valuation Lab</h2>
          <p className="text-sm text-[#666666] mt-2 font-sans">Sum-Of-The-Parts (SOTP) & Sensitivity Analysis</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(scenarios).map(s => (
            <button 
              key={s}
              onClick={() => handleScenarioChange(s)}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest font-semibold border transition-colors duration-200 ${
                activeScenario === s 
                ? 'border-black bg-black text-white' 
                : 'border-[#E5E5E5] text-[#666666] hover:border-black hover:text-black'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Inputs */}
        <div className="lg:col-span-3 space-y-8 min-w-0">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#666666] border-b border-[#E5E5E5] pb-2">Assumptions</h3>
          
          <div className="space-y-6">
            <div className="space-y-2 group">
              <div className="flex justify-between text-sm">
                <span className="text-black font-medium">Revenue Growth (5Y CAGR)</span>
                <span className="font-mono text-black">{inputs.growth}%</span>
              </div>
              <input 
                type="range" min="10" max="150" step="5" 
                value={inputs.growth} 
                onChange={(e) => setInputs({...inputs, growth: Number(e.target.value)})}
                className="w-full accent-black opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between text-sm">
                <span className="text-black font-medium">Discount Rate (WACC)</span>
                <span className="font-mono text-black">{inputs.wacc}%</span>
              </div>
              <input 
                type="range" min="6" max="20" step="1" 
                value={inputs.wacc} 
                onChange={(e) => setInputs({...inputs, wacc: Number(e.target.value)})}
                className="w-full accent-black opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>

            {company.segments.map((seg: any, idx: number) => (
              <div key={seg.id} className={`space-y-2 group ${idx === 0 ? 'pt-6 border-t border-[#E5E5E5]' : ''}`}>
                <div className="flex justify-between text-sm">
                  <span className="text-black font-medium truncate pr-2">{seg.label} Mult</span>
                  <span className="font-mono text-black shrink-0">{inputs.multiples[seg.id] || seg.default_multiple}x</span>
                </div>
                <input 
                  type="range" min={seg.multiple_range[0]} max={seg.multiple_range[1]} step="1" 
                  value={inputs.multiples[seg.id] || seg.default_multiple} 
                  onChange={(e) => {
                    const newMultiples = {...inputs.multiples};
                    newMultiples[seg.id] = Number(e.target.value);
                    setInputs({...inputs, multiples: newMultiples});
                  }}
                  className="w-full accent-black opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Output Summary */}
        <div className="lg:col-span-3 lg:border-l lg:border-r border-[#E5E5E5] lg:px-6 flex flex-col justify-center gap-8 min-w-0">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#666666] mb-3 font-semibold truncate">Implied Enterprise Value</p>
            <p className="text-4xl xl:text-5xl font-serif font-bold text-black break-words leading-tight">
              ${(baseEV).toFixed(1)}B
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="border-t border-[#E5E5E5] pt-4">
              <p className="text-[10px] uppercase tracking-widest text-[#666666] mb-2 font-semibold truncate">IPO Pricing (Base - 15%)</p>
              <p className="text-2xl font-mono text-black break-words">${(baseEV * 0.85).toFixed(1)}B</p>
            </div>
            <div className="border-t border-[#E5E5E5] pt-4">
              <p className="text-[10px] uppercase tracking-widest text-[#666666] mb-2 font-semibold truncate">Valuation vs Reported</p>
              <p className={`text-xl font-mono break-words ${baseEV >= company.baseline_metrics.reported_valuation ? 'text-green-700' : 'text-red-700'}`}>
                {(((baseEV / company.baseline_metrics.reported_valuation) - 1) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Right: Sensitivity Heatmap */}
        <div className="lg:col-span-6 min-w-0">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#666666] border-b border-[#E5E5E5] pb-2 mb-6 truncate">Sensitivity: Growth vs WACC</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono text-right border-collapse min-w-[300px]">
              <thead>
                <tr>
                  <th className="p-3 text-[#666666] font-sans font-normal border-b border-[#E5E5E5] text-left">WACC \ Gr</th>
                  {heatmapGrowth.map(g => (
                    <th key={g} className="p-3 border-b border-[#E5E5E5] text-[#666666] font-normal">{g}%</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {heatmapWacc.map(w => (
                  <tr key={w}>
                    <td className="p-3 border-r border-[#E5E5E5] text-[#666666] font-normal text-left">{w}%</td>
                    {heatmapGrowth.map(g => {
                      const proxyMultiplier = (g / Math.max(1, inputs.growth)) * (inputs.wacc / Math.max(1, w));
                      const proxyEV = baseEV * proxyMultiplier;
                      return (
                        <td key={`${w}-${g}`} className={`p-3 border-l border-white transition-colors duration-300 ${getCellColor(proxyEV)}`}>
                          {proxyEV > 1000 ? `${(proxyEV/1000).toFixed(2)}T` : `${proxyEV.toFixed(0)}B`}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#666666] mt-4 font-sans tracking-wide">
            Values reflect Enterprise Value (EV). Excludes terminal dilution and net debt adjustments.
          </p>
        </div>
      </div>
    </div>
  )
}
