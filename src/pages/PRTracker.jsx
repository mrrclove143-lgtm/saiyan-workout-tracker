import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Plus, Calendar, TrendingUp, HelpCircle } from "lucide-react";
import { useWorkout } from "../context/WorkoutContext";
import { workoutDays } from "../data/exercises";

export default function PRTracker() {
  const { personalRecords, addPR } = useWorkout();
  const [selectedExercise, setSelectedExercise] = useState("");
  const [prWeight, setPrWeight] = useState("");

  // Gather unique exercise list from all workout days to feed the dropdown
  const allExercises = [];
  workoutDays.forEach((day) => {
    if (day.warmUp) allExercises.push(day.warmUp.name);
    day.exercises.forEach((ex) => allExercises.push(ex.name));
    if (day.finish) allExercises.push(day.finish.name);
  });
  const uniqueExercises = [...new Set(allExercises)].sort();

  const handleAddPR = (e) => {
    e.preventDefault();
    if (!selectedExercise || !prWeight || isNaN(prWeight)) return;
    
    addPR(selectedExercise, prWeight);
    setPrWeight("");
  };

  return (
    <div className="flex-1 px-4 py-6 overflow-y-auto safe-bottom">
      {/* Title */}
      <div className="max-w-md mx-auto text-left mb-6">
        <h1 className="text-3xl font-display font-black uppercase text-white leading-none">
          Personal <span className="text-orange-saiyan">Records</span>
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-1">
          Record your peak lifting thresholds. Savor the progression of your strength limits.
        </p>
      </div>

      <div className="max-w-md mx-auto flex flex-col gap-5">
        {/* Form Card */}
        <div className="glass-panel rounded-2xl p-5 border border-orange-saiyan/20">
          <h3 className="text-sm font-display font-black uppercase text-zinc-300 tracking-wider mb-4 flex items-center gap-2">
            <Trophy className="w-4.5 h-4.5 text-orange-saiyan animate-pulse" />
            Log New Strength Limit
          </h3>

          <form onSubmit={handleAddPR} className="flex flex-col gap-4 text-left">
            {/* Select Exercise */}
            <div className="flex flex-col">
              <label className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider mb-1.5">
                Select Exercise
              </label>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="bg-zinc-950 border border-zinc-850 focus:border-orange-saiyan rounded-xl px-3.5 py-3 text-white text-sm font-sans outline-none transition-colors cursor-pointer"
              >
                <option value="" disabled>-- Select Exercise --</option>
                {uniqueExercises.map((exName, idx) => (
                  <option key={idx} value={exName}>
                    {exName}
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Input */}
            <div className="flex flex-col">
              <label className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider mb-1.5">
                Max Lift Weight (kg)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 50"
                  value={prWeight}
                  onChange={(e) => setPrWeight(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-850 focus:border-orange-saiyan rounded-xl px-4 py-2.5 text-white text-sm font-display font-semibold outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-orange-saiyan hover:bg-orange-600 text-black font-display font-black text-xs uppercase px-5 rounded-xl flex items-center gap-1 cursor-pointer transition-all duration-200 active:scale-95 shadow-md"
                >
                  <Plus className="w-4 h-4 stroke-[3px]" />
                  Log PR
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* PR Cards Progression list */}
        <div className="flex flex-col gap-4 text-left">
          <h2 className="text-lg font-display font-black uppercase text-white tracking-wide">
            Record Book
          </h2>
          
          {Object.keys(personalRecords).length > 0 ? (
            <div className="flex flex-col gap-3">
              {Object.entries(personalRecords).map(([exerciseName, entries], idx) => {
                if (entries.length === 0) return null;

                // Sort entry values chronologically (already sorted in Context, but safety double-check)
                const latestRecord = entries[entries.length - 1];
                const startRecord = entries[0];
                const totalImprovement = latestRecord.weight - startRecord.weight;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-panel rounded-2xl p-4.5 border border-orange-saiyan/15 flex flex-col gap-3 relative overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-display font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded">
                          Exercise Limit
                        </span>
                        <h4 className="text-base font-display font-extrabold text-white mt-1.5 leading-tight">
                          {exerciseName}
                        </h4>
                      </div>
                      
                      {/* Peak Record Display */}
                      <div className="text-right">
                        <span className="text-2xl font-display font-black text-orange-saiyan text-glow-orange">
                          {latestRecord.weight}
                        </span>
                        <span className="text-xs font-display font-bold text-orange-saiyan ml-0.5">kg</span>
                      </div>
                    </div>

                    {/* Progress Maps Flow: e.g. 20 kg -> 25 kg -> 30 kg */}
                    <div className="bg-zinc-950/50 border border-zinc-900 rounded-xl p-3 flex flex-wrap items-center gap-1.5">
                      {entries.map((entry, index) => {
                        const isLast = index === entries.length - 1;
                        return (
                          <React.Fragment key={index}>
                            <div className="flex flex-col items-center">
                              <span className={`font-display text-xs font-extrabold px-2 py-1 rounded-md ${
                                isLast ? "bg-orange-saiyan/15 text-orange-saiyan border border-orange-saiyan/30" : "bg-zinc-900 text-zinc-400 border border-zinc-850"
                              }`}>
                                {entry.weight} kg
                              </span>
                              <span className="text-[7.5px] text-zinc-500 font-sans mt-0.5">
                                {new Date(entry.date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                              </span>
                            </div>
                            
                            {!isLast && (
                              <span className="text-zinc-600 font-bold text-xs mx-0.5">→</span>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Footer Progress info */}
                    <div className="flex justify-between items-center text-[10px] font-sans text-zinc-500 border-t border-zinc-900/60 pt-2.5 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                        Latest PR: {new Date(latestRecord.date).toLocaleDateString()}
                      </span>
                      {totalImprovement > 0 && (
                        <span className="flex items-center gap-1 text-green-400 font-bold">
                          <TrendingUp className="w-3.5 h-3.5" />
                          +{totalImprovement} kg Increase
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-8 border border-zinc-800 text-center font-sans text-xs text-zinc-500 flex flex-col items-center gap-2">
              <HelpCircle className="w-8 h-8 text-zinc-700" />
              <span>No peak limits logged yet. Complete workouts and submit your top sets above!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
