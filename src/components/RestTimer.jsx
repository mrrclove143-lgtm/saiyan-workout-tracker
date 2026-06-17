import React, { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw, X, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RestTimer({ onTimerRunningChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [totalDuration, setTotalDuration] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [mute, setMute] = useState(false);
  const timerRef = useRef(null);

  // Play a cool DBZ retro-arcade power-up chime using Web Audio API (no external file needed!)
  const playPowerChime = () => {
    if (mute) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // First tone (rising C5 to G5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
      gain1.gain.setValueAtTime(0.1, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.3);

      // Second tone (delayed, rising G5 to C6)
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(783.99, ctx.currentTime); // G5
        osc2.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.2); // C6
        gain2.gain.setValueAtTime(0.1, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.35);
      }, 120);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by user gesture:", e);
    }
  };

  // Broadcast timer running state to trigger aura speedup
  useEffect(() => {
    if (onTimerRunningChange) {
      onTimerRunningChange(isRunning);
    }
  }, [isRunning, onTimerRunningChange]);

  // Main countdown logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playPowerChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Preset setter
  const handleSetPreset = (seconds) => {
    setIsRunning(false);
    setTotalDuration(seconds);
    setTimeRemaining(seconds);
  };

  const handleTogglePlay = () => {
    // Resume audio context if locked (browsers require a gesture)
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const tempCtx = new AudioCtx();
        if (tempCtx.state === "suspended") tempCtx.resume();
      }
    } catch (e) {}
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(totalDuration);
  };

  // Format time (e.g. 90 -> "01:30")
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Calculate SVG circular dash offset
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = totalDuration > 0
    ? circumference - (timeRemaining / totalDuration) * circumference
    : circumference;

  return (
    <>
      {/* Floating Timer Bubble FAB */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 bg-zinc-900/95 border border-orange-saiyan/40 p-3.5 rounded-full shadow-2xl hover:border-orange-saiyan/80 transition-colors flex items-center justify-center saiyan-glow"
        style={{ WebkitTapHighlightColor: "transparent" }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Timer className="w-6 h-6 text-orange-saiyan" />
        {isRunning && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white font-display font-bold text-[9px] px-1.5 py-0.5 rounded-full animate-pulse">
            {timeRemaining}s
          </span>
        )}
      </motion.button>

      {/* Timer Overlay Screen */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="w-full max-w-sm glass-panel rounded-3xl p-6 relative border border-orange-saiyan/30 shadow-3xl text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Mute Button */}
              <button
                onClick={() => setMute(!mute)}
                className="absolute top-4 left-4 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              >
                {mute ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-orange-saiyan/70" />}
              </button>

              <h3 className="text-xl font-display font-extrabold text-glow-orange text-orange-saiyan uppercase tracking-wider mb-2">
                Saiyan Rest Time
              </h3>
              <p className="text-xs text-zinc-400 font-sans mb-6">
                Charge your energy. Deep breaths for recovery.
              </p>

              {/* Presets Grid */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[60, 90, 120].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSetPreset(s)}
                    className={`py-2 rounded-xl font-display font-bold text-sm transition-all duration-200 ${
                      totalDuration === s
                        ? "bg-orange-saiyan text-black border border-orange-saiyan shadow-[0_0_12px_rgba(255,107,0,0.4)]"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-orange-saiyan/30"
                    }`}
                  >
                    {s} Sec
                  </button>
                ))}
              </div>

              {/* Circular Countdown Progress */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
                  {/* Track ring */}
                  <circle
                    cx="65"
                    cy="65"
                    r={radius}
                    fill="none"
                    stroke="#18181b"
                    strokeWidth="8"
                  />
                  {/* Glowing progress ring */}
                  <motion.circle
                    cx="65"
                    cy="65"
                    r={radius}
                    fill="none"
                    stroke="#ff6b00"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset }}
                    transition={{ ease: "linear", duration: isRunning ? 1 : 0.2 }}
                    strokeLinecap="round"
                    className="filter drop-shadow-[0_0_6px_rgba(255,107,0,0.6)]"
                  />
                </svg>

                {/* Clock Digital Display */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-black text-white tracking-widest text-glow-orange">
                    {formatTime(timeRemaining)}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-sans tracking-widest uppercase mt-0.5">
                    {isRunning ? "Charging Ki..." : "Standing By"}
                  </span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handleReset}
                  className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={handleTogglePlay}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold p-4.5 rounded-2xl shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all scale-105 active:scale-95"
                >
                  {isRunning ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black" />}
                </button>
                
                {/* 10s add helper button */}
                <button
                  onClick={() => {
                    setTimeRemaining(prev => prev + 10);
                    setTotalDuration(prev => prev + 10);
                  }}
                  className="bg-zinc-900 border border-zinc-800 py-3.5 px-3 rounded-2xl hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors font-display font-bold text-xs"
                >
                  +10s
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
