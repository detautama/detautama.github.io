"use client";

import { useEffect, useMemo } from "react";
import { Link } from "next-view-transitions";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";
import FeelingLuckyButton from "./FeelingLuckyButton";
import { LanguageToggle } from "./LanguageToggle";
import { OrganicBackground } from "./OrganicBackground";
import { ToggleDarkMode } from "../ToggleDarkMode";

interface TulisanContentProps {
  readonly articlesByLocale: {
    readonly id: ArticleData[];
    readonly en: ArticleData[];
  };
  readonly articleIds: string[];
}

const archiveCopy = {
  id: {
    eyebrow: "Arsip tulisan",
    title: "Catatan.",
    subtitle:
      "Kumpulan pelajaran dari kode, pekerjaan, keluarga, dan perjalanan kecil sehari-hari.",
    entry: "tulisan",
    featured: "Pilihan untuk mulai",
    all: "Semua tulisan",
    tags: "Jelajahi tag",
    search: "Cari arsip",
  },
  en: {
    eyebrow: "Writing archive",
    title: "Notes.",
    subtitle:
      "Lessons gathered from code, work, family, and the small journeys of everyday life.",
    entry: "entries",
    featured: "A place to begin",
    all: "All writing",
    tags: "Browse tags",
    search: "Search archive",
  },
} as const;

export default function TulisanContent({
  articlesByLocale,
  articleIds,
}: Readonly<TulisanContentProps>) {
  const { locale, t, localePath } = useLocale();
  const articles = articlesByLocale[locale];
  const copy = archiveCopy[locale];

  const featuredArticles = useMemo(
    () => articles.filter((article) => article.featured).slice(0, 4),
    [articles]
  );

  const articlesByYear = useMemo(() => {
    const groups = new Map<string, ArticleData[]>();
    for (const article of articles) {
      const year = article.date.slice(0, 4);
      groups.set(year, [...(groups.get(year) ?? []), article]);
    }
    return Array.from(groups.entries());
  }, [articles]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".nagare-archive-reveal")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.6 }
    );

    for (const element of elements) {
      element.classList.add("nagare-reveal-ready");
    }

    const frame = requestAnimationFrame(() => {
      for (const element of elements) observer.observe(element);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [locale]);

  return (
    <div className="nagare-home nagare-archive-page">
      <OrganicBackground />

      <nav className="nagare-nav" aria-label="Archive navigation">
        <Link href={localePath("/")} className="nagare-mark">
          DU
        </Link>
        <div className="nagare-nav-links">
          <Link href={localePath("/")}>
            {locale === "id" ? "Beranda" : "Home"}
          </Link>
          <Link href={localePath("/now")}>{t.nav.now}</Link>
          <Link href={localePath("/about")}>{t.nav.about}</Link>
          <LanguageToggle />
          <ToggleDarkMode />
        </div>
      </nav>

      <main className="nagare-archive-main">
        <header className="nagare-archive-hero">
          <div>
            <p className="nagare-archive-eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
          </div>
          <div className="nagare-archive-intro">
            <p>{copy.subtitle}</p>
            <span>
              {articles.length} {copy.entry}
            </span>
          </div>
        </header>

        <div className="nagare-archive-actions nagare-archive-reveal">
          <div className="nagare-archive-actions-content">
            <Link href={localePath("/tag")}>{copy.tags}</Link>
            <Link href={localePath("/search")}>{copy.search}</Link>
            <Link href="https://www.youtube.com/@detautama9899">YouTube</Link>
            <FeelingLuckyButton articleIds={articleIds} />
          </div>
        </div>

        {featuredArticles.length > 0 && (
          <section className="nagare-featured-section">
            <p className="nagare-archive-section-label nagare-archive-reveal">
              {copy.featured}
            </p>
            <div className="nagare-featured-grid">
              {featuredArticles.map((article, index) => (
                <Link
                  href={localePath(`/articles/${article.id}`)}
                  key={article.id}
                  className="nagare-featured-entry nagare-archive-reveal"
                >
                  <span className="nagare-featured-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="nagare-featured-date">{article.date}</span>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <span className="nagare-featured-arrow">↗</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="nagare-all-writing">
          <p className="nagare-archive-section-label nagare-archive-reveal">
            {copy.all}
          </p>
          <div className="nagare-year-groups">
            {articlesByYear.map(([year, yearArticles]) => (
              <section className="nagare-year-group" key={year}>
                <div className="nagare-year-heading nagare-archive-reveal">
                  <h2>{year}</h2>
                  <span>
                    {yearArticles.length} {copy.entry}
                  </span>
                </div>
                <div className="nagare-year-entries">
                  {yearArticles.map((article) => (
                    <Link
                      href={localePath(`/articles/${article.id}`)}
                      key={article.id}
                      className="nagare-archive-row nagare-archive-reveal"
                    >
                      <time>{article.date.slice(5)}</time>
                      <span className="nagare-archive-row-copy">
                        <strong>{article.title}</strong>
                        <span>{article.description}</span>
                      </span>
                      <span className="nagare-archive-row-tags">
                        {article.tags.slice(0, 2).join(" · ")}
                      </span>
                      <span className="nagare-archive-row-arrow">↗</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
