import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Dumbbell, LayoutDashboard, Flame } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      label: "Train",
      path: "/",
      icon: Dumbbell
    },
    {
      label: "Selection",
      path: "/selection",
      icon: Flame
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    }
  ];

  // Check if active. Since workout detail is sub-path of selection, we highlight "Selection" tab
  const isActive = (path) => {
    if (path === "/selection") {
      return currentPath === "/selection" || currentPath.startsWith("/workout/");
    }
    return currentPath === path;
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md glass-panel rounded-2xl py-3 px-4 shadow-2xl z-40 border border-orange-saiyan/25 backdrop-blur-md">
      <div className="flex items-center justify-around relative">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center relative py-1 px-3 rounded-xl transition-all duration-200"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {active && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-orange-saiyan/15 border border-orange-saiyan/30 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <Icon
                className={`w-6 h-6 transition-all duration-300 ${
                  active ? "text-orange-saiyan scale-110 filter drop-shadow-[0_0_8px_rgba(255,107,0,0.6)]" : "text-zinc-500 hover:text-zinc-300"
                }`}
              />
              <span
                className={`text-[10px] mt-1 font-display font-medium tracking-wide transition-colors duration-300 ${
                  active ? "text-orange-saiyan" : "text-zinc-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
