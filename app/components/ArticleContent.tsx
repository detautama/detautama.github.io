"use client";

import React, { useState } from "react";
import { Link } from "next-view-transitions";
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

export default function ArticleContent({
  articleId,
  articlesByLocale,
  hasImage,
  relatedArticlesByLocale,
}: Readonly<ArticleContentProps>) {
  const { locale, t, localePath } = useLocale();

  const articleData = articlesByLocale[locale];
  const relatedArticles = relatedArticlesByLocale[locale];
  const isLanguageMissing = !articleData.availableLocales.includes(locale);
  const articleImage =
    articleData.image ?? (hasImage ? `/og-images/${articleId}.png` : null);
  const articleImageHeight = articleImage?.startsWith("/og-images/")
    ? 630
    : 1200;
  const [isImageOpen, setIsImageOpen] = useState(false);

  React.useEffect(() => {
    if (!isImageOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsImageOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isImageOpen]);

  return (
    <div className="animate-in">
      <span className="hud-label">
        Archive entry // {articleId.slice(0, 18)}
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight tracking-[-0.055em] md:text-5xl">
        {articleData.title}
      </h1>
      <div className="mb-5" />
      <div className="dark:text-brand-dark-text/70 flex flex-wrap items-center gap-2 text-sm text-brand-text-secondary">
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

      {isLanguageMissing && (
        <div className="my-6 rounded-md border-l-4 border-brand-accent bg-brand-tan p-4 text-brand-text-primary dark:bg-brand-dark-surface dark:text-brand-dark-text">
          <p className="font-bold">
            {t.article.onlyAvailable}{" "}
            {locale === "id" ? "English" : "Bahasa Indonesia"}
          </p>
        </div>
      )}

      <WarningIfArticleIsOld date={articleData.date} t={t} />

      <div className="mb-6" />

      {articleImage && (
        <button
          type="button"
          onClick={() => setIsImageOpen(true)}
          className="border-brand-accent/25 float-left mb-4 mr-5 mt-1 w-28 shrink-0 cursor-zoom-in border bg-brand-dark-surface p-1 sm:w-40 md:w-52"
          aria-label={articleData.title}
        >
          <Image
            src={articleImage}
            alt={articleData.title}
            width={1200}
            height={articleImageHeight}
            className="h-auto w-full"
            priority
          />
        </button>
      )}

      {articleImage && isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsImageOpen(false)}
            className="absolute right-4 top-4 text-2xl text-white/80 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
          <Image
            src={articleImage}
            alt={articleData.title}
            width={1200}
            height={articleImageHeight}
            className="border-brand-accent/40 max-h-[90vh] w-auto max-w-full border object-contain"
          />
        </div>
      )}

      <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-[1.8] prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline">
        <MarkdownRenderer>{articleData.content}</MarkdownRenderer>
      </article>

      <div className="clear-both mt-12">
        <ShareButton />
      </div>

      {relatedArticles.length > 0 && (
        <section className="border-brand-accent/20 mt-12 border-t pt-10">
          <h2 className="dark:text-brand-dark-text/60 mb-6 text-base font-semibold uppercase tracking-widest text-brand-text-secondary">
            {t.article.relatedArticles}
          </h2>
          <div className="grid gap-3">
            {relatedArticles.map(({ id, title, description, date }) => (
              <Link
                key={id}
                href={localePath(`/articles/${id}`)}
                className="brand-card hover:border-brand-accent/60 group p-4 transition"
              >
                <time className="dark:text-brand-dark-text/60 text-xs text-brand-text-secondary">
                  {date}
                </time>
                <h3 className="mt-1 font-bold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                  {title}
                </h3>
                <p className="dark:text-brand-dark-text/70 mt-1 line-clamp-2 text-sm text-brand-text-secondary">
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

const WarningIfArticleIsOld = ({
  date,
  t,
}: {
  date: string;
  t: Translations;
}) => {
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
