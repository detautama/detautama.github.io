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
    {
      href: localePath("/articles"),
      label: t.nav.articles,
      match: "/articles",
    },
    { href: localePath("/now"), label: t.nav.now, match: "/now" },
    { href: localePath("/about"), label: t.nav.about, match: "/about" },
  ];

  return (
    <>
      <header className="border-brand-accent/20 bg-brand-dark-bg/80 sticky top-0 z-50 border-b backdrop-blur-xl">
        <div className="brand-container">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href={localePath("/")}
              className="group flex shrink-0 items-center gap-3"
            >
              <span className="border-brand-accent/60 bg-brand-accent/10 relative grid h-9 w-9 rotate-45 place-items-center border transition group-hover:border-brand-accent group-hover:shadow-[0_0_20px_rgba(111,226,255,0.35)]">
                <Image
                  className="-rotate-45 rounded-full"
                  src="/deta.png"
                  alt="profile image"
                  width={27}
                  height={27}
                />
              </span>
              <span>
                <span className="block whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand-text-primary">
                  Deta Utama
                </span>
                <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-brand-accent sm:block">
                  Personal archive / online
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map(({ href, label, match }) => (
                <Link
                  key={href}
                  href={href}
                  className={`brand-nav-link ${
                    isActive(match) ? "brand-nav-link-active" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={localePath("/search")}
                className="border-brand-accent/20 bg-brand-accent/5 hover:border-brand-accent/60 grid h-9 w-9 place-items-center border text-brand-text-secondary transition hover:text-brand-accent"
                aria-label="Search"
              >
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
      <nav className="border-brand-accent/25 bg-brand-dark-bg/90 fixed bottom-0 left-0 right-0 z-50 border-t shadow-[0_-10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around py-2">
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
