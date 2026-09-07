"use client";

import { Link } from "next-view-transitions";
import { useMemo } from "react";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";
import FeelingLuckyButton from "./FeelingLuckyButton";
import { SmallWebShell } from "./SmallWebShell";

interface TulisanContentProps {
  readonly articlesByLocale: {
    readonly id: ArticleData[];
    readonly en: ArticleData[];
  };
  readonly articleIds: string[];
}

const archiveCopy = {
  id: {
    title: "Semua tulisanku.",
    subtitle:
      "Kumpulan pelajaran dari kode, pekerjaan, keluarga, dan perjalanan kecil sehari-hari.",
    entry: "tulisan",
    featured: "Pilihan untuk mulai",
    featuredNote: "Beberapa catatan dari rak favorit",
    all: "Arsip lengkap",
    allNote: "Diurutkan berdasarkan tahun",
    tags: "Jelajahi tag",
    search: "Cari arsip",
  },
  en: {
    title: "All my writing.",
    subtitle:
      "Lessons gathered from code, work, family, and the small journeys of everyday life.",
    entry: "entries",
    featured: "A place to begin",
    featuredNote: "A few notes from the favorite shelf",
    all: "The full archive",
    allNote: "Filed by year",
    tags: "Browse tags",
    search: "Search archive",
  },
} as const;

export default function TulisanContent({
  articlesByLocale,
  articleIds,
}: Readonly<TulisanContentProps>) {
  const { locale, localePath } = useLocale();
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

  return (
    <SmallWebShell
      activeSection="articles"
      contentClassName="small-web-archive-content"
    >
      <header className="small-web-page-header">
        <h1>{copy.title}</h1>
        <div className="small-web-rule" />
        <div className="small-web-page-intro">
          <p>{copy.subtitle}</p>
          <span>
            {articles.length} {copy.entry}
          </span>
        </div>
        <div className="small-web-archive-actions">
          <Link href={localePath("/tag")}># {copy.tags}</Link>
          <Link href={localePath("/search")}>⌕ {copy.search}</Link>
          <Link href="https://www.youtube.com/@detautama9899">▶ YouTube</Link>
          <FeelingLuckyButton articleIds={articleIds} />
        </div>
      </header>

      {featuredArticles.length > 0 && (
        <section className="small-web-section small-web-featured-section">
          <header className="small-web-section-heading">
            <div>
              <span className="small-web-section-icon" aria-hidden="true">
                ★
              </span>
              <div>
                <h2>{copy.featured}</h2>
                <p>{copy.featuredNote}</p>
              </div>
            </div>
          </header>

          <div className="small-web-featured-grid">
            {featuredArticles.map((article, index) => (
              <Link
                href={localePath(`/articles/${article.id}`)}
                key={article.id}
                className="small-web-featured-card"
              >
                <span className="small-web-featured-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <time>{article.date}</time>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <span className="small-web-featured-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="small-web-section small-web-all-writing">
        <header className="small-web-section-heading">
          <div>
            <span className="small-web-section-icon" aria-hidden="true">
              ☷
            </span>
            <div>
              <h2>{copy.all}</h2>
              <p>{copy.allNote}</p>
            </div>
          </div>
        </header>

        <div className="small-web-year-groups">
          {articlesByYear.map(([year, yearArticles]) => (
            <section className="small-web-year-group" key={year}>
              <header>
                <h3>{year}</h3>
                <span>
                  {yearArticles.length} {copy.entry}
                </span>
              </header>
              <div className="small-web-posts">
                {yearArticles.map((article, index) => (
                  <Link
                    href={localePath(`/articles/${article.id}`)}
                    key={article.id}
                    className="small-web-post"
                  >
                    <span className="small-web-post-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="small-web-post-copy">
                      <span>
                        {article.date.slice(5)} ·{" "}
                        {article.tags.slice(0, 2).join(" / ")}
                      </span>
                      <strong>{article.title}</strong>
                      <small>{article.description}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </SmallWebShell>
  );
}
