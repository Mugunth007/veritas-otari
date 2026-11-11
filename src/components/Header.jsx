import React from 'react';
import { Shield, Sparkles, Volume2, Terminal, Cpu } from 'lucide-react';

export default function Header({ 
  onOpenSettings, 
  activeTab, 
  setActiveTab,
  hasElevenLabsKey
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080B11]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Hackathon Tag */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-xl bg-[#0E131F] border border-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  VERITAS
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  Otari AI
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                Zero-Trust Vulnerability Airlock & Sandbox
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Judge Pack removed) */}
          <nav className="flex items-center gap-1.5 bg-[#0E131F]/90 p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('airlock')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'airlock'
                  ? 'bg-purple-600/30 text-white border border-purple-500/30 shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>Airlock Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('finops')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'finops'
                  ? 'bg-cyan-600/30 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Otari Telemetry</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Live Gateway Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Otari MicroVM Ready</span>
            </div>

            {/* Voice Settings Trigger */}
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all shadow-sm"
              title="Voice & Gateway Settings"
            >
              <Volume2 className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">ElevenLabs Voice</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>

            {/* GitHub Repo */}
            <a
              href="https://github.com/mozilla-ai/otari"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="Mozilla Otari Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
