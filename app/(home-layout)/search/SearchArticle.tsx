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
    <div className="claude-container py-8 animate-in">
      <h1 className="text-3xl font-display font-bold text-claude-text-primary dark:text-claude-dark-text mb-8 text-center">
        Search Articles
      </h1>
      <form className="mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full rounded-lg border border-claude-border dark:border-claude-dark-border bg-white dark:bg-claude-dark-bg p-3 text-claude-text-primary dark:text-claude-dark-text placeholder-claude-text-secondary dark:placeholder-claude-dark-text/50 focus:border-claude-accent focus:outline-none focus:ring-2 focus:ring-claude-accent/20 transition-all"
          onChange={search}
        />
      </form>
      <div className="space-y-6">
        {result.map(({ id, title, content, date, tag }) => (
          <Link href={`/articles/${id}`} key={id} className="block group">
            <article className="claude-article-card">
              <h3 className="text-lg font-semibold text-claude-text-primary dark:text-claude-dark-text mb-2 group-hover:text-claude-accent transition-colors">
                {highlightText(title, highlightedText)}
              </h3>
              <p className="text-claude-text-secondary dark:text-claude-dark-text/80 mb-3 line-clamp-2">
                {highlightText(content, highlightedText)}
              </p>
              <div className="flex items-center gap-3 text-sm">
                <time className="text-claude-text-secondary dark:text-claude-dark-text/70">
                  {date}
                </time>
                <span className="claude-badge">
                  {tag}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};
