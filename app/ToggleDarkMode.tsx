"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ToggleDarkMode() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
