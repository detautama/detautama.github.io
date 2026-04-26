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

interface ArticleContentProps {
  articleId: string;
  articlesByLocale: {
    id: ArticleData;
    en: ArticleData;
  };
  hasImage: boolean;
}

export default function ArticleContent({ articleId, articlesByLocale, hasImage }: ArticleContentProps) {
  const { locale, t } = useLocale();

  const articleData = articlesByLocale[locale];
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
              href={`/tag/#${tag}`}
              className="brand-badge flex gap-1 transition-colors hover:bg-brand-forest hover:text-white"
            >
              <Image src="/images/tag.svg" alt="tag" width={16} height={16} />
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
