import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, Check, Play, ShieldAlert, Cpu } from 'lucide-react';

export default function TerminalLogs({ 
  logs = [], 
  title = "Otari MicroVM Code Execution Sandbox",
  onReRun
}) {
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('all');

  const copyLogs = () => {
    const text = logs.map(l => `[${l.time}] ${l.msg}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredLogs = logs.filter(l => {
    if (filter === 'errors') return l.msg.includes('❌') || l.msg.includes('CONFIRMED');
    if (filter === 'success') return l.msg.includes('✅') || l.msg.includes('VERIFIED');
    return true;
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-[#070A10] overflow-hidden shadow-2xl">
      
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0C101A] border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <TerminalIcon className="w-3.5 h-3.5 text-purple-400" />
            <span>{title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-sans">
              Airgapped
            </span>
          </div>
        </div>

        {/* Filter & Copy Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-black/40 p-0.5 border border-white/5 text-[11px] font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-0.5 rounded ${filter === 'all' ? 'bg-purple-600/40 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('errors')}
              className={`px-2 py-0.5 rounded ${filter === 'errors' ? 'bg-rose-600/40 text-rose-200' : 'text-slate-400 hover:text-white'}`}
            >
              Exploit
            </button>
            <button
              onClick={() => setFilter('success')}
              className={`px-2 py-0.5 rounded ${filter === 'success' ? 'bg-emerald-600/40 text-emerald-200' : 'text-slate-400 hover:text-white'}`}
            >
              Verify
            </button>
          </div>

          <button
            onClick={copyLogs}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-xs"
            title="Copy logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-xs leading-relaxed space-y-1.5 max-h-72 overflow-y-auto">
        {filteredLogs.map((log, index) => {
          const isError = log.msg.includes('❌') || log.msg.includes('TimeoutError');
          const isSuccess = log.msg.includes('✅') || log.msg.includes('VERIFIED');
          const isHeading = log.msg.startsWith('>>');

          return (
            <div 
              key={index} 
              className={`flex items-start gap-2.5 transition-all ${
                isError 
                  ? 'text-rose-400 bg-rose-500/[0.06] p-1.5 rounded-lg border border-rose-500/20' 
                  : isSuccess 
                  ? 'text-emerald-400 bg-emerald-500/[0.06] p-1.5 rounded-lg border border-emerald-500/20' 
                  : 'text-slate-300'
              }`}
            >
              <span className="text-slate-500 select-none text-[10px] w-12 shrink-0 pt-0.5">
                {log.time}
              </span>
              <span className="break-all whitespace-pre-wrap flex-1">
                {log.msg}
              </span>
            </div>
          );
        })}

        <div className="flex items-center gap-2 pt-2 text-slate-500 text-[11px]">
          <span className="inline-block w-2 h-4 bg-purple-400 animate-pulse"></span>
          <span>Airlock execution stream closed. Status: 0 exit code.</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-[#090D16] border-t border-white/[0.05] flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-slate-500" />
          <span>Runtime: Python 3.11.8 on Alpine MicroVM</span>
        </div>
        <div className="text-emerald-400 font-semibold">
          Deterministic Guarantee: High
        </div>
      </div>

    </div>
  );
}
