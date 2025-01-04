"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center pb-1 gap-2  transition-all text-2xl"  
      aria-label="Toggle Theme"
    >
      <Sun
        className={`w-6 h-6 transition-transform ${
          theme === "dark" ? "-rotate-90 scale-0 text-xl" : "rotate-0 scale-100"
        }`}
      />
      <span className="text-xl font-medium">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
      <Moon
        className={`w-6 h-6 transition-transform ${
          theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        }`}
      />
    </button>
  );
}
