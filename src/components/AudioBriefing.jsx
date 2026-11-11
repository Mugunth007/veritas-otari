import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { synthesizeVoice, ELEVENLABS_VOICES } from '../services/elevenlabs';

export default function AudioBriefing({ 
  text, 
  apiKey, 
  title = "Executive Security Briefing",
  selectedVoice,
  setSelectedVoice
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioSource, setAudioSource] = useState(null);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Reset audio state when text changes
    stopAudio();
    setAudioSource(null);
  }, [text]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handlePlayToggle = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await synthesizeVoice({
        text,
        apiKey,
        voiceId: selectedVoice
      });

      if (result.source === 'elevenlabs') {
        setAudioSource('elevenlabs');
        if (!audioRef.current) {
          audioRef.current = new Audio(result.url);
        } else {
          audioRef.current.src = result.url;
        }

        audioRef.current.onended = () => setIsPlaying(false);
        audioRef.current.onerror = () => {
          setError('Failed to play ElevenLabs audio stream');
          setIsPlaying(false);
        };

        await audioRef.current.play();
        setIsPlaying(true);
      } else if (result.source === 'browser-speech') {
        setAudioSource('browser-speech');
        const utterance = result.playSpeech();
        utteranceRef.current = utterance;
        
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        setIsPlaying(true);
      } else {
        setError('No audio synthesis engine available');
      }
    } catch (err) {
      setError(err.message || 'Audio generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 aceternity-card border border-purple-500/20 bg-gradient-to-r from-purple-950/20 via-[#0E131F]/90 to-cyan-950/20">
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-72 h-36 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left Side: Briefing Details & Waveform */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-purple-400' : 'bg-slate-500'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-purple-500' : 'bg-slate-400'}`}></span>
            </span>
            <h4 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-400" />
              {title}
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300">
              {apiKey ? 'ElevenLabs v2.5' : 'Browser TTS (No Key Required)'}
            </span>
          </div>

          <p className="text-xs text-slate-300/90 leading-relaxed font-sans line-clamp-2 pr-4">
            "{text}"
          </p>

          {/* Audio Waveform Animation (Shows active playback) */}
          <div className="flex items-center gap-1 pt-1 h-5">
            {[40, 75, 30, 90, 60, 100, 45, 80, 50, 70, 95, 35, 85, 55, 65, 40, 90, 50, 75, 60].map((height, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPlaying 
                    ? 'bg-gradient-to-t from-purple-500 to-cyan-400 animate-pulse' 
                    : 'bg-slate-700/60'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(15, (height * Math.random()).toFixed(0))}%` : '20%',
                  animationDelay: `${i * 0.05}s`
                }}
              ></span>
            ))}
            <span className="text-[10px] text-slate-400 font-mono ml-2">
              {isPlaying ? 'Speaking...' : 'Ready to stream'}
            </span>
          </div>
        </div>

        {/* Right Side: Voice Selector & Playback Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          
          {/* Voice Select */}
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="text-xs bg-[#090D16] border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500 font-medium"
          >
            {ELEVENLABS_VOICES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          {/* Play/Pause Button with Shimmer */}
          <button
            onClick={handlePlayToggle}
            disabled={isLoading}
            className={`relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30 border border-purple-400/30'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Voice</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Listen Briefing</span>
              </>
            )}
          </button>
        </div>

      </div>

      {error && (
        <p className="mt-2 text-xs text-rose-400 font-mono">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
