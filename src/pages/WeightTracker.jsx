import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Target, TrendingDown, Plus, Trash2, Calendar } from "lucide-react";
import { useWorkout } from "../context/WorkoutContext";

export default function WeightTracker() {
  const { weightData, logWeight } = useWorkout();
  const [newWeight, setNewWeight] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [activeTab, setActiveTab] = useState("log"); // 'log' or 'history'

  const { currentWeight, goalWeight, history } = weightData;

  const handleLogWeight = (e) => {
    e.preventDefault();
    if (!newWeight || isNaN(newWeight)) return;
    logWeight(newWeight);
    setNewWeight("");
  };

  const handleUpdateGoal = (e) => {
    e.preventDefault();
    if (!newGoal || isNaN(newGoal)) return;
    logWeight(currentWeight, newGoal);
    setNewGoal("");
  };

  // --- Calculate Progress ---
  const initialWeight = history.length > 0 ? history[0].weight : currentWeight;
  const totalChangeNeeded = Math.abs(initialWeight - goalWeight);
  const changeAchieved = Math.abs(initialWeight - currentWeight);
  
  let progressPercentage = 0;
  if (totalChangeNeeded > 0) {
    progressPercentage = Math.round((changeAchieved / totalChangeNeeded) * 100);
    progressPercentage = Math.min(100, Math.max(0, progressPercentage));
  } else if (currentWeight === goalWeight) {
    progressPercentage = 100;
  }

  const kgRemaining = (currentWeight - goalWeight).toFixed(1);

  // --- SVG Chart Calculations ---
  // Pad the chart so dots are not cut off
  const svgWidth = 500;
  const svgHeight = 200;
  const paddingX = 40;
  const paddingY = 30;

  // Find min/max values for scaling
  const weightsList = history.map((h) => h.weight);
  const maxWeight = Math.max(...weightsList, goalWeight, currentWeight) + 1;
  const minWeight = Math.max(0, Math.min(...weightsList, goalWeight, currentWeight) - 1);
  const weightRange = maxWeight - minWeight || 1;

  // Generate SVG Points
  let pointsString = "";
  let areaPointsString = "";
  const coordinates = [];

  if (history.length > 1) {
    history.forEach((entry, idx) => {
      const x = paddingX + (idx / (history.length - 1)) * (svgWidth - 2 * paddingX);
      const y = svgHeight - paddingY - ((entry.weight - minWeight) / weightRange) * (svgHeight - 2 * paddingY);
      
      coordinates.push({ x, y, ...entry });
      
      if (idx === 0) {
        pointsString = `${x},${y}`;
        areaPointsString = `${x},${svgHeight - paddingY} ${x},${y}`;
      } else {
        pointsString += ` L${x},${y}`;
        areaPointsString += ` L${x},${y}`;
      }

      if (idx === history.length - 1) {
        areaPointsString += ` ${x},${svgHeight - paddingY}`;
      }
    });
  }

  // Format date helper (e.g. "2026-06-17" -> "17 Jun")
  const formatDateLabel = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="flex-1 px-4 py-6 overflow-y-auto safe-bottom">
      {/* Title */}
      <div className="max-w-md mx-auto text-left mb-6">
        <h1 className="text-3xl font-display font-black uppercase text-white leading-none">
          Weight <span className="text-orange-saiyan">Tracker</span>
        </h1>
        <p className="text-xs text-zinc-400 font-sans mt-1">
          Monitor your body composition change. Match weight levels to training goals.
        </p>
      </div>

      <div className="max-w-md mx-auto flex flex-col gap-4">
        {/* Overall Status Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-4.5 border border-orange-saiyan/15 relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider block">Current Weight</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-display font-black text-white text-glow-orange">{currentWeight}</span>
              <span className="text-xs font-display font-bold text-orange-saiyan">kg</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-sans mt-2.5 flex items-center gap-1">
              <Scale className="w-3 h-3 text-orange-saiyan" />
              Weight Level
            </span>
          </div>

          <div className="glass-panel rounded-2xl p-4.5 border border-orange-saiyan/15 relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider block">Goal Weight</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-display font-black text-white text-glow-yellow">{goalWeight}</span>
              <span className="text-xs font-display font-bold text-orange-glow">kg</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-sans mt-2.5 flex items-center gap-1">
              <Target className="w-3 h-3 text-orange-glow" />
              {kgRemaining > 0 ? `${kgRemaining} kg to go` : "Goal Achieved!"}
            </span>
          </div>
        </div>

        {/* Goal Progress Bar */}
        <div className="glass-panel rounded-2xl p-5 border border-orange-saiyan/20">
          <div className="flex justify-between items-center mb-2 text-xs font-display font-black uppercase tracking-wider text-zinc-300">
            <span>Goal Progress</span>
            <span className="text-orange-saiyan">{progressPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 p-[2px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-orange-600 to-amber-400 shadow-[0_0_10px_rgba(255,107,0,0.5)]"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-sans text-zinc-500 mt-2">
            <span>Start: {initialWeight} kg</span>
            <span>Goal: {goalWeight} kg</span>
          </div>
        </div>

        {/* Custom Interactive SVG Line Chart */}
        {history.length > 1 ? (
          <div className="glass-panel rounded-2xl p-4 border border-orange-saiyan/15">
            <h3 className="text-xs font-display font-black uppercase text-zinc-300 tracking-wider mb-4 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-orange-saiyan" />
              Weight Progression Path
            </h3>
            
            <div className="w-full overflow-x-auto">
              <div className="min-w-[340px]">
                <svg className="w-full h-auto bg-zinc-950/60 border border-zinc-900 rounded-xl" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                    const y = paddingY + ratio * (svgHeight - 2 * paddingY);
                    const weightVal = (maxWeight - ratio * weightRange).toFixed(0);
                    return (
                      <g key={index}>
                        <line x1={paddingX} y1={y} x2={svgWidth - paddingX} y2={y} stroke="#18181b" strokeWidth="1" strokeDasharray="3 3" />
                        <text x={paddingX - 10} y={y + 4} fill="#52525b" fontSize="9" fontFamily="sans-serif" textAnchor="end">
                          {weightVal}
                        </text>
                      </g>
                    );
                  })}

                  {/* Goal Weight Line Guide */}
                  {goalWeight >= minWeight && goalWeight <= maxWeight && (
                    <g>
                      {(() => {
                        const goalY = svgHeight - paddingY - ((goalWeight - minWeight) / weightRange) * (svgHeight - 2 * paddingY);
                        return (
                          <>
                            <line x1={paddingX} y1={goalY} x2={svgWidth - paddingX} y2={goalY} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
                            <text x={svgWidth - paddingX - 10} y={goalY - 6} fill="#22c55e" fontSize="8" fontFamily="sans-serif" textAnchor="end" fontWeight="bold">
                              GOAL ({goalWeight} kg)
                            </text>
                          </>
                        );
                      })()}
                    </g>
                  )}

                  {/* Area fill under curve */}
                  <polygon points={areaPointsString} fill="url(#chartGlow)" />

                  {/* Weight Progression Line */}
                  <path d={`M${pointsString}`} fill="none" stroke="#ff6b00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Plot Dots and Labels */}
                  {coordinates.map((pt, idx) => (
                    <g key={idx}>
                      {/* Glow surrounding dot */}
                      <circle cx={pt.x} cy={pt.y} r="7" fill="rgba(255, 107, 0, 0.2)" />
                      {/* Central dot */}
                      <circle cx={pt.x} cy={pt.y} r="3.5" fill="#ffae00" stroke="#09090b" strokeWidth="1" />
                      
                      {/* Weight value tag */}
                      <text x={pt.x} y={pt.y - 12} fill="#ffffff" fontSize="9" fontFamily="Outfit, sans-serif" fontWeight="800" textAnchor="middle">
                        {pt.weight}
                      </text>

                      {/* Date label at bottom */}
                      <text x={pt.x} y={svgHeight - 8} fill="#71717a" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                        {formatDateLabel(pt.date)}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-6 border border-zinc-800 text-center font-sans text-xs text-zinc-500">
            Log your weight on different days to view progression graphs.
          </div>
        )}

        {/* Form controls section */}
        <div className="glass-panel rounded-2xl p-5 border border-orange-saiyan/15">
          <div className="flex border-b border-zinc-900 mb-5">
            <button
              onClick={() => setActiveTab("log")}
              className={`flex-1 pb-3 text-sm font-display font-bold uppercase tracking-wider transition-colors ${
                activeTab === "log" ? "text-orange-saiyan border-b-2 border-b-orange-saiyan" : "text-zinc-500"
              }`}
            >
              Update Stats
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 pb-3 text-sm font-display font-bold uppercase tracking-wider transition-colors ${
                activeTab === "history" ? "text-orange-saiyan border-b-2 border-b-orange-saiyan" : "text-zinc-500"
              }`}
            >
              History Log
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "log" ? (
              <motion.div
                key="log"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col gap-4"
              >
                {/* Log Weight Form */}
                <form onSubmit={handleLogWeight} className="flex flex-col text-left">
                  <label className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider mb-1.5">
                    Log Current Weight (kg)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 70.5"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-850 focus:border-orange-saiyan rounded-xl px-4 py-2.5 text-white text-sm font-display font-semibold outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-orange-saiyan hover:bg-orange-600 text-black font-display font-black text-xs uppercase px-4 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Plus className="w-4 h-4 stroke-[3px]" />
                      Log
                    </button>
                  </div>
                </form>

                {/* Log Goal Form */}
                <form onSubmit={handleUpdateGoal} className="flex flex-col text-left">
                  <label className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider mb-1.5">
                    Change Target Goal Weight (kg)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 60.0"
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-850 focus:border-orange-saiyan rounded-xl px-4 py-2.5 text-white text-sm font-display font-semibold outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-black font-display font-black text-xs uppercase px-4 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Target className="w-4 h-4" />
                      Set Goal
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col gap-2.5 max-h-56 overflow-y-auto"
              >
                {history.slice().reverse().map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-zinc-950/50 border border-zinc-900 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800 text-zinc-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-display font-extrabold text-white">
                          {entry.weight} kg
                        </span>
                        <span className="block text-[9px] text-zinc-500 font-sans">
                          Logged: {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[9px] font-display font-bold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-850">
                      Entry {history.length - idx}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
