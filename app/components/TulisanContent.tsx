"use client";

import React, { useMemo } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";
import FeelingLuckyButton from "./FeelingLuckyButton";
import { getTagEmoji } from "../lib/tagEmoji";

interface TulisanContentProps {
  articlesByLocale: {
    id: ArticleData[];
    en: ArticleData[];
  };
  articleIds: string[];
}

export default function TulisanContent({
  articlesByLocale,
  articleIds,
}: TulisanContentProps) {
  const { locale, t, localePath } = useLocale();

  const allArticlesData = articlesByLocale[locale];

  const featuredArticles = useMemo(
    () => allArticlesData.filter((article) => article.featured),
    [allArticlesData]
  );

  const links = [
    { href: localePath("/tag"), label: t.home.quickLinks.browse },
    { href: "https://www.youtube.com/@detautama9899", label: "YouTube" },
  ];

  return (
    <div className="brand-container animate-in py-10">
      <div className="border-brand-accent/20 mb-8 flex flex-wrap items-end justify-between gap-4 border-b pb-6">
        <div>
          <span className="hud-label">Archive database // all entries</span>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-[-0.06em] text-brand-text-primary sm:text-5xl">
            {t.nav.articles}
          </h1>
          <p className="dark:text-brand-dark-text/70 mt-1 font-serif text-brand-text-secondary">
            {t.tulisan.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="dark:text-brand-dark-text/70 text-brand-text-secondary transition-colors hover:text-brand-accent"
            >
              {label}
            </Link>
          ))}
          <FeelingLuckyButton articleIds={articleIds} />
        </div>
      </div>

      {featuredArticles.length > 0 && (
        <section className="mb-10">
          <h2 className="dark:text-brand-dark-text/60 mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-text-secondary">
            {t.home.featured}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredArticles.map(({ id, title }) => (
              <Link
                href={localePath(`/articles/${id}`)}
                key={id}
                className="brand-card hover:border-brand-accent/70 px-4 py-3 transition"
              >
                <h3 className="font-display text-sm font-medium text-brand-text-primary dark:text-brand-dark-text">
                  {title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="grid gap-3">
          {allArticlesData.map(
            ({ id, date, title, description, tags, image }, i) => (
              <Link
                href={localePath(`/articles/${id}`)}
                key={id}
                className="brand-card hover:border-brand-accent/60 group flex items-center gap-4 p-4 transition duration-300 hover:translate-x-1 sm:p-5"
              >
                {image && (
                  <div className="border-brand-accent/20 relative hidden h-20 w-20 shrink-0 overflow-hidden border bg-brand-tan sm:block">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    {i === 0 && (
                      <span className="brand-badge bg-brand-accent text-white">
                        {t.home.new}
                      </span>
                    )}
                    <time className="dark:text-brand-dark-text/60 text-xs text-brand-text-secondary">
                      {date}
                    </time>
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="dark:text-brand-dark-text/60 hidden text-xs text-brand-text-secondary sm:inline"
                      >
                        {getTagEmoji(tag)} {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                    {title}
                  </h3>
                  <p className="dark:text-brand-dark-text/70 font-serif text-sm text-brand-text-secondary">
                    {description}
                  </p>
                </div>
                <svg
                  className="text-brand-text-secondary/50 h-5 w-5 shrink-0 transition-colors group-hover:text-brand-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
}
