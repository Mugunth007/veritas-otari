/**
 * ElevenLabs Speech Synthesis Service
 * Configured with expressive, energetic female voice by default.
 */

export const DEFAULT_ELEVENLABS_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';

// Expressive & Energetic Female Voices verified on the account
export const ELEVENLABS_VOICES = [
  { 
    id: 'EXAVITQu4vr4xnSDxMaL', 
    name: 'Sarah (Expressive & Energetic)', 
    description: 'Dynamic, confident, and highly articulate' 
  },
  { 
    id: 'Xb7hH8MSUJpSbSDYk0k2', 
    name: 'Alice (Clear & Engaging)', 
    description: 'Enthusiastic educator & product presenter' 
  },
  { 
    id: 'cgSgspJ2msm6clMCkdW9', 
    name: 'Jessica (Bright & Upbeat)', 
    description: 'Conversational, warm, and lively' 
  },
  { 
    id: 'FGY2WhTYpPnrIDTdsKH5', 
    name: 'Laura (Enthusiastic & Vivid)', 
    description: 'High energy and assertive' 
  },
];

export async function synthesizeVoice({ 
  text, 
  apiKey = DEFAULT_ELEVENLABS_KEY, 
  voiceId = 'EXAVITQu4vr4xnSDxMaL' // Default to Sarah (Expressive & Energetic)
}) {
  const activeKey = (apiKey && apiKey.trim().length > 10) ? apiKey.trim() : DEFAULT_ELEVENLABS_KEY;

  if (activeKey) {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': activeKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.38, // Lower stability = more dynamic & expressive inflection
            similarity_boost: 0.85,
            style: 0.45, // Elevated style exaggeration for energetic delivery
            use_speaker_boost: true,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.detail?.message || `ElevenLabs HTTP error ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return { url: audioUrl, source: 'elevenlabs' };
    } catch (err) {
      console.warn('ElevenLabs API call failed, falling back to Web Speech API:', err);
    }
  }

  // Web Speech Fallback
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      resolve({
        source: 'browser-speech',
        playSpeech: () => {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 1.1; // Slightly faster for higher energy
          utterance.pitch = 1.15; // Slightly higher pitch for female expressive clarity
          
          const voices = window.speechSynthesis.getVoices();
          const preferred = voices.find(v => 
            v.lang.startsWith('en') && 
            (v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Google US English'))
          );
          if (preferred) utterance.voice = preferred;

          window.speechSynthesis.speak(utterance);
          return utterance;
        }
      });
    } else {
      resolve({ source: 'none' });
    }
  });
}
