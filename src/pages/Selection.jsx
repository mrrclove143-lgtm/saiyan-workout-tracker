import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Trophy, Flame } from "lucide-react";
import { useWorkout } from "../context/WorkoutContext";
import { workoutDays } from "../data/exercises";

export default function Selection() {
  const navigate = useNavigate();
  const { completedDays, completedExercises, streakData } = useWorkout();

  // Calculate stats for a specific day
  const getDayProgress = (day) => {
    const total = day.exercises.length;
    let completedCount = 0;
    day.exercises.forEach((ex) => {
      if (completedExercises[ex.id]) {
        completedCount++;
      }
    });

    // Handle warm-up and finish if they are checklist items or just visual (let's count them if completed, or just count standard exercises)
    const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    return { completedCount, total, percentage };
  };

  // Stagger container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex-1 px-4 py-6 overflow-y-auto safe-bottom">
      {/* Top Banner Stats */}
      <div className="max-w-md mx-auto mb-6 flex items-center justify-between bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="bg-orange-500/10 p-2.5 rounded-xl border border-orange-saiyan/25">
            <Flame className="w-5 h-5 text-orange-saiyan fill-orange-saiyan/20" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider block">Current Streak</span>
            <span className="text-lg font-display font-black text-white">{streakData.currentStreak} Days</span>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-zinc-800" />

        <div className="flex items-center gap-2.5">
          <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/25">
            <Trophy className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-display font-bold uppercase tracking-wider block">Best Record</span>
            <span className="text-lg font-display font-black text-white">{streakData.bestStreak} Days</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto text-left mb-6">
        <h2 className="text-2xl font-display font-black uppercase text-white tracking-wide">
          Select Your <span className="text-orange-saiyan">Training Arc</span>
        </h2>
        <p className="text-xs text-zinc-400 font-sans mt-0.5">
          Choose a day to start training. Consistently push past your limits.
        </p>
      </div>

      {/* Days Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md md:max-w-2xl mx-auto"
      >
        {workoutDays.map((day) => {
          const { completedCount, total, percentage } = getDayProgress(day);
          const isDayDone = completedDays[day.id];

          return (
            <motion.div
              key={day.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/workout/${day.id}`)}
              className={`glass-panel glass-panel-hover rounded-2xl p-5 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isDayDone ? "border-green-500/30 bg-green-950/5 shadow-[0_0_20px_rgba(34,197,94,0.05)]" : ""
              }`}
              style={{
                borderColor: isDayDone ? "rgba(34, 197, 94, 0.4)" : day.borderColor,
                WebkitTapHighlightColor: "transparent"
              }}
            >
              {/* Completed checkmark badge */}
              {isDayDone && (
                <div className="absolute top-4 right-4 text-green-400 bg-green-500/10 p-1 rounded-full border border-green-500/20">
                  <CheckCircle2 className="w-5 h-5 fill-green-950" />
                </div>
              )}

              {/* Day title & number */}
              <div className="text-left pr-8">
                <span
                  className={`text-[10px] font-display font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isDayDone
                      ? "bg-green-500/10 text-green-400"
                      : day.id === 1 ? "bg-orange-500/10 text-orange-saiyan" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {day.day}
                </span>
                <h3 className="text-xl font-display font-extrabold text-white mt-2 leading-tight">
                  {day.title}
                </h3>
              </div>

              {/* Exercises completed count and progress slider */}
              <div className="mt-8">
                <div className="flex justify-between items-center text-xs font-sans text-zinc-400 mb-1.5">
                  <span>Progress</span>
                  <span className={isDayDone ? "text-green-400 font-bold" : "text-orange-saiyan font-bold"}>
                    {isDayDone ? "100%" : `${completedCount} / ${total} Exercises`}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isDayDone ? "100%" : `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      isDayDone
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_8px_rgba(255,107,0,0.5)]"
                    }`}
                  />
                </div>
              </div>

              {/* Detail Chevron link */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-900 text-xs font-display font-bold uppercase tracking-wider text-zinc-400">
                <span>View Workouts</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
