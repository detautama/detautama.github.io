"use client";

import { Link } from "next-view-transitions";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArticleData } from "../../lib/articles";
import { useLocale } from "../../lib/LocaleContext";
import { getTagEmoji } from "../../lib/tagEmoji";
import { OrganicBackground } from "../../components/OrganicBackground";
import { EditorialNav } from "../../components/EditorialNav";
import { EditorialReveal } from "../../components/EditorialReveal";

interface TagContentProps {
  readonly articlesByLocale: {
    readonly id: ArticleData[];
    readonly en: ArticleData[];
  };
}

export function TagContent({ articlesByLocale }: TagContentProps) {
  const { locale, localePath } = useLocale();
  const articles = articlesByLocale[locale];
  const uniqueTags = [
    ...new Set(articles.flatMap((article) => article.tags)),
  ].sort();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const highlightTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const highlightTag = useCallback((tag: string) => {
    if (highlightTimeout.current) clearTimeout(highlightTimeout.current);
    setActiveTag(tag);
    highlightTimeout.current = setTimeout(() => setActiveTag(null), 1800);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = decodeURIComponent(globalThis.location.hash.slice(1));
      if (hash) highlightTag(hash);
    };

    handleHashChange();
    globalThis.addEventListener("hashchange", handleHashChange);
    return () => {
      globalThis.removeEventListener("hashchange", handleHashChange);
      if (highlightTimeout.current) clearTimeout(highlightTimeout.current);
    };
  }, [highlightTag]);

  const copy =
    locale === "id"
      ? {
          title: "Topik.",
          intro: `${uniqueTags.length} topik yang menghubungkan catatan tentang teknologi, pekerjaan, keluarga, dan hidup sehari-hari.`,
          index: "Jelajahi topik",
          entries: "tulisan",
        }
      : {
          title: "Topics.",
          intro: `${uniqueTags.length} threads connecting notes on technology, work, family, and everyday life.`,
          index: "Explore topics",
          entries: "entries",
        };

  return (
    <div className="nagare-home nagare-editorial-page nagare-tag-page">
      <OrganicBackground />
      <EditorialNav />
      <main className="nagare-editorial-main">
        <header className="nagare-editorial-hero nagare-tag-hero">
          <h1>{copy.title}</h1>
          <div className="nagare-editorial-intro">{copy.intro}</div>
        </header>

        <nav className="nagare-tag-index" aria-label={copy.index}>
          {uniqueTags.map((tag) => (
            <Link
              key={tag}
              href={localePath(`/tag/#${encodeURIComponent(tag)}`)}
              onClick={() => highlightTag(tag)}
            >
              <span>{getTagEmoji(tag)}</span>
              {tag}
            </Link>
          ))}
        </nav>

        <div className="nagare-tag-groups">
          {uniqueTags.map((tag, index) => {
            const taggedArticles = articles.filter((article) =>
              article.tags.includes(tag)
            );
            return (
              <EditorialReveal
                key={tag}
                className={`nagare-tag-group ${activeTag === tag ? "is-highlighted" : ""}`}
              >
                <header id={tag}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>
                    <i>{getTagEmoji(tag)}</i>
                    {tag}
                  </h2>
                  <p>
                    {taggedArticles.length} {copy.entries}
                  </p>
                </header>
                <div>
                  {taggedArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={localePath(`/articles/${article.id}`)}
                    >
                      <time>{article.date}</time>
                      <strong>{article.title}</strong>
                      <span>↗</span>
                    </Link>
                  ))}
                </div>
              </EditorialReveal>
            );
          })}
        </div>
      </main>
    </div>
  );
}
