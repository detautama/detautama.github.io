"use client";

import React from "react";
import { ArticleData } from "../../lib/articles";
import { Link } from "next-view-transitions";
import { useSearch } from "./useSearch";
import { useLocale } from "../../lib/LocaleContext";
import { getTagEmoji } from "../../lib/tagEmoji";

export const Search: React.FC<{
  articlesByLocale: {
    id: ArticleData[];
    en: ArticleData[];
  };
}> = (props) => {
  const { locale, t, localePath } = useLocale();
  const articles =
    props.articlesByLocale[locale as keyof typeof props.articlesByLocale];

  const { result, highlightedText, search, highlightText } =
    useSearch(articles);

  return (
    <div className="brand-container animate-in py-8">
      <span className="hud-label">Archive search protocol</span>
      <h1 className="mb-8 mt-4 font-display text-4xl font-bold uppercase tracking-[-0.06em] text-brand-text-primary">
        {t.search.title}
      </h1>
      <form className="mb-8">
        <input
          type="text"
          placeholder={t.search.placeholder}
          className="border-brand-accent/30 bg-brand-dark-surface/70 focus:ring-brand-accent/20 w-full border p-4 font-mono text-sm text-brand-text-primary placeholder-brand-text-secondary transition-all focus:border-brand-accent focus:outline-none focus:ring-2"
          onChange={search}
        />
      </form>
      <div className="mb-4">
        <p className="dark:text-brand-dark-text/70 text-brand-text-secondary">
          {result.length > 0
            ? t.search.result(result.length)
            : t.search.noResult}
        </p>
      </div>
      <div className="space-y-6">
        {result.map(({ id, title, content, date, tags }) => (
          <Link
            href={localePath(`/articles/${id}`)}
            key={id}
            className="group block"
          >
            <article className="brand-article-card">
              <h3 className="mb-2 text-lg font-semibold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                {highlightText(title, highlightedText)}
              </h3>
              <p className="dark:text-brand-dark-text/80 mb-3 line-clamp-2 text-brand-text-secondary">
                {highlightText(content, highlightedText)}
              </p>
              <div className="flex items-center gap-3 text-sm">
                <time className="dark:text-brand-dark-text/70 text-brand-text-secondary">
                  {date}
                </time>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="brand-badge flex gap-1">
                      <span>{getTagEmoji(tag)}</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};
