"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { ReactNode } from "react";
import { ToggleDarkMode } from "../ToggleDarkMode";
import { useLocale } from "../lib/LocaleContext";
import { LanguageToggle } from "./LanguageToggle";

type SmallWebSection =
  | "home"
  | "articles"
  | "now"
  | "about"
  | "projects"
  | "tags";

interface SmallWebShellProps {
  readonly activeSection: SmallWebSection;
  readonly children: ReactNode;
  readonly contentClassName?: string;
}

const shellCopy = {
  id: {
    sidebarTitle: "Jelajahi",
    status: "Sedang online dari Bali",
    madeWith: "Dibuat pelan-pelan di Bali",
    cyclingTitle: "Progress bersepeda",
    cyclingGoal: "Menuju 100 hari",
    cyclingDays: "hari",
    cyclingTrip: "km / perjalanan",
    greenTitle: "Progress hijau",
    greenGoal: "Gowes, bukan gas",
    greenLiters: "liter BBM dihemat",
    greenCarbon: "kg CO₂ dihemat",
    nav: {
      home: "Beranda",
      articles: "Tulisan",
      now: "Sekarang",
      about: "Tentang",
      projects: "Proyek",
      tags: "Tag",
    },
  },
  en: {
    sidebarTitle: "Explore",
    status: "Online from Bali",
    madeWith: "Made slowly in Bali",
    cyclingTitle: "Cycling progress",
    cyclingGoal: "Road to 100 days",
    cyclingDays: "days",
    cyclingTrip: "km / trip",
    greenTitle: "Green progress",
    greenGoal: "Pedals over petrol",
    greenLiters: "liters of fuel saved",
    greenCarbon: "kg CO₂ saved",
    nav: {
      home: "Home",
      articles: "Writing",
      now: "Now",
      about: "About",
      projects: "Projects",
      tags: "Tags",
    },
  },
} as const;

export function SmallWebShell({
  activeSection,
  children,
  contentClassName = "",
}: Readonly<SmallWebShellProps>) {
  const { locale, localePath } = useLocale();
  const copy = shellCopy[locale];
  const navigation: ReadonlyArray<{
    key: SmallWebSection;
    label: string;
    href: string;
    icon: string;
  }> = [
    { key: "home", label: copy.nav.home, href: "/", icon: "⌂" },
    {
      key: "articles",
      label: copy.nav.articles,
      href: "/articles",
      icon: "✎",
    },
    { key: "now", label: copy.nav.now, href: "/now", icon: "◷" },
    { key: "about", label: copy.nav.about, href: "/about", icon: "☺" },
    {
      key: "projects",
      label: copy.nav.projects,
      href: "/projects",
      icon: "◇",
    },
    { key: "tags", label: copy.nav.tags, href: "/tag", icon: "#" },
  ];

  return (
    <div className="small-web-home" id="top">
      <div className="small-web-wallpaper" aria-hidden="true" />

      <div className="small-web-frame">
        <header className="small-web-header">
          <Link
            href={localePath("/")}
            className="small-web-banner"
            aria-label={copy.nav.home}
          >
            <Image
              src="/images/home/deta-web-banner-green-blue.webp"
              alt="Hand-drawn collage of Bali, a bicycle, laptop, books, and family"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1120px"
            />
            <div className="small-web-brand">
              <span className="small-web-brand-kicker">personal archive</span>
              <strong>Deta&apos;s little web</strong>
              <span>life, code &amp; everything in between</span>
            </div>
          </Link>

          <div className="small-web-tools">
            <p>
              <span className="small-web-status-dot" /> {copy.status}
            </p>
            <div>
              <LanguageToggle />
              <ToggleDarkMode />
            </div>
          </div>
        </header>

        <div className="small-web-layout">
          <aside className="small-web-sidebar">
            <p className="small-web-sidebar-label">{copy.sidebarTitle}</p>
            <nav aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={localePath(item.href)}
                  className={item.key === activeSection ? "is-active" : ""}
                  aria-current={item.key === activeSection ? "page" : undefined}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="small-web-sidebar-widget">
              <div className="small-web-profile-card">
                <Image src="/deta.png" width={64} height={64} alt="Deta" />
                <div>
                  <strong>Deta Utama</strong>
                  <span>Denpasar · UTC+8</span>
                </div>
              </div>

              <div className="small-web-mini-badge" aria-label={copy.madeWith}>
                <span>✦ HANDCODED ✦</span>
                <strong>BALI / WEB</strong>
              </div>

              <section className="small-web-cycling-card">
                <header>
                  <span aria-hidden="true">🚲</span>
                  <div>
                    <strong>{copy.cyclingTitle}</strong>
                    <small>{copy.cyclingGoal}</small>
                  </div>
                </header>
                <div
                  className="small-web-cycling-progress"
                  role="progressbar"
                  aria-label={copy.cyclingTitle}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={65}
                >
                  <span />
                  <i aria-hidden="true">🚲</i>
                </div>
                <div className="small-web-cycling-stats">
                  <span>
                    <strong>65</strong> / 100 {copy.cyclingDays}
                  </span>
                  <span>
                    <strong>12</strong> {copy.cyclingTrip}
                  </span>
                </div>
              </section>

              <section className="small-web-green-card">
                <header>
                  <span aria-hidden="true">🌱</span>
                  <div>
                    <strong>{copy.greenTitle}</strong>
                    <small>{copy.greenGoal}</small>
                  </div>
                </header>
                <div className="small-web-green-stats">
                  <span>
                    <strong>18</strong> {copy.greenLiters}
                  </span>
                  <span>
                    <strong>42</strong> {copy.greenCarbon}
                  </span>
                </div>
              </section>
            </div>
          </aside>

          <main className={`small-web-content ${contentClassName}`.trim()}>
            {children}
          </main>
        </div>

        <footer className="small-web-footer">
          <span>© {new Date().getFullYear()} Deta Utama</span>
          <span>✿ {copy.madeWith} ✿</span>
          <a href="#top">↑ top</a>
        </footer>
      </div>
    </div>
  );
}
