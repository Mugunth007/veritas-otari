import React, { useState } from 'react';
import { X, Key, Volume2, Check, Sparkles, Server } from 'lucide-react';
import { ELEVENLABS_VOICES } from '../services/elevenlabs';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  apiKey, 
  setApiKey,
  selectedVoice,
  setSelectedVoice,
  otariEndpoint,
  setOtariEndpoint
}) {
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [tempEndpoint, setTempEndpoint] = useState(otariEndpoint || 'http://localhost:8000/v1');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(tempKey);
    setOtariEndpoint(tempEndpoint);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0A0E17] p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">System & Voice Settings</h3>
              <p className="text-xs text-slate-400">Configure ElevenLabs TTS and Otari Gateway credentials</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4">
          
          {/* ElevenLabs API Key */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                ElevenLabs API Key
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Optional</span>
            </label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="xi-..."
              className="w-full text-xs font-mono bg-[#0F1422] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Leave blank to automatically use the browser's built-in Speech Synthesis with zero setup.
            </p>
          </div>

          {/* Voice Actor Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Default Executive Voice
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full text-xs bg-[#0F1422] border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500 transition-all font-medium"
            >
              {ELEVENLABS_VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} — {v.description}
                </option>
              ))}
            </select>
          </div>

          {/* Otari Gateway URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              Mozilla Otari Gateway Endpoint
            </label>
            <input
              type="text"
              value={tempEndpoint}
              onChange={(e) => setTempEndpoint(e.target.value)}
              placeholder="http://localhost:8000/v1"
              className="w-full text-xs font-mono bg-[#0F1422] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Default proxy routes to local Otari LLM Gateway daemon (`otari start`).
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Credentials</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
