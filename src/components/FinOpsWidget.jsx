import React from 'react';
import { DollarSign, Zap, TrendingDown, Layers, ShieldCheck, Activity } from 'lucide-react';

export default function FinOpsWidget({ metrics, scenario }) {
  return (
    <div className="space-y-6">
      
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Card 1: Cost Savings */}
        <div className="aceternity-card rounded-2xl p-4 border border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Cost Reduction vs Frontier</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">
              {metrics.savingsPct}%
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Saved per scan
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Otari: ${metrics.otariCost} vs OpenAI: ${metrics.proprietaryCost}
          </p>
        </div>

        {/* Card 2: Consensus Agreement */}
        <div className="aceternity-card rounded-2xl p-4 border border-purple-500/20 bg-purple-950/10">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Triad Consensus</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-300">
              {metrics.consensusScore}%
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              3/3 Models Agree
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Qwen-Coder + Llama 3 + Gemma 2
          </p>
        </div>

        {/* Card 3: Avg Routing Latency */}
        <div className="aceternity-card rounded-2xl p-4 border border-cyan-500/20 bg-cyan-950/10">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Otari Gateway Latency</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-cyan-300">
              {metrics.avgLatency}ms
            </span>
            <span className="text-xs text-slate-400 font-mono">
              P95 response
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Local & dedicated open-weight host
          </p>
        </div>

        {/* Card 4: Tokens Processed */}
        <div className="aceternity-card rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Tokens Billed</span>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              {metrics.totalTokens.toLocaleString()}
            </span>
            <span className="text-xs text-purple-400 font-mono">
              Tokens
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Budget Remaining: $24.95 / $25.00
          </p>
        </div>

      </div>

      {/* Model Routing Breakdown Table */}
      <div className="aceternity-card rounded-2xl p-5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Otari LLM Gateway Multi-Model Routing Ledger
            </h3>
            <p className="text-xs text-slate-400">
              Zero vendor lock-in: dynamically routing across open-weight models based on task suitability.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Policy: Round-Robin Consensus
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 pb-2">
                <th className="py-2">Model Family</th>
                <th className="py-2">Specialized Role</th>
                <th className="py-2">Confidence</th>
                <th className="py-2">Latency</th>
                <th className="py-2">Tokens</th>
                <th className="py-2">Estimated Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {scenario.triadModels.map((m, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    {m.model}
                  </td>
                  <td className="py-3 text-slate-300">{m.role}</td>
                  <td className="py-3 text-emerald-400">{m.confidence}%</td>
                  <td className="py-3 text-cyan-300">{m.latencyMs}ms</td>
                  <td className="py-3">{m.tokens}</td>
                  <td className="py-3 text-slate-400">${((m.tokens / 1_000_000) * 0.20).toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Failover & Budget Guardrails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Failover Policy Card */}
        <div className="aceternity-card rounded-2xl p-5 border border-white/10">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-purple-400" />
            Automatic Fallback Policy Matrix
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            If any primary open-weight model experiences timeout (&gt;300ms) or context saturation, Otari LLM Gateway seamlessly falls back without pipeline disruption:
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span>Primary: Qwen-2.5-Coder-32B</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-slate-400">
              <span>Fallback 1: Devstral-2-123B</span>
              <span className="text-slate-500">STANDBY</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-slate-400">
              <span>Fallback 2: DeepSeek-Coder-V2-Lite</span>
              <span className="text-slate-500">STANDBY</span>
            </div>
          </div>
        </div>

        {/* Budget Circuit Breaker */}
        <div className="aceternity-card rounded-2xl p-5 border border-white/10">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            FinOps Pre-Debit Budget Governor
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Guarantees zero runaway cloud spending. Each subagent is allotted an atomic token bucket that stops execution immediately if budget thresholds are exceeded.
          </p>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Repository Monthly Allocation</span>
                <span className="text-emerald-400 font-semibold">$0.042 / $25.00</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-emerald-400 h-2 rounded-full" style={{ width: '2.5%' }}></div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
              🛡️ Circuit Breaker Status: SAFE. 99.8% headroom remaining.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
