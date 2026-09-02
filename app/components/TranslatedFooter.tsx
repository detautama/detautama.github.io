"use client";

import { useLocale } from "../lib/LocaleContext";
import { usePathname } from "next/navigation";

export function TranslatedFooter() {
  const { t } = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/id" || pathname === "/en";

  if (isHome) {
    return (
      <footer className="nagare-footer">
        <p>{t.footer.text}</p>
        <p>Bali, Indonesia · {new Date().getFullYear()}</p>
      </footer>
    );
  }

  return (
    <footer className="brand-container pb-28 pt-10 md:pb-10">
      <div className="hud-rule mb-5" />
      <div className="flex flex-col items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-text-secondary sm:flex-row">
        <p>{t.footer.text}</p>
        <p className="text-brand-accent">System online · WITA / UTC+8</p>
      </div>
    </footer>
  );
}
