"use client";

import { Link } from "next-view-transitions";
import { useLocale } from "../lib/LocaleContext";
import { LanguageToggle } from "./LanguageToggle";
import { ToggleDarkMode } from "../ToggleDarkMode";

export function EditorialNav() {
  const { locale, t, localePath } = useLocale();

  return (
    <nav className="nagare-nav" aria-label="Main navigation">
      <Link href={localePath("/")} className="nagare-mark">
        DU
      </Link>
      <div className="nagare-nav-links">
        <Link href={localePath("/")}>
          {locale === "id" ? "Beranda" : "Home"}
        </Link>
        <Link href={localePath("/articles")}>{t.nav.articles}</Link>
        <Link href={localePath("/now")}>{t.nav.now}</Link>
        <LanguageToggle />
        <ToggleDarkMode />
      </div>
    </nav>
  );
}
