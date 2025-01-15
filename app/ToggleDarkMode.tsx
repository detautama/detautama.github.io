"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ToggleDarkMode() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // use prefers-color-scheme as the default theme
  useEffect(() => {
    if (!mounted) return;
    if (theme === "system") {
      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(darkQuery.matches ? "dark" : "light");
    }
  }, [mounted, theme, setTheme]);

  if (!mounted) {
    return (
      <button
        className="h-6 w-6 rounded-full bg-white"
        onClick={() => setTheme("light")}
        aria-label="Toggle Dark Mode"
      >
        ☀️
      </button>
    );
  }

  return (
    <div>
      {theme === "dark" ? (
        <button
          className="h-6 w-6 rounded-full bg-white"
          onClick={() => setTheme("light")}
          aria-label="Toggle Dark Mode"
        >
          ☀️
        </button>
      ) : (
        <button
          className="h-6 w-6 rounded-full bg-black"
          onClick={() => setTheme("dark")}
          aria-label="Toggle Dark Mode"
        >
          🌙
        </button>
      )}
    </div>
  );
}
