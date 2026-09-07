"use client";

import React from "react";
import { ArticleData } from "../../lib/articles";
import { Link } from "next-view-transitions";
import { useSearch } from "./useSearch";
import { useLocale } from "../../lib/LocaleContext";
import { getTagEmoji } from "../../lib/tagEmoji";
import { SmallWebShell } from "../../components/SmallWebShell";

const pageCopy = {
  id: {
    intro: "Ketik kata kunci untuk menyusuri seluruh tulisan di arsip ini.",
  },
  en: {
    intro: "Type a keyword to comb through every entry in this archive.",
  },
} as const;

export const Search: React.FC<{
  articlesByLocale: {
    id: ArticleData[];
    en: ArticleData[];
  };
}> = (props) => {
  const { locale, t, localePath } = useLocale();
  const articles =
    props.articlesByLocale[locale as keyof typeof props.articlesByLocale];
  const copy = pageCopy[locale];

  const { result, highlightedText, search, highlightText } =
    useSearch(articles);

  return (
    <SmallWebShell
      activeSection="articles"
      contentClassName="small-web-search-content"
    >
      <header className="small-web-page-header">
        <h1>{t.search.title}</h1>
        <div className="small-web-rule" />
        <div className="small-web-page-intro">
          <p>{copy.intro}</p>
        </div>
      </header>

      <section className="small-web-section small-web-search-section">
        <form className="small-web-search-box" role="search">
          <span aria-hidden="true">⌕</span>
          <input
            type="text"
            placeholder={t.search.placeholder}
            onChange={search}
          />
        </form>

        <p className="small-web-search-status">
          {highlightedText !== "" &&
            (result.length > 0
              ? t.search.result(result.length)
              : t.search.noResult)}
        </p>

        {result.length > 0 && (
          <div className="small-web-posts">
            {result.map((article, index) => (
              <Link
                href={localePath(`/articles/${article.id}`)}
                key={article.id}
                className="small-web-post small-web-search-result"
              >
                <span className="small-web-post-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="small-web-post-copy">
                  <span>
                    {article.date} ·{" "}
                    {article.tags
                      .slice(0, 2)
                      .map((tag) => `${getTagEmoji(tag)} ${tag}`)
                      .join(" / ")}
                  </span>
                  <strong>
                    {highlightText(article.title, highlightedText)}
                  </strong>
                  <small>
                    {highlightText(article.content, highlightedText)}
                  </small>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SmallWebShell>
  );
};
