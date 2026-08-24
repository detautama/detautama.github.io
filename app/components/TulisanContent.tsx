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

export default function TulisanContent({ articlesByLocale, articleIds }: TulisanContentProps) {
  const { locale, t, localePath } = useLocale();

  const allArticlesData = articlesByLocale[locale];

  const featuredArticles = useMemo(
    () => allArticlesData.filter((article) => article.featured),
    [allArticlesData]
  );

  const links = [
    { href: localePath("/tag"), label: t.home.quickLinks.browse },
    { href: localePath("/links"), label: t.home.quickLinks.links },
    { href: "https://www.youtube.com/@detautama9899", label: "YouTube" },
  ];

  return (
    <div className="brand-container animate-in py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-brand-tan pb-6 dark:border-brand-dark-border">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            {t.nav.articles}
          </h1>
          <p className="mt-1 font-serif text-brand-text-secondary dark:text-brand-dark-text/70">
            {t.tulisan.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-brand-text-secondary transition-colors hover:text-brand-accent dark:text-brand-dark-text/70"
            >
              {label}
            </Link>
          ))}
          <FeelingLuckyButton articleIds={articleIds} />
        </div>
      </div>

      {featuredArticles.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-text-secondary dark:text-brand-dark-text/60">
            {t.home.featured}
          </h2>
          <div className="flex flex-wrap gap-3">
            {featuredArticles.map(({ id, title }) => (
              <Link
                href={localePath(`/articles/${id}`)}
                key={id}
                className="rounded-lg border border-brand-tan bg-white px-4 py-3 transition-colors hover:border-brand-accent dark:border-brand-dark-border dark:bg-brand-dark-surface"
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
        <div className="divide-y divide-brand-tan dark:divide-brand-dark-border">
          {allArticlesData.map(({ id, date, title, description, tags, image }, i) => (
            <Link
              href={localePath(`/articles/${id}`)}
              key={id}
              className="group flex items-center gap-4 py-5 first:pt-0"
            >
              {image && (
                <div className="relative hidden h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-tan sm:block dark:bg-brand-dark-surface">
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
                    <span className="brand-badge bg-brand-accent text-white">{t.home.new}</span>
                  )}
                  <time className="text-xs text-brand-text-secondary dark:text-brand-dark-text/60">
                    {date}
                  </time>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="hidden text-xs text-brand-text-secondary sm:inline dark:text-brand-dark-text/60"
                    >
                      {getTagEmoji(tag)} {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-lg font-semibold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                  {title}
                </h3>
                <p className="font-serif text-sm text-brand-text-secondary dark:text-brand-dark-text/70">
                  {description}
                </p>
              </div>
              <svg
                className="h-5 w-5 shrink-0 text-brand-text-secondary/50 transition-colors group-hover:text-brand-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
