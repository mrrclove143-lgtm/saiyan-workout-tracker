import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Compass, Play } from "lucide-react";
import { motivationalQuotes } from "../data/exercises";

export default function Landing() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Bulletproof direct embedding fallbacks
  const gokuGifs = [
    "/goku_warming_up.gif",
    "/goku-landing.gif",
    "https://media.tenor.com/J3-L8T2N12AAAAAd/goku-pushups.gif", // Goku handstand pushups (Tenor direct)
    "https://media.tenor.com/g0R_F_ZfG-0AAAAC/goku-training.gif",  // Goku punch training (Tenor direct)
    "https://i.giphy.com/GRSnxyhJnPsaQ.gif"            // Goku Power Up (i.giphy fallback)
  ];

  const [gifIndex, setGifIndex] = useState(0);

  const handleGifError = () => {
    if (gifIndex < gokuGifs.length - 1) {
      setGifIndex(gifIndex + 1);
    }
  };

  // Pick a random Goku quote on load (or show the user's favorite)
  const mainQuote = "No excuses. No limits. Just the next level";

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6 relative overflow-hidden py-12 select-none">
      {/* Anime Energy Sphere in Background */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] left-1/4 w-48 h-48 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Content Card Container */}
      <div className="w-full max-w-md flex flex-col items-center text-center z-10 safe-bottom">
        {/* Goku Training GIF Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="w-full h-48 md:h-56 rounded-2xl border border-orange-saiyan/30 overflow-hidden bg-zinc-950/80 shadow-[0_0_25px_rgba(255,107,0,0.3)] mb-6 relative"
        >
          {/* Glowing Aura Effect behind GIF */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent pointer-events-none z-10" />
          
          <img
            src={gokuGifs[gifIndex]}
            onError={handleGifError}
            alt="Goku Training"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Title / Hero */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-display font-black tracking-tight leading-tight text-white mb-6 uppercase"
        >
          CJ's <span className="text-orange-saiyan text-glow-orange">Workout</span> Tracker
        </motion.h1>

        {/* Motivation Goku Quote Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-5 rounded-2xl border-l-4 border-l-orange-saiyan mb-8 relative shadow-xl"
        >
          {/* Quote quotation mark background */}
          <span className="absolute top-2 left-3 text-6xl text-orange-saiyan/10 font-serif leading-none select-none">“</span>
          <p className="text-zinc-200 text-sm md:text-base font-sans italic relative z-10 leading-relaxed px-4">
            "{mainQuote}"
          </p>
          <span className="block mt-2 text-right text-xs font-display font-bold text-orange-saiyan uppercase tracking-wider">
            — Son Goku
          </span>
        </motion.div>

        {/* Warm-Up Reminder Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-gradient-to-r from-orange-950/40 to-amber-950/20 border border-orange-saiyan/20 rounded-2xl p-4.5 mb-8 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-3.5">
            <div className="bg-orange-500/10 p-2.5 rounded-xl border border-orange-saiyan/25">
              <Flame className="w-5 h-5 text-orange-saiyan animate-pulse" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-orange-saiyan font-display font-bold uppercase tracking-wider block">Daily Briefing</span>
              <span className="text-sm font-display font-extrabold text-white">Warm-up: 1.5 km Treadmill</span>
            </div>
          </div>
          <div className="text-xs font-sans text-zinc-400 bg-zinc-950/50 px-3 py-1.5 rounded-lg border border-zinc-800">
            Cardio Prep
          </div>
        </motion.div>

        {/* Start Workout Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full"
        >
          <button
            onClick={() => navigate("/selection")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full relative py-4 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-display font-black text-lg rounded-2xl shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:shadow-[0_0_40px_rgba(255,107,0,0.65)] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {/* Sparkly Aura overlay on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/10 mix-blend-overlay"
                />
              )}
            </AnimatePresence>

            <Play className="w-5 h-5 fill-black stroke-black" />
            <span className="uppercase tracking-wider">Start Workout</span>

            {/* Glowing button border */}
            <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
          </button>
        </motion.div>

        {/* Quick motivational subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-widest mt-4"
        >
          Prepare to break your limits today
        </motion.p>
      </div>
    </div>
  );
}
