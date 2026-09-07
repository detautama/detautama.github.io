"use client";

import { Link } from "next-view-transitions";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArticleData } from "../../lib/articles";
import { useLocale } from "../../lib/LocaleContext";
import { getTagEmoji } from "../../lib/tagEmoji";
import { EditorialReveal } from "../../components/EditorialReveal";
import { SmallWebShell } from "../../components/SmallWebShell";

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
          indexNote: "Pilih sebuah label untuk melompat ke raknya",
          entries: "tulisan",
        }
      : {
          title: "Topics.",
          intro: `${uniqueTags.length} threads connecting notes on technology, work, family, and everyday life.`,
          index: "Explore topics",
          indexNote: "Choose a label to jump to its shelf",
          entries: "entries",
        };

  return (
    <SmallWebShell
      activeSection="tags"
      contentClassName="small-web-tags-content"
    >
      <header className="small-web-page-header">
        <h1>{copy.title}</h1>
        <div className="small-web-rule" />
        <div className="small-web-page-intro">
          <p>{copy.intro}</p>
          <span>{uniqueTags.length} tags</span>
        </div>
      </header>

      <section className="small-web-section small-web-tag-index-section">
        <header className="small-web-section-heading">
          <div>
            <span className="small-web-section-icon" aria-hidden="true">
              #
            </span>
            <div>
              <h2>{copy.index}</h2>
              <p>{copy.indexNote}</p>
            </div>
          </div>
        </header>

        <nav className="small-web-tag-index" aria-label={copy.index}>
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
      </section>

      <div className="small-web-tag-groups">
        {uniqueTags.map((tag, index) => {
          const taggedArticles = articles.filter((article) =>
            article.tags.includes(tag)
          );
          return (
            <EditorialReveal
              key={tag}
              className={`small-web-tag-group ${activeTag === tag ? "is-highlighted" : ""}`}
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
    </SmallWebShell>
  );
}
