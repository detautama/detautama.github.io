"use client";

import React from "react";
import { ArticleData } from "../../lib/articles";
import Link from "next/link";
import { useSearch } from "./useSearch";

export const Search: React.FC<{
  articles: ArticleData[];
}> = (props) => {
  const { result, highlightedText, search, highlightText } = useSearch(
    props.articles
  );

  return (
    <div className="brand-container animate-in py-8">
      <h1 className="mb-8 text-center font-display text-3xl font-bold text-brand-text-primary dark:text-brand-dark-text">
        Search Articles
      </h1>
      <form className="mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          className="border-brand-border w-full rounded-lg border bg-white p-3 text-brand-text-primary placeholder-brand-text-secondary transition-all focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 dark:border-brand-dark-border dark:bg-brand-dark-bg dark:text-brand-dark-text dark:placeholder-brand-dark-text/50"
          onChange={search}
        />
      </form>
      <div className="space-y-6">
        {result.map(({ id, title, content, date, tags }) => (
          <Link href={`/articles/${id}`} key={id} className="group block">
            <article className="brand-article-card">
              <h3 className="mb-2 text-lg font-semibold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                {highlightText(title, highlightedText)}
              </h3>
              <p className="mb-3 line-clamp-2 text-brand-text-secondary dark:text-brand-dark-text/80">
                {highlightText(content, highlightedText)}
              </p>
              <div className="flex items-center gap-3 text-sm">
                <time className="text-brand-text-secondary dark:text-brand-dark-text/70">
                  {date}
                </time>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="brand-badge">
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
