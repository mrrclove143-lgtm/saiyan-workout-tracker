import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Flame, Trophy, Calendar, RefreshCw, AlertCircle, Dumbbell } from "lucide-react";
import { useWorkout } from "../context/WorkoutContext";
import { workoutDays } from "../data/exercises";

export default function Dashboard() {
  const navigate = useNavigate();
  const { completedDays, streakData, resetAllProgress, clearEverything } = useWorkout();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Compute overall stats
  const totalDays = 6;
  const completedDaysCount = Object.values(completedDays).filter(Boolean).length;
  const overallPercentage = Math.round((completedDaysCount / totalDays) * 100);

  // Determine power level status based on completion
  const getPowerLevelStatus = (count) => {
    if (count === 0) return "Kaio-Ken Base Form (0%)";
    if (count <= 2) return "Super Saiyan Level 1 (33%)";
    if (count <= 4) return "Super Saiyan Level 2 (67%)";
    if (count < 6) return "Super Saiyan Level 3 (83%)";
    return "Super Saiyan Blue / Ultra Instinct (100%)";
  };

  const handleReset = (fullClear) => {
    if (fullClear) {
      clearEverything();
    } else {
      resetAllProgress();
    }
    setShowResetConfirm(false);
  };

  return (
    <div className="flex-1 px-4 py-6 overflow-y-auto safe-bottom">
      {/* Title */}
      <div className="max-w-md mx-auto text-left mb-6">
        <h1 className="text-3xl font-display font-black uppercase text-white leading-none">
          Training <span className="text-orange-saiyan">Dashboard</span>
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-1">
          Review your weekly progress and track your streak towards greatness.
        </p>
      </div>

      {/* Main Stats Block */}
      <div className="max-w-md mx-auto flex flex-col gap-4 mb-6">
        {/* Power Level Gauge Card */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden border border-orange-saiyan/25">
          <div className="absolute top-[10%] right-[-10%] w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider block">Saiyan Aura Level</span>
              <span className="text-xl font-display font-black text-white uppercase tracking-wide">
                {getPowerLevelStatus(completedDaysCount)}
              </span>
            </div>
            <div className="bg-orange-500/10 border border-orange-saiyan/20 p-2 rounded-xl text-orange-saiyan font-display font-black text-sm">
              Level {completedDaysCount}
            </div>
          </div>

          {/* Progress Circular Slider/Bar */}
          <div className="w-full h-4 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 p-[2px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 shadow-[0_0_12px_rgba(255,107,0,0.7)]"
            />
          </div>

          <div className="flex justify-between items-center text-xs font-sans text-zinc-400 mt-2.5">
            <span>Overall Training Routine Completed</span>
            <span className="font-display font-bold text-white text-glow-orange">{overallPercentage}%</span>
          </div>
        </div>

        {/* Streak Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between items-start border border-orange-saiyan/15">
            <div className="bg-orange-500/10 p-2 rounded-xl border border-orange-saiyan/20 text-orange-saiyan mb-3">
              <Flame className="w-5 h-5 fill-orange-saiyan/20" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider block">Current Streak</span>
              <span className="text-2xl font-display font-black text-white">{streakData.currentStreak} Days</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between items-start border border-orange-saiyan/15">
            <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 text-amber-500 mb-3">
              <Trophy className="w-5 h-5 fill-amber-500/20" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider block">Best Streak Record</span>
              <span className="text-2xl font-display font-black text-white">{streakData.bestStreak} Days</span>
            </div>
          </div>
        </div>

        {/* Weekly Completion Grid */}
        <div className="glass-panel rounded-2xl p-5 border border-orange-saiyan/15">
          <h3 className="text-sm font-display font-black uppercase text-white tracking-wider mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-saiyan" />
            Weekly Workout Calendar
          </h3>

          <div className="flex flex-col gap-3">
            {workoutDays.map((day) => {
              const isDone = completedDays[day.id];
              return (
                <div
                  key={day.id}
                  onClick={() => navigate(`/workout/${day.id}`)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    isDone 
                      ? "bg-green-500/5 border-green-500/30 text-zinc-200"
                      : "bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:border-orange-saiyan/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 fill-green-950" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-700" />
                    )}
                    <span className="font-display font-extrabold text-sm">{day.day}</span>
                    <span className={`text-xs font-sans truncate ${isDone ? "text-zinc-400" : "text-zinc-500"}`}>
                      {day.title}
                    </span>
                  </div>
                  
                  <span className={`text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded ${
                    isDone ? "bg-green-500/10 text-green-400" : "bg-zinc-900 text-zinc-500"
                  }`}>
                    {isDone ? "Completed" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action utility settings card */}
        <div className="glass-panel rounded-2xl p-4.5 border border-red-500/10 flex items-center justify-between">
          <div className="text-left">
            <h4 className="text-sm font-display font-extrabold text-zinc-300">Danger Zone</h4>
            <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Reset your checklists or clear storage.</p>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/20 hover:border-red-600/40 rounded-xl text-red-500 font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Data
          </button>
        </div>
      </div>

      {/* Reset Confirmation Overlay */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm glass-panel rounded-3xl p-6 border border-red-500/30 shadow-3xl text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center mx-auto mb-4 text-red-500">
                <AlertCircle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-display font-black text-white uppercase tracking-wider">
                Reset Progress?
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                This will reset your completed exercise checklists. Bests and weights data can be preserved or completely wiped.
              </p>

              <div className="flex flex-col gap-2.5 mt-6">
                <button
                  onClick={() => handleReset(false)}
                  className="w-full py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-display font-bold text-sm uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Reset Daily Checklists Only
                </button>
                <button
                  onClick={() => handleReset(true)}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-display font-bold text-sm uppercase rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Reset Everything (Full Wipe)
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="w-full py-2.5 bg-zinc-950 border border-zinc-900 text-zinc-500 font-display font-bold text-sm uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
