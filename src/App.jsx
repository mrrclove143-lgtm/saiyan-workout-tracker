import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { WorkoutProvider } from "./context/WorkoutContext";
import AuraBackground from "./components/AuraBackground";
import BottomNav from "./components/BottomNav";

// Pages
import Landing from "./pages/Landing";
import Selection from "./pages/Selection";
import WorkoutDetail from "./pages/WorkoutDetail";
import Dashboard from "./pages/Dashboard";

// Audio asset
import clickSoundFile from "./assets/click_sound.mp3";

// Background Goku Image
import gokuBgImage from "./assets/goku.jpg";

import "./App.css";

function App() {
  // Global click sound effect hook
  useEffect(() => {
    const audio = new Audio(clickSoundFile);
    audio.volume = 0.45; // Moderate volume level

    const handleGlobalClick = (event) => {
      let target = event.target;
      let isClickable = false;

      // Climb up element tree to see if click target is clickable
      while (target && target !== document.body) {
        const tagName = target.tagName ? target.tagName.toLowerCase() : "";
        if (
          tagName === "button" ||
          tagName === "a" ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer") ||
          target.onclick
        ) {
          isClickable = true;
          break;
        }
        target = target.parentNode;
      }

      if (isClickable) {
        audio.currentTime = 0; // Rewind audio cursor to enable rapid fire click sounds
        audio.play().catch((err) => {
          // Silent catch for browser auto-play policy blocks before first interaction
          console.debug("Audio play blocked by browser:", err);
        });
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <WorkoutProvider>
      <Router>
        <AppContent />
      </Router>
    </WorkoutProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="app-container text-white select-none min-h-screen relative">
      {/* Animated Goku Aura Ki Particle System */}
      <AuraBackground />

      {/* Resized Goku Background Watermark (only loaded after clicking Start Workout) */}
      {!isLanding && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.09] pointer-events-none filter grayscale contrast-125 brightness-[0.7]"
          style={{ backgroundImage: `url(${gokuBgImage})` }}
        />
      )}

      {/* Main App Content Viewport */}
      <div className="flex-1 flex flex-col w-full max-w-lg mx-auto relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/workout/:id" element={<WorkoutDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

      {/* Bottom Nav Bar (hidden on landing page to maximize entry impact) */}
      {!isLanding && <BottomNav />}
    </div>
  );
}

export default App;
