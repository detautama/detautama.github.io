"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null;

    const toggleVisibility = () => {
      // Throttle scroll events for better performance
      if (throttleTimeout !== null) return;

      throttleTimeout = setTimeout(() => {
        // Show button when user scrolls down more than one screen height (100vh)
        const scrollThreshold = window.innerHeight;
        if (window.scrollY > scrollThreshold) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        throttleTimeout = null;
      }, 100);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (throttleTimeout !== null) {
        clearTimeout(throttleTimeout);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`group fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-black/20 bg-[#f5f2eb]/80 text-[#25221f] shadow-none backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:border-black/50 hover:bg-[#25221f] hover:text-[#f5f2eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:bottom-8 md:right-8 dark:border-white/20 dark:bg-[#11100f]/80 dark:text-[#ebe7df] dark:hover:border-white/60 dark:hover:bg-[#ebe7df] dark:hover:text-[#11100f] ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-5 scale-90 opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      <svg
        className="h-[18px] w-[18px] transition-transform duration-500 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6 9l6-6 6 6M12 3v18"
        />
      </svg>
    </button>
  );
}
