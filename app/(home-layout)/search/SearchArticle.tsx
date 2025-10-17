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
    <div className="claude-container animate-in py-8">
      <h1 className="mb-8 text-center font-display text-3xl font-bold text-claude-text-primary dark:text-claude-dark-text">
        Search Articles
      </h1>
      <form className="mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          className="border-claude-border w-full rounded-lg border bg-white p-3 text-claude-text-primary placeholder-claude-text-secondary transition-all focus:border-claude-accent focus:outline-none focus:ring-2 focus:ring-claude-accent/20 dark:border-claude-dark-border dark:bg-claude-dark-bg dark:text-claude-dark-text dark:placeholder-claude-dark-text/50"
          onChange={search}
        />
      </form>
      <div className="space-y-6">
        {result.map(({ id, title, content, date, tags }) => (
          <Link href={`/articles/${id}`} key={id} className="group block">
            <article className="claude-article-card">
              <h3 className="mb-2 text-lg font-semibold text-claude-text-primary transition-colors group-hover:text-claude-accent dark:text-claude-dark-text">
                {highlightText(title, highlightedText)}
              </h3>
              <p className="mb-3 line-clamp-2 text-claude-text-secondary dark:text-claude-dark-text/80">
                {highlightText(content, highlightedText)}
              </p>
              <div className="flex items-center gap-3 text-sm">
                <time className="text-claude-text-secondary dark:text-claude-dark-text/70">
                  {date}
                </time>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="claude-badge">
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
