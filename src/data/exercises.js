export const workoutDays = [
  {
    id: 1,
    day: "Day 1",
    title: "Chest + Triceps",
    bgGradient: "from-orange-600/20 to-amber-600/10",
    borderColor: "rgba(249, 115, 22, 0.3)",
    auraColor: "rgba(249, 115, 22, 0.4)",
    exercises: [
      {
        id: "d1_e1",
        name: "1.5 km Treadmill Run",
        sets: "1 Set",
        reps: "1.5 km",
        category: "Warm-up",
        tip: "Keep a moderate pace (6-8 km/h) to get the blood flowing.",
        visualType: "treadmill"
      },
      {
        id: "d1_e2",
        name: "Chest Press Machine",
        sets: "3",
        reps: "12",
        category: "Chest",
        tip: "Keep your chest up and shoulders retracted. Push smoothly.",
        visualType: "press"
      },
      {
        id: "d1_e3",
        name: "Incline Chest Press Machine",
        sets: "3",
        reps: "12",
        category: "Chest",
        tip: "Focus the contraction on your upper chest. Control the eccentric phase.",
        visualType: "incline_press"
      },
      {
        id: "d1_e4",
        name: "Pec Deck Fly",
        sets: "3",
        reps: "12",
        category: "Chest",
        tip: "Maintain a slight bend in your elbows. Squeeze your chest at the peak.",
        visualType: "fly"
      },
      {
        id: "d1_e5",
        name: "Assisted Dip Machine",
        sets: "3",
        reps: "8-10",
        category: "Chest",
        tip: "Lean slightly forward to target the chest. Keep elbows tucked to 45°.",
        visualType: "dip"
      },
      {
        id: "d1_e6",
        name: "Rope Pushdown",
        sets: "3",
        reps: "12",
        category: "Triceps",
        tip: "Keep elbows locked at your sides. Flare the rope out at the bottom.",
        visualType: "pushdown"
      },
      {
        id: "d1_e7",
        name: "Overhead Rope Extension",
        sets: "3",
        reps: "12",
        category: "Triceps",
        tip: "Extend upward, not forward. Feel the deep stretch at the bottom.",
        visualType: "overhead_extension"
      }
    ]
  },
  {
    id: 2,
    day: "Day 2",
    title: "Back + Biceps",
    bgGradient: "from-blue-600/20 to-indigo-600/10",
    borderColor: "rgba(37, 99, 235, 0.3)",
    auraColor: "rgba(37, 99, 235, 0.4)",
    exercises: [
      {
        id: "d2_e1",
        name: "Lat Pulldown",
        sets: "3",
        reps: "12",
        category: "Back",
        tip: "Pull to your upper chest. Drive down with your elbows, not hands.",
        visualType: "pulldown"
      },
      {
        id: "d2_e2",
        name: "Seated Row",
        sets: "3",
        reps: "12",
        category: "Back",
        tip: "Keep your spine neutral. Squeeze your shoulder blades together.",
        visualType: "row"
      },
      {
        id: "d2_e3",
        name: "Assisted Pull-Up Machine",
        sets: "3",
        reps: "Max / Failure",
        category: "Back",
        tip: "Initiate the movement by depressing your scapula. Slow descent.",
        visualType: "pullup"
      },
      {
        id: "d2_e4",
        name: "Straight Arm Pulldown",
        sets: "3",
        reps: "12",
        category: "Back",
        tip: "Hinge slightly at hips. Pull using your lats, keeping arms straight.",
        visualType: "straight_arm_pulldown"
      },
      {
        id: "d2_e5",
        name: "Dumbbell Curl",
        sets: "3",
        reps: "12",
        category: "Biceps",
        tip: "Supinate your wrists (turn palms up) as you lift the dumbbell.",
        visualType: "db_curl"
      },
      {
        id: "d2_e6",
        name: "Machine Curl",
        sets: "3",
        reps: "12",
        category: "Biceps",
        tip: "Keep elbows firmly on the pad. Fully contract at the top.",
        visualType: "machine_curl"
      },
      {
        id: "d2_e7",
        name: "Hammer Curl",
        sets: "2",
        reps: "12",
        category: "Biceps",
        tip: "Keep palms facing each other. Targets the brachialis/forearms.",
        visualType: "hammer_curl"
      }
    ]
  },
  {
    id: 3,
    day: "Day 3",
    title: "Legs",
    bgGradient: "from-red-600/20 to-rose-600/10",
    borderColor: "rgba(220, 38, 38, 0.3)",
    auraColor: "rgba(220, 38, 38, 0.4)",
    exercises: [
      {
        id: "d3_e1",
        name: "Leg Press",
        sets: "4",
        reps: "12",
        category: "Quads/Glutes",
        tip: "Do not lock your knees at the top. Descend slowly to a 90° angle.",
        visualType: "leg_press"
      },
      {
        id: "d3_e2",
        name: "Dumbbell Squat",
        sets: "3",
        reps: "10",
        category: "Quads",
        tip: "Hold dumbbells at your sides. Keep chest up, hips back, and squat to parallel.",
        visualType: "squat"
      },
      {
        id: "d3_e3",
        name: "Leg Extension",
        sets: "3",
        reps: "12",
        category: "Quads",
        tip: "Hold the handles to secure your hips down. Pause at full extension.",
        visualType: "leg_extension"
      },
      {
        id: "d3_e5",
        name: "Leg Curl",
        sets: "3",
        reps: "12",
        category: "Hamstrings",
        tip: "Squeeze hamstrings at the bottom. Control the return stroke.",
        visualType: "leg_curl"
      },
      {
        id: "d3_e6",
        name: "Walking Lunges",
        sets: "2",
        reps: "15 (each leg)",
        category: "Legs",
        tip: "Take a wide step. Keep your torso upright and core engaged.",
        visualType: "lunges"
      },
      {
        id: "d3_e7",
        name: "Hip Abductor Machine",
        sets: "3",
        reps: "15",
        category: "Glutes/Outer Thigh",
        tip: "Lean slightly forward to recruit gluteus medius. Control outer stretch.",
        visualType: "abductor"
      },
      {
        id: "d3_e8",
        name: "Calf Raise",
        sets: "4",
        reps: "15",
        category: "Calves",
        tip: "Get a full stretch at the bottom and push up onto the balls of feet.",
        visualType: "calf_raise"
      }
    ]
  },
  {
    id: 4,
    day: "Day 4",
    title: "Shoulders + Abs",
    bgGradient: "from-purple-600/20 to-fuchsia-600/10",
    borderColor: "rgba(147, 51, 234, 0.3)",
    auraColor: "rgba(147, 51, 234, 0.4)",
    exercises: [
      {
        id: "d4_e1",
        name: "Shoulder Press Machine",
        sets: "3",
        reps: "12",
        category: "Shoulders",
        tip: "Adjust seat height so handles align with chin. Press straight up.",
        visualType: "shoulder_press"
      },
      {
        id: "d4_e2",
        name: "Lateral Raise",
        sets: "3",
        reps: "12",
        category: "Shoulders",
        tip: "Lead with your elbows. Keep a slight forward lean for better side delt focus.",
        visualType: "lateral_raise"
      },
      {
        id: "d4_e3",
        name: "Rear Delt Machine",
        sets: "3",
        reps: "12",
        category: "Shoulders",
        tip: "Keep elbows high and push back with rear delts. Avoid using traps.",
        visualType: "rear_delt"
      },
      {
        id: "d4_e4",
        name: "Face Pull",
        sets: "3",
        reps: "15",
        category: "Shoulders",
        tip: "Pull rope towards nose/ears. Rotate thumbs backward at end of pull.",
        visualType: "face_pull"
      },
      {
        id: "d4_e5",
        name: "Crunches",
        sets: "3",
        reps: "15",
        category: "Abs",
        tip: "Focus on flexing the spine, not pulling your neck. Squeeze abs.",
        visualType: "crunch"
      },
      {
        id: "d4_e6",
        name: "Leg Raises",
        sets: "3",
        reps: "12",
        category: "Abs",
        tip: "Keep lower back flat against floor. Raise legs to 90 degrees.",
        visualType: "leg_raise"
      },
      {
        id: "d4_e7",
        name: "Cable Crunches",
        sets: "3",
        reps: "15",
        category: "Abs",
        tip: "Kneel down, hold rope near head, crunch down aiming elbows at knees.",
        visualType: "cable_crunch"
      },
      {
        id: "d4_e8",
        name: "Plank",
        sets: "3",
        reps: "Rounds / Hold",
        category: "Abs",
        tip: "Keep body in straight line. Squeeze glutes and core. Don't let hips sag.",
        visualType: "plank"
      }
    ]
  },
  {
    id: 5,
    day: "Day 5",
    title: "Upper Body Practice",
    bgGradient: "from-teal-600/20 to-emerald-600/10",
    borderColor: "rgba(13, 148, 136, 0.3)",
    auraColor: "rgba(13, 148, 136, 0.4)",
    exercises: [
      {
        id: "d5_e1",
        name: "Chest Press Machine",
        sets: "2",
        reps: "12",
        category: "Chest",
        tip: "Perform controlled reps to pump blood and test strength.",
        visualType: "press"
      },
      {
        id: "d5_e2",
        name: "Lat Pulldown",
        sets: "2",
        reps: "12",
        category: "Back",
        tip: "Keep torso upright and squeeze shoulder blades at the bottom.",
        visualType: "pulldown"
      },
      {
        id: "d5_e3",
        name: "Seated Row",
        sets: "2",
        reps: "12",
        category: "Back",
        tip: "Pull to your lower stomach. Keep elbows tucked in.",
        visualType: "row"
      },
      {
        id: "d5_e4",
        name: "Assisted Pull-Up Machine",
        sets: "3",
        reps: "Failure / Set",
        category: "Back",
        tip: "Build endurance on the pull-up pad with clean contractions.",
        visualType: "pullup"
      },
      {
        id: "d5_e5",
        name: "Assisted Dip Machine",
        sets: "3",
        reps: "Failure / Set",
        category: "Chest/Triceps",
        tip: "Good upright form to work the shoulders, triceps, and chest.",
        visualType: "dip"
      },
      {
        id: "d5_e6",
        name: "Bicep Curl",
        sets: "2",
        reps: "12",
        category: "Biceps",
        tip: "Squeeze hard at the top and control the eccentric down-motion.",
        visualType: "db_curl"
      },
      {
        id: "d5_e7",
        name: "Tricep Pushdown",
        sets: "2",
        reps: "12",
        category: "Triceps",
        tip: "Keep forearms moving, upper arms completely stable at side.",
        visualType: "pushdown"
      },
      {
        id: "d5_e8",
        name: "Treadmill Run / Walk",
        sets: "1 Set",
        reps: "10-15 mins",
        category: "Finish",
        tip: "Perform at low-to-moderate intensity to flush metabolic waste.",
        visualType: "treadmill"
      }
    ]
  },
  {
    id: 6,
    day: "Day 6",
    title: "Cardio + Recovery",
    bgGradient: "from-pink-600/20 to-rose-600/10",
    borderColor: "rgba(219, 39, 119, 0.3)",
    auraColor: "rgba(219, 39, 119, 0.4)",
    warmUp: {
      name: "Treadmill Cardio",
      sets: "1 Set",
      reps: "1.5 - 2 km",
      tip: "Keep a light-to-moderate cardio speed to support recovery.",
      visualType: "treadmill"
    },
    exercises: [
      {
        id: "d6_e1",
        name: "Full Body Stretching",
        sets: "1",
        reps: "15-20 mins",
        category: "Recovery",
        tip: "Focus on hamstrings, hips, chest, and shoulder mobility.",
        visualType: "stretch"
      },
      {
        id: "d6_e2",
        name: "Mobility Work",
        sets: "1",
        reps: "10-15 mins",
        category: "Recovery",
        tip: "Use foam rollers or lacrosse balls to release muscle knots.",
        visualType: "mobility"
      },
      {
        id: "d6_e3",
        name: "Light Walking",
        sets: "1",
        reps: "20-30 mins",
        category: "Recovery",
        tip: "Keep active but do not strain. Clean air and deep breathing.",
        visualType: "walk"
      }
    ]
  }
];

export const motivationalQuotes = [
  "No matter how hard or impossible it is, never lose sight of your goal.",
  "Power comes in response to a need, not a desire. You must create that need.",
  "I would rather be a brainless monkey than a heartless monster.",
  "Limits only exist if you let them. Break through your shell!",
  "Every drop of sweat is a step closer to Super Saiyan status.",
  "The pain you feel today will be your strength tomorrow.",
  "Push past your limits. Go even further beyond!"
];
