"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, translations, Translations } from "./i18n";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  localePath: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? "id");

  useEffect(() => {
    if (initialLocale) {
      setLocaleState(initialLocale);
      return;
    }
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "id" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLocaleState("en");
      }
    }
  }, [initialLocale]);

  const setLocale = (newLocale: Locale) => {
    if (!initialLocale) {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale);
    }
  };

  const localePath = (path: string) => {
    if (locale === "id") return path;
    if (path === "/") return "/en";
    return `/en${path}`;
  };

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, localePath }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
