"use client";
import useDarkMode from "../hooks/useDarkMode";

export default function ToggleDarkMode() {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  
  return (
    <div
      onClick={toggleDarkMode}
      className="relative w-14 h-8 rounded-3xl bg-slate-300 dark:bg-zinc-700 flex items-center cursor-pointer transition-colors duration-300"
    >
      <div
        className={`absolute top-1 rounded-full w-6 h-6 bg-blue-500 transition-all duration-300 ease-in-out ${
          isDarkMode ? "right-1" : "left-1"
        }`}
      />
    </div>
  );
}
