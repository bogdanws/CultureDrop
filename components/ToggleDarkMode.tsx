"use client";
import useDarkMode from "../hooks/useDarkMode";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ToggleDarkMode() {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-slate-200 dark:bg-zinc-700 hover:bg-slate-300 dark:hover:bg-zinc-600 transition-colors duration-300"
      aria-label="Toggle dark mode"
      aria-pressed={isDarkMode}
    >
      {isDarkMode ? (
        <FiMoon aria-hidden="true" className="text-zinc-100" size={20} />
      ) : (
        <FiSun aria-hidden="true" className="text-zinc-900" size={20} />
      )}
    </button>
  );
}
