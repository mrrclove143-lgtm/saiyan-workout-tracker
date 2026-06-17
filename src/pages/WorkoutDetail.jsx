import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Check, Trophy, Sparkles, MessageCircleWarning, Flame } from "lucide-react";
import { useWorkout } from "../context/WorkoutContext";
import { workoutDays, motivationalQuotes } from "../data/exercises";
import ExerciseMedia from "../components/ExerciseMedia";
import confetti from "canvas-confetti";

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completedExercises, toggleExercise, completeDay, completedDays } = useWorkout();
  const [showCelebration, setShowCelebration] = useState(false);
  const [successQuote, setSuccessQuote] = useState("");

  const dayId = parseInt(id);
  const day = workoutDays.find((d) => d.id === dayId);

  // Redirect if day not found
  useEffect(() => {
    if (!day) {
      navigate("/selection");
    }
  }, [day, navigate]);

  if (!day) return null;

  // Prepare list of checkable items (warmUp + exercises + finish)
  const items = [];
  if (day.warmUp) {
    items.push({
      id: `${day.id}_warmup`,
      name: `[Warm-up] ${day.warmUp.name}`,
      sets: day.warmUp.sets,
      reps: day.warmUp.reps,
      tip: day.warmUp.tip,
      visualType: day.warmUp.visualType,
      category: "Warm-up"
    });
  }
  
  day.exercises.forEach((ex) => {
    items.push({
      ...ex,
      id: ex.id // Keep existing id
    });
  });

  if (day.finish) {
    items.push({
      id: `${day.id}_finish`,
      name: `[Finish] ${day.finish.name}`,
      sets: day.finish.sets,
      reps: day.finish.reps,
      tip: day.finish.tip,
      visualType: day.finish.visualType,
      category: "Cooldown"
    });
  }

  // Calculate progress
  const totalItems = items.length;
  const completedCount = items.filter((item) => completedExercises[item.id]).length;
  const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  const isAllCompleted = completedCount === totalItems;

  const handleCompleteDay = () => {
    // Save completion to global state
    completeDay(day.id);
    
    // Choose random quote
    const randQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setSuccessQuote(randQuote);

    // Trigger full screen confetti celebration
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6b00", "#ffae00", "#ffffff", "#ff4500"]
    });

    // Cascade confetti
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff6b00", "#ffae00"]
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff6b00", "#ffae00"]
      });
    }, 200);

    // Open celebration modal
    setShowCelebration(true);
  };

  return (
    <div className="flex-1 px-4 py-6 overflow-y-auto safe-bottom">
      {/* Header back button & title */}
      <div className="max-w-md mx-auto flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/selection")}
          className="flex items-center gap-1.5 text-sm font-display font-bold text-zinc-400 hover:text-white uppercase transition-colors py-1"
        >
          <ChevronLeft className="w-5 h-5 text-orange-saiyan" />
          Back
        </button>
        <span className="text-xs font-display font-black text-orange-saiyan bg-orange-500/10 px-3 py-1 rounded-full border border-orange-saiyan/25 uppercase tracking-wider">
          {day.day}
        </span>
      </div>

      {/* Hero Day Intro */}
      <div className="max-w-md mx-auto text-left mb-6">
        <h1 className="text-3xl font-display font-black uppercase text-white leading-none">
          {day.title}
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-1">
          Perform each exercise with focus. Quality reps build legendary power.
        </p>
      </div>

      {/* Sticky Top Progress Panel */}
      <div className="max-w-md mx-auto mb-6 glass-panel rounded-2xl p-4 sticky top-2 z-30 shadow-xl border border-orange-saiyan/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-display font-black uppercase text-zinc-300 tracking-wider">
            Workout Power Level
          </span>
          <span className="text-sm font-display font-black text-orange-saiyan text-glow-orange">
            {progressPercentage}% ({completedCount}/{totalItems})
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="h-full rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 shadow-[0_0_12px_rgba(255,107,0,0.6)]"
          />
        </div>
      </div>

      {/* Exercises Checklist */}
      <div className="max-w-md mx-auto flex flex-col gap-4">
        {items.map((item, index) => {
          const isDone = completedExercises[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-panel rounded-2xl p-4.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isDone ? "border-green-500/20 bg-green-950/5 opacity-80" : "border-orange-saiyan/15"
              }`}
            >
              {/* Top Row: Details */}
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="text-left">
                  {/* Category Pill */}
                  <span className={`text-[9px] font-display font-bold px-2 py-0.5 rounded uppercase ${
                    item.category === "Warm-up" 
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      : item.category === "Cooldown"
                      ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                      : "bg-orange-500/10 text-orange-saiyan border border-orange-saiyan/20"
                  }`}>
                    {item.category}
                  </span>
                  
                  <h3 className={`text-lg font-display font-extrabold text-white mt-1.5 leading-tight ${isDone ? "line-through text-zinc-500" : ""}`}>
                    {item.name}
                  </h3>
                  
                  {/* Sets and Reps */}
                  <p className="text-sm font-display font-black text-amber-500 mt-0.5">
                    {item.sets} Sets × {item.reps} {item.reps.includes("km") || item.reps.includes("min") || item.reps.includes("Rounds") ? "" : "Reps"}
                  </p>
                </div>

                {/* Completion Checkbox */}
                <button
                  onClick={() => toggleExercise(item.id)}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all transform active:scale-90 cursor-pointer ${
                    isDone 
                      ? "bg-green-500 border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)] text-black"
                      : "border-zinc-700 bg-zinc-950 text-transparent hover:border-orange-saiyan/50"
                  }`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <Check className={`w-6 h-6 stroke-[3px] ${isDone ? "opacity-100" : "opacity-0"}`} />
                </button>
              </div>

              {/* Middle Row: Custom Animated Vector SVG Demo / Custom GIF */}
              <div className="my-2 border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950/40">
                <ExerciseMedia id={item.id} visualType={item.visualType} />
              </div>

              {/* Bottom Row: Posture form Tip */}
              <div className="mt-2.5 flex items-start gap-2 bg-zinc-950/60 p-3 rounded-xl border border-zinc-900">
                <MessageCircleWarning className="w-4 h-4 text-orange-saiyan/70 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-400 font-sans text-left leading-relaxed">
                  <span className="font-bold text-zinc-300">Form Tip:</span> {item.tip}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Complete Day Button */}
      <div className="max-w-md mx-auto mt-8 mb-4">
        <button
          disabled={!isAllCompleted}
          onClick={handleCompleteDay}
          className={`w-full py-4 px-8 rounded-2xl font-display font-black text-lg uppercase tracking-wider transition-all duration-300 shadow-xl ${
            isAllCompleted
              ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black shadow-[0_0_25px_rgba(34,197,94,0.3)] active:scale-95 cursor-pointer saiyan-glow"
              : "bg-zinc-800 text-zinc-500 border border-zinc-900 cursor-not-allowed"
          }`}
        >
          {completedDays[day.id] ? "Re-Complete Day" : "Complete Day"}
        </button>
      </div>

      {/* Celebration Modal Popup */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="w-full max-w-sm glass-panel rounded-3xl p-6 text-center border-2 border-orange-saiyan/40 shadow-[0_0_50px_rgba(255,107,0,0.25)] relative overflow-hidden"
            >
              {/* Ki Sparks graphics */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent pointer-events-none" />

              <div className="w-20 h-20 bg-orange-500/10 border-2 border-orange-saiyan rounded-full flex items-center justify-center mx-auto mb-6 saiyan-glow">
                <Trophy className="w-10 h-10 text-orange-saiyan animate-bounce" />
              </div>

              <span className="text-xs font-display font-black text-orange-saiyan uppercase tracking-widest bg-orange-500/15 border border-orange-saiyan/30 px-3 py-1 rounded-full">
                Training Day Cleared!
              </span>

              <h2 className="text-3xl font-display font-black text-white uppercase mt-4 text-glow-orange leading-tight">
                {day.day} Completed
              </h2>

              <div className="my-6 glass-panel p-4.5 rounded-2xl border-l-4 border-l-amber-500 bg-zinc-900/40 text-left">
                <p className="text-sm font-sans italic text-zinc-300">
                  "{successQuote}"
                </p>
                <span className="block mt-2 text-right text-[10px] font-display font-bold text-amber-500 uppercase tracking-widest">
                  — Goku's Wisdom
                </span>
              </div>

              <p className="text-xs text-zinc-400 font-sans mb-8">
                Your muscle fibers are recovering stronger. You are one step closer to your final form.
              </p>

              <button
                onClick={() => {
                  setShowCelebration(false);
                  navigate("/selection");
                }}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-display font-black text-sm uppercase rounded-xl tracking-wider active:scale-95 shadow-md"
              >
                Return to Mission Selection
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
