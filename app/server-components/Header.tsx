"use client";

import { Link } from "next-view-transitions";
import { ToggleDarkMode } from "../ToggleDarkMode";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "../lib/LocaleContext";
import { LanguageToggle } from "../components/LanguageToggle";

export const Header = () => {
  const pathname = usePathname();
  const { t, localePath } = useLocale();

  const basePath = pathname.startsWith("/en")
    ? pathname.slice(3) || "/"
    : pathname;

  const isActive = (path: string) => {
    if (basePath === path) return true;
    if (path !== "/" && basePath.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { href: localePath("/articles"), label: t.nav.articles, match: "/articles" },
    { href: localePath("/now"), label: t.nav.now, match: "/now" },
    { href: localePath("/about"), label: t.nav.about, match: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-brand-tan bg-brand-cream/90 backdrop-blur-md dark:border-brand-dark-border dark:bg-brand-dark-bg/90">
        <div className="brand-container">
          <div className="flex h-14 items-center justify-between gap-4">
            <Link href={localePath("/")} className="group flex shrink-0 items-center gap-2">
              <Image
                className="rounded-full"
                src="/deta.png"
                alt="profile image"
                width={28}
                height={28}
              />
              <span className="whitespace-nowrap text-sm font-semibold text-brand-text-primary dark:text-brand-dark-text">
                Deta Utama
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map(({ href, label, match }) => (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isActive(match)
                      ? "bg-brand-accent/10 text-brand-accent"
                      : "text-brand-text-secondary hover:bg-brand-tan hover:text-brand-text-primary dark:text-brand-dark-text/70 dark:hover:bg-brand-dark-surface dark:hover:text-brand-dark-text"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={localePath("/search")}
                className="rounded-full p-2 text-brand-text-secondary transition-colors duration-200 hover:bg-brand-tan hover:text-brand-text-primary dark:text-brand-dark-text/70 dark:hover:bg-brand-dark-surface dark:hover:text-brand-dark-text"
                aria-label="Search"
              >
                <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
              <LanguageToggle />
              <ToggleDarkMode />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/20 bg-brand-cream/80 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-brand-dark-bg/70 dark:shadow-[0_-4px_16px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-around bg-gradient-to-t from-brand-cream/10 to-transparent py-2 dark:from-white/5 dark:to-transparent">
          <Link
            href={localePath("/articles")}
            className={`flex flex-col items-center px-3 py-1 transition-colors ${
              isActive("/articles")
                ? "text-brand-accent"
                : "text-brand-text-secondary hover:text-brand-accent dark:text-brand-dark-text"
            }`}
          >
            <svg
              className="mb-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <span className="text-xs font-medium">{t.nav.articles}</span>
          </Link>
          <Link
            href={localePath("/projects")}
            className={`flex flex-col items-center px-3 py-1 transition-colors ${
              isActive("/projects")
                ? "text-brand-accent"
                : "text-brand-text-secondary hover:text-brand-accent dark:text-brand-dark-text"
            }`}
          >
            <svg
              className="mb-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span className="text-xs font-medium">{t.nav.projects}</span>
          </Link>
          <Link
            href={localePath("/about")}
            className={`flex flex-col items-center px-3 py-1 transition-colors ${
              isActive("/about")
                ? "text-brand-accent"
                : "text-brand-text-secondary hover:text-brand-accent dark:text-brand-dark-text"
            }`}
          >
            <svg
              className="mb-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs font-medium">{t.nav.about}</span>
          </Link>
          <Link
            href={localePath("/now")}
            className={`flex flex-col items-center px-3 py-1 transition-colors ${
              isActive("/now")
                ? "text-brand-accent"
                : "text-brand-text-secondary hover:text-brand-accent dark:text-brand-dark-text"
            }`}
          >
            <svg
              className="mb-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-medium">{t.nav.now}</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
