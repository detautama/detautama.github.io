"use client";

import { useLocale } from "../lib/LocaleContext";

export function TranslatedFooter() {
  const { t } = useLocale();

  return (
    <footer className="brand-container py-8 pb-28 text-center md:pb-8">
      <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text/70">
        {t.footer.text}
      </p>
    </footer>
  );
}
