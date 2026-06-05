"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";
import { Translations } from "../lib/i18n";
import { MarkdownRenderer } from "../MarkdownRenderer";
import Comment from "../(clean-layout)/articles/[articleId]/Comment";
import ShareButton from "../(clean-layout)/articles/[articleId]/ShareButton";
import { getTagEmoji } from "../lib/tagEmoji";

interface ArticleContentProps {
  articleId: string;
  articlesByLocale: {
    id: ArticleData;
    en: ArticleData;
  };
  hasImage: boolean;
  relatedArticlesByLocale: {
    id: ArticleData[];
    en: ArticleData[];
  };
}

export default function ArticleContent({ articleId, articlesByLocale, hasImage, relatedArticlesByLocale }: Readonly<ArticleContentProps>) {
  const { locale, t, localePath } = useLocale();

  const articleData = articlesByLocale[locale];
  const relatedArticles = relatedArticlesByLocale[locale];
  const isLanguageMissing = !articleData.availableLocales.includes(locale);

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
        {articleData.title}
      </h1>
      <div className="mb-5" />
      <div className="flex flex-wrap items-center gap-2 text-sm text-brand-text-secondary dark:text-brand-dark-text/70">
        <time>{articleData.date}</time>
        {articleData.tags.length > 0 && <span>·</span>}
        <div className="flex flex-wrap items-center gap-2">
          {articleData.tags.map((tag, i) => (
            <React.Fragment key={tag}>
              <Link
                href={localePath(`/tag/#${tag}`)}
                className="transition-colors hover:text-brand-text-primary hover:underline dark:hover:text-brand-dark-text"
              >
                <span>{getTagEmoji(tag)}</span> {tag}
              </Link>
              {i < articleData.tags.length - 1 && <span>·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {hasImage && (
        <div className="mb-8 mt-8">
          <Image
            src={`/og-images/${articleId}.png`}
            alt={articleData.title}
            width={1200}
            height={630}
            className="h-auto w-full"
            priority
          />
        </div>
      )}

      {isLanguageMissing && (
        <div className="my-6 rounded-md border-l-4 border-brand-accent bg-brand-tan p-4 text-brand-text-primary dark:bg-brand-dark-surface dark:text-brand-dark-text">
          <p className="font-bold">
            {t.article.onlyAvailable} {locale === "id" ? "English" : "Bahasa Indonesia"}
          </p>
        </div>
      )}

      <WarningIfArticleIsOld date={articleData.date} t={t} />

      <div className="mb-6" />

      <article
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-[1.8] prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline"
        style={{ fontFamily: "var(--font-merriweather), Georgia, serif" }}
      >
        <MarkdownRenderer>{articleData.content}</MarkdownRenderer>
      </article>

      <div className="mt-12">
        <ShareButton />
      </div>

      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-brand-tan pt-10">
          <h2 className="mb-6 text-base font-semibold uppercase tracking-widest text-brand-text-secondary dark:text-brand-dark-text/60">
            {t.article.relatedArticles}
          </h2>
          <div className="flex flex-col divide-y divide-brand-tan dark:divide-brand-dark-border">
            {relatedArticles.map(({ id, title, description, date }) => (
              <Link
                key={id}
                href={localePath(`/articles/${id}`)}
                className="group py-5 first:pt-0"
              >
                <time className="text-xs text-brand-text-secondary dark:text-brand-dark-text/60">
                  {date}
                </time>
                <h3 className="mt-1 font-bold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                  {title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-brand-text-secondary dark:text-brand-dark-text/70">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mb-16" />
      <Comment />
    </div>
  );
}

const WarningIfArticleIsOld = ({ date, t }: { date: string, t: Translations }) => {
  const now = new Date();
  const articleDate = new Date(date);
  const diff = now.getTime() - articleDate.getTime();
  const diffDays = diff / (1000 * 60 * 60 * 24);
  if (diffDays > 365) {
    return (
      <div className="my-6 rounded-md border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700">
        <p className="font-bold">{t.article.old}</p>
        <p>{t.article.oldDescription}</p>
      </div>
    );
  }
  return null;
};
