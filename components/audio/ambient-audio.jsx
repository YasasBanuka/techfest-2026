"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

/**
 * AmbientAudio
 * ────────────
 * Synthesizes a low-frequency, modulated 'Tech Hum' using the Web Audio API.
 * This avoids external assets and creates a 'Surreal' procedurally generated soundscape.
 */
const AmbientAudio = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef({
    osc1: null,
    osc2: null,
    lfo: null,
    gain: null,
    filter: null,
  });

  const stopAudio = () => {
    if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const startAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Create Oscillators for the base hum
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = "sine";
    osc2.type = "triangle";
    osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
    osc2.frequency.setValueAtTime(55.5, ctx.currentTime); // Slight detune for phasing

    // Create Filter for a 'warm' deep sound
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.Q.setValueAtTime(10, ctx.currentTime);

    // Create Gain (Volume control)
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2); // Fade in

    // Create LFO for subtle 'pulsing' movement
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // Very slow pulse
    lfoGain.gain.setValueAtTime(50, ctx.currentTime);

    // Routing
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Start everything
    osc1.start();
    osc2.start();
    lfo.start();

    nodesRef.current = { osc1, osc2, lfo, gain, filter };
    setIsPlaying(true);
  };

  useImperativeHandle(ref, () => ({
    toggle: () => {
      if (isPlaying) stopAudio();
      else startAudio();
    },
    isPlaying
  }));

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAudio();
  }, []);

  return null; // Logic-only component
});

AmbientAudio.displayName = "AmbientAudio";
export default AmbientAudio;
