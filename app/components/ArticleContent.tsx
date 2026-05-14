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
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        {articleData.title}
      </h1>
      <div className="mb-5" />
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <time className="text-gray-500 dark:text-gray-300">
          {articleData.date}
        </time>
        <div className="flex flex-wrap items-center justify-center gap-2 text-center">
          {articleData.tags.map((tag) => (
            <Link
              key={tag}
              href={localePath(`/tag/#${tag}`)}
              className="brand-badge flex gap-1 transition-colors hover:bg-brand-forest hover:text-white"
            >
              <span>{getTagEmoji(tag)}</span>
              {tag}
            </Link>
          ))}
        </div>
      </div>
      
      {hasImage && (
        <div className="mb-6 mt-6">
          <Image
            src={`/og-images/${articleId}.png`}
            alt={articleData.title}
            width={1200}
            height={630}
            className="h-auto w-full rounded-md"
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
      
      <div className="mb-10" />
      
      <article className="prose dark:prose-invert max-w-none">
        <MarkdownRenderer>{articleData.content}</MarkdownRenderer>
      </article>

      <div className="mt-12">
        <ShareButton />
      </div>

      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-brand-tan pt-10">
          <h2 className="mb-6 font-display text-xl font-semibold text-brand-text-primary dark:text-brand-dark-text">
            {t.article.relatedArticles}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedArticles.map(({ id, title, description, date, tags }) => (
              <Link
                key={id}
                href={localePath(`/articles/${id}`)}
                className="group brand-article-card flex flex-col gap-2 transition-all duration-200 hover:shadow-md"
              >
                <time className="text-xs text-brand-text-secondary dark:text-brand-dark-text/70">
                  {date}
                </time>
                <h3 className="font-display font-bold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text line-clamp-2">
                  {title}
                </h3>
                <p className="line-clamp-2 font-serif text-sm text-brand-text-secondary dark:text-brand-dark-text/80">
                  {description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1 pt-2">
                  {tags.map((tag) => (
                    <span key={tag} className="brand-badge flex gap-1 text-xs">
                      <span>{getTagEmoji(tag)}</span>
                      {tag}
                    </span>
                  ))}
                </div>
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
