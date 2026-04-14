"use client";

import { useLocale } from "../lib/LocaleContext";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === "id" ? "en" : "id")}
      className="group flex items-center gap-2 rounded-lg bg-brand-tan p-2 transition-all duration-200 hover:bg-brand-forest hover:text-white dark:bg-brand-dark-surface dark:hover:bg-brand-dark-border"
      aria-label="Change Language"
    >
      <span className="text-xs font-bold uppercase text-brand-text-secondary transition-colors group-hover:text-white dark:text-brand-dark-text">
        {locale === "id" ? "EN" : "ID"}
      </span>
      <svg
        className="h-4 w-4 text-brand-text-secondary transition-colors group-hover:text-white dark:text-brand-dark-text"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.188 16.524 5.5 20"
        />
      </svg>
    </button>
  );
}
