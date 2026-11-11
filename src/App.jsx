import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AirlockPipeline from './components/AirlockPipeline';
import FinOpsWidget from './components/FinOpsWidget';
import SettingsModal from './components/SettingsModal';
import { PRESET_SCENARIOS, calculateFinOpsMetrics } from './services/otariSimulator';
import { Shield, Sparkles, ArrowUpRight, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('airlock');
  const [currentScenario, setCurrentScenario] = useState(PRESET_SCENARIOS[0]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Credentials strictly loaded from user input or localStorage - NO hardcoded strings
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState(() => {
    return localStorage.getItem('ELEVENLABS_API_KEY') || '';
  });
  const [selectedVoice, setSelectedVoice] = useState('EXAVITQu4vr4xnSDxMaL'); // Sarah (Expressive & Energetic)
  const [otariEndpoint, setOtariEndpoint] = useState('http://localhost:8000/v1');

  useEffect(() => {
    if (elevenLabsApiKey) {
      localStorage.setItem('ELEVENLABS_API_KEY', elevenLabsApiKey);
    }
  }, [elevenLabsApiKey]);

  const metrics = calculateFinOpsMetrics(currentScenario);

  return (
    <div className="relative min-h-screen bg-[#080B11] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Background Ambient Glows & Grid (Aceternity Theme) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] radial-glow-violet opacity-60 pointer-events-none"></div>
      <div className="absolute top-48 right-0 w-[500px] h-[400px] radial-glow-cyan opacity-40 pointer-events-none"></div>

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        hasElevenLabsKey={Boolean(elevenLabsApiKey)}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-2">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Mozilla Otari Hackathon — Devs Wilding Submission</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Autonomous <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">Zero-Trust</span> Vulnerability Airlock
          </h1>

          <p className="text-sm sm:text-base text-slate-300/80 leading-relaxed max-w-2xl mx-auto font-sans">
            Guarding developers against prompt-injection and hallucinated fixes. Routes code across a <strong>3-model consensus triad</strong> (Qwen, Llama, Gemma) and deterministically reproduces bugs in <strong>Otari’s MicroVM Sandbox</strong>.
          </p>

          {/* Quick Stats Banner */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-[#0E131F]/90 border border-white/10 flex items-center gap-2">
              <span className="text-slate-400">Gateway:</span>
              <span className="text-purple-300 font-semibold">Mozilla.ai Otari</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#0E131F]/90 border border-white/10 flex items-center gap-2">
              <span className="text-slate-400">Models:</span>
              <span className="text-cyan-300 font-semibold">Qwen • Llama • Gemma</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#0E131F]/90 border border-white/10 flex items-center gap-2">
              <span className="text-slate-400">Sandbox:</span>
              <span className="text-emerald-400 font-semibold">Python MicroVM</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#0E131F]/90 border border-white/10 flex items-center gap-2">
              <span className="text-slate-400">Voice:</span>
              <span className="text-amber-300 font-semibold">ElevenLabs Voice</span>
            </div>
          </div>

        </div>

        {/* Tab Content */}
        {activeTab === 'airlock' ? (
          <AirlockPipeline
            scenarios={PRESET_SCENARIOS}
            currentScenario={currentScenario}
            setCurrentScenario={setCurrentScenario}
            elevenLabsApiKey={elevenLabsApiKey}
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
          />
        ) : (
          <FinOpsWidget
            metrics={metrics}
            scenario={currentScenario}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#070A10]/90 backdrop-blur-md py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">VERITAS AI</span>
            <span>• Built for the Mozilla Otari Hackathon (Devs Wilding Online)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a 
              href="https://github.com/mozilla-ai/otari" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>Otari Core Repo</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={elevenLabsApiKey}
        setApiKey={setElevenLabsApiKey}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        otariEndpoint={otariEndpoint}
        setOtariEndpoint={setOtariEndpoint}
      />

    </div>
  );
}
