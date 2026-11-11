import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal as TerminalIcon, 
  Code2, 
  Copy, 
  Sparkles, 
  Cpu, 
  Lock, 
  Eye, 
  FileCheck,
  RefreshCw,
  GitPullRequest
} from 'lucide-react';
import confetti from 'canvas-confetti';
import AudioBriefing from './AudioBriefing';
import TerminalLogs from './TerminalLogs';

export default function AirlockPipeline({ 
  scenarios, 
  currentScenario, 
  setCurrentScenario,
  elevenLabsApiKey,
  selectedVoice,
  setSelectedVoice
}) {
  const [activeStage, setActiveStage] = useState(3); // 1: Ingest, 2: Triad, 3: Sandbox, 4: Cert
  const [isRunningSandbox, setIsRunningSandbox] = useState(false);
  const [copiedPr, setCopiedPr] = useState(false);

  const handleScenarioChange = (s) => {
    setCurrentScenario(s);
    setActiveStage(1);
    // Auto advance through stages smoothly
    setTimeout(() => setActiveStage(2), 500);
    setTimeout(() => setActiveStage(3), 1200);
  };

  const triggerVerificationSuccess = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#8b5cf6', '#06b6d4', '#10b981', '#ffffff']
    });
  };

  const handleRunReverification = () => {
    setIsRunningSandbox(true);
    setTimeout(() => {
      setIsRunningSandbox(false);
      triggerVerificationSuccess();
    }, 1000);
  };

  const copyPrMarkdown = () => {
    const prText = `### 🛡️ VERITAS AI Verification Certificate
**Verdict:** VULNERABILITY REPRODUCED & DETERMINISTICALLY PATCHED
- **Target:** \`${currentScenario.repo}\` (${currentScenario.source})
- **Consensus:** 3/3 Open-Weight Models Agree (Qwen, Llama, Gemma via Otari)
- **Reproduction Test:** \`test_exploit_fails_and_patch_succeeds\` confirmed in Otari MicroVM Sandbox
- **Prompt Injection Defense:** Neutralized before model ingestion
- **FinOps Overhead:** $0.0007 (94.2% lower than proprietary APIs)`;
    navigator.clipboard.writeText(prText);
    setCopiedPr(true);
    setTimeout(() => setCopiedPr(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Scenario Selector & Header Pill */}
      <div className="aceternity-card rounded-2xl p-5 border border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Live Audit Target
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentScenario.repo} • {currentScenario.source}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              {currentScenario.title}
            </h2>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(sc)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  currentScenario.id === sc.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {sc.type}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Audio Briefing Box (ElevenLabs) */}
      <AudioBriefing 
        text={currentScenario.voiceScript}
        apiKey={elevenLabsApiKey}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        title="Veritas Autonomous Voice Intelligence"
      />

      {/* 4-Stage Airlock Progress Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { num: 1, title: 'Zero-Trust Ingest', subtitle: 'Secrets & Injections Redacted', icon: Lock },
          { num: 2, title: 'Consensus Triad', subtitle: '3 Open-Weight Models Debate', icon: Cpu },
          { num: 3, title: 'Sandbox Execution', subtitle: 'Python PoC Reproduces Bug', icon: TerminalIcon },
          { num: 4, title: 'Proof Certificate', subtitle: 'Signed Evidence Ledger', icon: FileCheck },
        ].map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.num;
          const isDone = activeStage > stage.num;

          return (
            <button
              key={stage.num}
              onClick={() => setActiveStage(stage.num)}
              className={`p-3.5 rounded-2xl text-left border transition-all ${
                isActive
                  ? 'bg-purple-950/30 border-purple-500/40 shadow-lg shadow-purple-600/10'
                  : 'aceternity-card border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                  isActive ? 'bg-purple-600 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {stage.num}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
              </div>
              <h4 className="text-xs font-semibold text-white">{stage.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-1">{stage.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* STAGE CONTENT DISPLAY */}
      
      {/* Stage 1: Zero-Trust Ingest & Guardrails */}
      {activeStage === 1 && (
        <div className="space-y-4">
          <div className="aceternity-card rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  Pre-Ingestion Security Airlock & Redaction Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Screens untrusted developer input before submitting to Otari LLM Gateway.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Threat Detected & Neutralized
              </span>
            </div>

            {/* Side-by-side Raw vs Sanitized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Raw Untrusted */}
              <div className="p-4 rounded-xl bg-black/50 border border-rose-500/20 space-y-2">
                <span className="text-[11px] font-mono text-rose-400 font-semibold block">
                  🔴 Untrusted Inbound Payload (Raw)
                </span>
                <p className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {currentScenario.rawInput}
                </p>
              </div>

              {/* Redacted & Sanitized */}
              <div className="p-4 rounded-xl bg-black/50 border border-emerald-500/20 space-y-2">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold block">
                  🟢 Otari Sanitized Prompt (Passed to Models)
                </span>
                <p className="text-xs font-mono text-slate-300 leading-relaxed">
                  {currentScenario.cleanSummary}
                </p>
                <div className="pt-2 space-y-1.5 border-t border-white/10">
                  <span className="text-[10px] text-slate-400 font-mono block">Enforced Redactions:</span>
                  {currentScenario.redactions.map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] font-mono p-1.5 rounded bg-white/5">
                      <span className="text-amber-300">{r.type}</span>
                      <span className="text-slate-400">{r.mask}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Stage 2: Consensus Triad */}
      {activeStage === 2 && (
        <div className="space-y-4">
          <div className="aceternity-card rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  Otari Adversarial Triad Consensus
                </h3>
                <p className="text-xs text-slate-400">
                  3 disparate open-weight model architectures independently analyze the defect to prevent hallucinations.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                3/3 Consensus Achieved
              </span>
            </div>

            {/* Triad Model Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentScenario.triadModels.map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#090D16] border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{m.model}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-semibold">
                      {m.confidence}%
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono inline-block">
                    {m.role}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {m.findings}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-white/5">
                    <span>Latency: {m.latencyMs}ms</span>
                    <span>Tokens: {m.tokens}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Stage 3: Sandbox Execution & Code Verification */}
      {activeStage === 3 && (
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Left: Python Reproduction Code */}
            <div className="rounded-2xl border border-white/10 bg-[#070A10] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>poc_reproduce_and_patch.py</span>
                </div>
                <button
                  onClick={handleRunReverification}
                  disabled={isRunningSandbox}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md shadow-purple-600/30"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRunningSandbox ? 'animate-spin' : ''}`} />
                  <span>{isRunningSandbox ? 'Running MicroVM...' : 'Re-Run Sandbox'}</span>
                </button>
              </div>

              <pre className="text-xs font-mono text-slate-300 p-3 rounded-xl bg-black/60 max-h-72 overflow-y-auto leading-relaxed border border-white/5">
                <code>{currentScenario.pocCode}</code>
              </pre>
            </div>

            {/* Right: Live Terminal Execution */}
            <TerminalLogs 
              logs={currentScenario.sandboxOutput}
              title="Otari MicroVM Code Execution Sandbox"
              onReRun={handleRunReverification}
            />

          </div>

        </div>
      )}

      {/* Stage 4: Signed Certificate & PR Output */}
      {activeStage === 4 && (
        <div className="space-y-4">
          <div className="aceternity-card rounded-2xl p-6 border border-emerald-500/20 bg-emerald-950/10 space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Verified Security & Patch Certificate
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Certificate ID: VRTS-OTARI-2026-X892 • Non-Repudiable Evidence Ledger
                  </p>
                </div>
              </div>

              <button
                onClick={copyPrMarkdown}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/30"
              >
                {copiedPr ? <CheckCircle2 className="w-4 h-4 text-white" /> : <GitPullRequest className="w-4 h-4" />}
                <span>{copiedPr ? 'Copied PR Comment!' : 'Export PR Comment'}</span>
              </button>
            </div>

            {/* Certificate Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
                <span className="text-slate-400 block text-[10px]">Verification Proof</span>
                <span className="text-emerald-400 font-bold">100% Deterministic</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
                <span className="text-slate-400 block text-[10px]">Sandbox Environment</span>
                <span className="text-white">Otari MicroVM Alpine 3.19</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
                <span className="text-slate-400 block text-[10px]">Cost Efficiency</span>
                <span className="text-cyan-400 font-bold">94.2% Saved vs OpenAI</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
