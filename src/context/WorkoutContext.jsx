import React, { createContext, useContext, useState, useEffect } from "react";

const WorkoutContext = createContext();

export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
  // --- 1. Load initial states from LocalStorage or use defaults ---
  const [completedExercises, setCompletedExercises] = useState(() => {
    const saved = localStorage.getItem("saiyan_completed_exercises");
    return saved ? JSON.parse(saved) : {};
  });

  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem("saiyan_completed_days");
    return saved ? JSON.parse(saved) : { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false };
  });

  const [streakData, setStreakData] = useState(() => {
    const saved = localStorage.getItem("saiyan_streak_data");
    return saved ? JSON.parse(saved) : { currentStreak: 0, bestStreak: 0, lastCompletedDate: null };
  });

  const [weightData, setWeightData] = useState(() => {
    const saved = localStorage.getItem("saiyan_weight_data");
    return saved ? JSON.parse(saved) : {
      currentWeight: 70,
      goalWeight: 60,
      history: [
        { date: "2026-06-11", weight: 72.5 },
        { date: "2026-06-13", weight: 71.8 },
        { date: "2026-06-15", weight: 70.9 },
        { date: "2026-06-17", weight: 70.0 }
      ]
    };
  });

  const [personalRecords, setPersonalRecords] = useState(() => {
    const saved = localStorage.getItem("saiyan_personal_records");
    return saved ? JSON.parse(saved) : {
      "Chest Press Machine": [
        { date: "2026-06-01", weight: 20 },
        { date: "2026-06-08", weight: 25 },
        { date: "2026-06-15", weight: 30 }
      ],
      "Lat Pulldown": [
        { date: "2026-06-02", weight: 25 },
        { date: "2026-06-09", weight: 30 }
      ],
      "Leg Press": [
        { date: "2026-06-03", weight: 80 },
        { date: "2026-06-10", weight: 90 },
        { date: "2026-06-17", weight: 100 }
      ]
    };
  });

  // --- 2. Save state changes to LocalStorage ---
  useEffect(() => {
    localStorage.setItem("saiyan_completed_exercises", JSON.stringify(completedExercises));
  }, [completedExercises]);

  useEffect(() => {
    localStorage.setItem("saiyan_completed_days", JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem("saiyan_streak_data", JSON.stringify(streakData));
  }, [streakData]);

  useEffect(() => {
    localStorage.setItem("saiyan_weight_data", JSON.stringify(weightData));
  }, [weightData]);

  useEffect(() => {
    localStorage.setItem("saiyan_personal_records", JSON.stringify(personalRecords));
  }, [personalRecords]);

  // --- 3. Action Helpers ---

  // Toggle individual exercise checkbox
  const toggleExercise = (exerciseId) => {
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  // Complete a Day
  const completeDay = (dayId) => {
    // 1. Mark day as completed
    setCompletedDays(prev => ({
      ...prev,
      [dayId]: true
    }));

    // 2. Update Streak
    const todayStr = new Date().toISOString().split("T")[0];
    setStreakData(prev => {
      let { currentStreak, bestStreak, lastCompletedDate } = prev;

      if (lastCompletedDate === todayStr) {
        // Already completed a workout today, streak is unchanged
        return prev;
      }

      // Check if last workout was completed yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastCompletedDate === yesterdayStr) {
        currentStreak += 1;
      } else {
        // Streak broken or brand new
        currentStreak = 1;
      }

      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }

      return {
        currentStreak,
        bestStreak,
        lastCompletedDate: todayStr
      };
    });
  };

  // Log new weight entry
  const logWeight = (weight, newGoal = null) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const parsedWeight = parseFloat(weight);

    setWeightData(prev => {
      const updatedHistory = [...prev.history];
      const existingEntryIndex = updatedHistory.findIndex(h => h.date === todayStr);

      if (existingEntryIndex > -1) {
        updatedHistory[existingEntryIndex].weight = parsedWeight;
      } else {
        updatedHistory.push({ date: todayStr, weight: parsedWeight });
      }

      // Sort history by date
      updatedHistory.sort((a, b) => new Date(a.date) - new Date(b.date));

      return {
        currentWeight: parsedWeight,
        goalWeight: newGoal !== null ? parseFloat(newGoal) : prev.goalWeight,
        history: updatedHistory
      };
    });
  };

  // Add personal record for exercise
  const addPR = (exerciseName, weight) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const parsedWeight = parseFloat(weight);

    setPersonalRecords(prev => {
      const currentList = prev[exerciseName] ? [...prev[exerciseName]] : [];
      
      // Add or update today's record
      const existingIndex = currentList.findIndex(entry => entry.date === todayStr);
      if (existingIndex > -1) {
        currentList[existingIndex].weight = parsedWeight;
      } else {
        currentList.push({ date: todayStr, weight: parsedWeight });
      }

      // Sort by date
      currentList.sort((a, b) => new Date(a.date) - new Date(b.date));

      return {
        ...prev,
        [exerciseName]: currentList
      };
    });
  };

  // Reset ALL workout tracking progress (except weight logs and streak bests, to keep history clean)
  const resetAllProgress = () => {
    setCompletedExercises({});
    setCompletedDays({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false });
    setStreakData(prev => ({
      ...prev,
      currentStreak: 0,
      lastCompletedDate: null
    }));
  };

  // Clear everything completely
  const clearEverything = () => {
    localStorage.clear();
    setCompletedExercises({});
    setCompletedDays({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false });
    setStreakData({ currentStreak: 0, bestStreak: 0, lastCompletedDate: null });
    setWeightData({
      currentWeight: 70,
      goalWeight: 60,
      history: [{ date: new Date().toISOString().split("T")[0], weight: 70 }]
    });
    setPersonalRecords({});
  };

  return (
    <WorkoutContext.Provider
      value={{
        completedExercises,
        completedDays,
        streakData,
        weightData,
        personalRecords,
        toggleExercise,
        completeDay,
        logWeight,
        addPR,
        resetAllProgress,
        clearEverything
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
