import React from "react";

export default function ExerciseVisual({ type = "press" }) {
  // Styles for the animations
  const renderVisual = () => {
    switch (type) {
      case "treadmill":
        return (
          <svg className="w-full h-full bg-zinc-950/60 rounded-xl" viewBox="0 0 100 100">
            {/* Belt */}
            <line x1="15" y1="75" x2="85" y2="75" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />
            <line x1="20" y1="75" x2="80" y2="75" stroke="#ff6b00" strokeWidth="2" strokeDasharray="6 4" className="animate-[dash_1s_linear_infinite]" />
            {/* Console */}
            <path d="M75 75 L80 45 L70 40" stroke="#3f3f46" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Running Stickman */}
            <g className="translate-x-[5px] translate-y-[3px]">
              {/* Torso/Head */}
              <circle cx="45" cy="35" r="4" fill="#ffae00" />
              <line x1="45" y1="39" x2="43" y2="54" stroke="#ffae00" strokeWidth="3" />
              {/* Arms (Running motion) */}
              <path d="M45 42 L38 46 L42 54" stroke="#ff6b00" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="origin-[45px_42px] animate-[run-arm-1_0.6s_infinite_alternate]" />
              <path d="M45 42 L52 45 L48 52" stroke="#ff6b00" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="origin-[45px_42px] animate-[run-arm-2_0.6s_infinite_alternate]" />
              {/* Legs (Running motion) */}
              <path d="M43 54 L36 60 L44 72" stroke="#ffae00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="origin-[43px_54px] animate-[run-leg-1_0.6s_infinite_alternate]" />
              <path d="M43 54 L50 62 L42 71" stroke="#ffae00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="origin-[43px_54px] animate-[run-leg-2_0.6s_infinite_alternate]" />
            </g>
            <style>{`
              @keyframes dash {
                to { stroke-dashoffset: -20; }
              }
              @keyframes run-arm-1 {
                0% { transform: rotate(-15deg); }
                100% { transform: rotate(45deg); }
              }
              @keyframes run-arm-2 {
                0% { transform: rotate(40deg); }
                100% { transform: rotate(-20deg); }
              }
              @keyframes run-leg-1 {
                0% { transform: rotate(-30deg); }
                100% { transform: rotate(35deg); }
              }
              @keyframes run-leg-2 {
                0% { transform: rotate(45deg); }
                100% { transform: rotate(-25deg); }
              }
            `}</style>
          </svg>
        );

      case "press":
      case "incline_press":
      case "shoulder_press":
        const isAngle = type === "incline_press" ? "rotate(-20)" : type === "shoulder_press" ? "rotate(-75)" : "rotate(0)";
        return (
          <svg className="w-full h-full bg-zinc-950/60 rounded-xl" viewBox="0 0 100 100">
            {/* Bench */}
            {type === "press" && <line x1="20" y1="65" x2="80" y2="65" stroke="#27272a" strokeWidth="4" />}
            {type === "incline_press" && <line x1="25" y1="75" x2="75" y2="45" stroke="#27272a" strokeWidth="4" />}
            {type === "shoulder_press" && <path d="M35 75 L35 35 M30 75 L60 75" stroke="#27272a" strokeWidth="4" fill="none" />}
            
            {/* Muscle Glow */}
            <circle cx="50" cy="50" r="12" fill="rgba(255, 107, 0, 0.15)" className="animate-[muscle-glow_2s_infinite]" />

            {/* Arms and Barbell */}
            <g transform={isAngle} className="origin-[50px_50px]">
              <g className="animate-[bench-press_2.5s_infinite_ease-in-out]">
                {/* Hands */}
                <line x1="30" y1="45" x2="70" y2="45" stroke="#ffae00" strokeWidth="4" strokeLinecap="round" />
                <circle cx="25" cy="45" r="7" fill="#ff6b00" />
                <circle cx="75" cy="45" r="7" fill="#ff6b00" />
                {/* Arm lines */}
                <path d="M40 65 L40 52 L32 45" stroke="#ffae00" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M60 65 L60 52 L68 45" stroke="#ffae00" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            </g>
            <style>{`
              @keyframes bench-press {
                0%, 100% { transform: translateY(18px); }
                50% { transform: translateY(-5px); }
              }
              @keyframes muscle-glow {
                0%, 100% { r: 8; fill: rgba(255, 107, 0, 0.1); }
                50% { r: 16; fill: rgba(255, 107, 0, 0.3); }
              }
            `}</style>
          </svg>
        );

      case "fly":
        return (
          <svg className="w-full h-full bg-zinc-950/60 rounded-xl" viewBox="0 0 100 100">
            {/* Backrest */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="10" fill="rgba(255, 107, 0, 0.15)" className="animate-[muscle-glow_2s_infinite]" />
            {/* Left Arm */}
            <path d="M50 50 C25 40 25 30 35 15" stroke="#ffae00" strokeWidth="3" fill="none" strokeLinecap="round" className="origin-[50px_50px] animate-[fly-left_2.5s_infinite_ease-in-out]" />
            <circle cx="35" cy="15" r="5" fill="#ff6b00" className="origin-[50px_50px] animate-[fly-left_2.5s_infinite_ease-in-out]" />
            {/* Right Arm */}
            <path d="M50 50 C75 40 75 30 65 15" stroke="#ffae00" strokeWidth="3" fill="none" strokeLinecap="round" className="origin-[50px_50px] animate-[fly-right_2.5s_infinite_ease-in-out]" />
            <circle cx="65" cy="15" r="5" fill="#ff6b00" className="origin-[50px_50px] animate-[fly-right_2.5s_infinite_ease-in-out]" />
            <style>{`
              @keyframes fly-left {
                0%, 100% { transform: rotate(20deg); }
                50% { transform: rotate(-15deg); }
              }
              @keyframes fly-right {
                0%, 100% { transform: rotate(-20deg); }
                50% { transform: rotate(15deg); }
              }
            `}</style>
          </svg>
        );

      case "pulldown":
      case "row":
      case "pullup":
      case "straight_arm_pulldown":
        const isPullUp = type === "pullup";
        const isRow = type === "row";
        return (
          <svg className="w-full h-full bg-zinc-950/60 rounded-xl" viewBox="0 0 100 100">
            {/* Pulley/Bar frame */}
            <line x1="20" y1="20" x2="80" y2="20" stroke="#27272a" strokeWidth="4" />
            
            {/* Back Glow */}
            <ellipse cx="50" cy="55" rx="10" ry="15" fill="rgba(255, 107, 0, 0.15)" className="animate-[muscle-glow_2s_infinite]" />

            {/* Pulley Cable & Bar */}
            {!isPullUp && (
              <g className={isRow ? "animate-[seated-row-cable_2.5s_infinite_ease-in-out]" : "animate-[lat-pulldown-bar_2.5s_infinite_ease-in-out]"}>
                <line x1="50" y1="20" x2="50" y2="38" stroke="#3f3f46" strokeWidth="1.5" />
                <line x1="30" y1="38" x2="70" y2="38" stroke="#ffae00" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}

            {/* Body */}
            <g className={isPullUp ? "animate-[pullup-body_2.5s_infinite_ease-in-out]" : "animate-[lat-pulldown-body_2.5s_infinite_ease-in-out]"}>
              {/* Head */}
              <circle cx="50" cy="48" r="4.5" fill="#ffae00" />
              {/* Torso */}
              <line x1="50" y1="52.5" x2="50" y2="72" stroke="#ffae00" strokeWidth="4" />
              {/* Arms */}
              {isPullUp ? (
                // Pullup Arms
                <path d="M50 54 L38 38 L30 20 M50 54 L62 38 L70 20" stroke="#ff6b00" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              ) : (
                // Lat Pulldown / Row Arms
                <path d="M50 55 L35 43 L32 38 M50 55 L65 43 L68 38" stroke="#ff6b00" strokeWidth="3" fill="none" strokeLinecap="round" />
              )}
            </g>
            <style>{`
              @keyframes lat-pulldown-bar {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(14px); }
              }
              @keyframes lat-pulldown-body {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(3px); }
              }
              @keyframes seated-row-cable {
                0%, 100% { transform: translate(15px, 20px); }
                50% { transform: translate(-10px, 20px); }
              }
              @keyframes pullup-body {
                0%, 100% { transform: translateY(15px); }
                50% { transform: translateY(-5px); }
              }
            `}</style>
          </svg>
        );

      case "db_curl":
      case "machine_curl":
      case "hammer_curl":
        return (
          <svg className="w-full h-full bg-zinc-950/60 rounded-xl" viewBox="0 0 100 100">
            {/* Elbow Joint */}
            <circle cx="35" cy="65" r="3" fill="#27272a" />
            {/* Muscle Glow */}
            <circle cx="45" cy="50" r="8" fill="rgba(255, 107, 0, 0.15)" className="animate-[muscle-glow_2s_infinite]" />
            {/* Shoulder & Torso */}
            <line x1="30" y1="35" x2="35" y2="65" stroke="#3f3f46" strokeWidth="4.5" strokeLinecap="round" />
            {/* Forearm and Weight */}
            <g className="origin-[35px_65px] animate-[bicep-curl_2.2s_infinite_ease-in-out]">
              <line x1="35" y1="65" x2="65" y2="65" stroke="#ffae00" strokeWidth="3.5" strokeLinecap="round" />
              {/* Dumbbell */}
              <g transform="translate(65, 65)">
                <line x1="0" y1="-10" x2="0" y2="10" stroke="#ff6b00" strokeWidth="3.5" />
                <rect x="-4" y="-14" width="8" height="4" fill="#ff6b00" rx="1" />
                <rect x="-4" y="10" width="8" height="4" fill="#ff6b00" rx="1" />
              </g>
            </g>
            <style>{`
              @keyframes bicep-curl {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-75deg); }
              }
            `}</style>
          </svg>
        );

      case "squat":
      case "leg_press":
      case "leg_extension":
      case "leg_curl":
      case "lunges":
        const isLegPress = type === "leg_press";
        return (
          <svg className="w-full h-full bg-zinc-950/60 rounded-xl" viewBox="0 0 100 100">
            {/* Muscle Glow */}
            <ellipse cx="50" cy="55" rx="12" ry="8" fill="rgba(255, 107, 0, 0.15)" className="animate-[muscle-glow_2s_infinite]" />
            {/* Squat / Leg Press Frame */}
            {isLegPress && (
              <line x1="30" y1="35" x2="70" y2="75" stroke="#27272a" strokeWidth="3" strokeDasharray="3 3" />
            )}
            {/* Torso & Hip Joint */}
            <g className={isLegPress ? "animate-[leg-press-anim_2.8s_infinite_ease-in-out]" : "animate-[squat-anim_2.8s_infinite_ease-in-out]"}>
              {/* Head */}
              <circle cx="50" cy="30" r="4" fill="#ffae00" />
              {/* Torso */}
              <line x1="50" y1="34" x2="50" y2="55" stroke="#ffae00" strokeWidth="3" />
              {/* Thigh (Hip to Knee) */}
              <line x1="50" y1="55" x2="65" y2="55" stroke="#ffae00" strokeWidth="3.5" className="origin-[50px_55px] animate-[thigh-bend_2.8s_infinite_ease-in-out]" />
              {/* Calf (Knee to Foot) */}
              {/* This calf adjusts position based on knee. For visual ease we can just animate coordinate points */}
              <g className="origin-[50px_55px] animate-[thigh-bend_2.8s_infinite_ease-in-out]">
                <line x1="65" y1="55" x2="65" y2="75" stroke="#ff6b00" strokeWidth="3.5" className="origin-[65px_55px] animate-[calf-bend_2.8s_infinite_ease-in-out]" />
              </g>
            </g>
            <style>{`
              @keyframes squat-anim {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(18px); }
              }
              @keyframes thigh-bend {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-35deg); }
              }
              @keyframes calf-bend {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(65deg); }
              }
              @keyframes leg-press-anim {
                0%, 100% { transform: translate(12px, -12px); }
                50% { transform: translate(-5px, 5px); }
              }
            `}</style>
          </svg>
        );

      case "crunch":
      case "leg_raise":
      case "cable_crunch":
      case "plank":
        return (
          <svg className="w-full h-full bg-zinc-950/60 rounded-xl" viewBox="0 0 100 100">
            {/* Ground */}
            <line x1="15" y1="75" x2="85" y2="75" stroke="#27272a" strokeWidth="3" />
            
            {/* Core Glow */}
            <circle cx="50" cy="65" r="9" fill="rgba(255, 107, 0, 0.15)" className="animate-[muscle-glow_2s_infinite]" />

            {type === "plank" ? (
              // Plank Pose
              <g className="animate-[plank-breath_2s_infinite_ease-in-out]">
                {/* Legs/Feet */}
                <line x1="25" y1="73" x2="45" y2="67" stroke="#ffae00" strokeWidth="3.5" />
                {/* Torso */}
                <line x1="45" y1="67" x2="72" y2="67" stroke="#ffae00" strokeWidth="4.5" />
                {/* Head */}
                <circle cx="77" cy="63" r="3.5" fill="#ffae00" />
                {/* Arms supporting */}
                <path d="M68 67 L68 74 L60 74" stroke="#ff6b00" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            ) : (
              // Crunches
              <g>
                {/* Hips to feet (bent knees) */}
                <path d="M35 73 L48 73 L58 60 L68 73" stroke="#ff6b00" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Back / Head crunching */}
                <g className="origin-[35px_73px] animate-[crunch-up_2.2s_infinite_ease-in-out]">
                  <line x1="35" y1="73" x2="20" y2="60" stroke="#ffae00" strokeWidth="4" />
                  <circle cx="16" cy="54" r="4.5" fill="#ffae00" />
                </g>
              </g>
            )}
            <style>{`
              @keyframes plank-breath {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-2px); }
              }
              @keyframes crunch-up {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(25deg); }
              }
            `}</style>
          </svg>
        );

      default: // stretch, walk, dip, abductor, adductor, pushdown etc.
        return (
          <svg className="w-full h-full bg-zinc-950/60 rounded-xl" viewBox="0 0 100 100">
            {/* Pulsing Saiyan Logo / Spark icon */}
            <circle cx="50" cy="50" r="25" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M50 25 L58 45 L78 45 L62 58 L68 78 L50 65 L32 78 L38 58 L22 45 L42 45 Z" 
              fill="rgba(255, 107, 0, 0.2)" stroke="#ffae00" strokeWidth="2" strokeLinejoin="round" 
              className="origin-[50px_50px] animate-[spin-pulse_5s_infinite_linear]" />
            <style>{`
              @keyframes spin-pulse {
                0% { transform: scale(0.9) rotate(0deg); opacity: 0.7; }
                50% { transform: scale(1.1) rotate(180deg); opacity: 1; filter: drop-shadow(0 0 8px rgba(255,107,0,0.6)); }
                100% { transform: scale(0.9) rotate(360deg); opacity: 0.7; }
              }
            `}</style>
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-32 md:h-40 relative flex items-center justify-center overflow-hidden">
      {renderVisual()}
    </div>
  );
}
