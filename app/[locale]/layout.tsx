import { LocaleProvider } from "../lib/LocaleContext";
import type { Locale } from "../lib/i18n";

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = locale === "en" ? "en" : "id";

  return (
    <LocaleProvider initialLocale={validLocale}>{children}</LocaleProvider>
  );
}
