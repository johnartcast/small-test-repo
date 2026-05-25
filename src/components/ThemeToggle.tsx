"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="rounded border border-gray-300 px-3 py-1 text-sm dark:border-gray-700"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "Dark" : "Light"} mode
    </button>
  );
}
