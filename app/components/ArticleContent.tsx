"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";
import { MarkdownRenderer } from "../MarkdownRenderer";
import Comment from "../(clean-layout)/articles/[articleId]/Comment";
import { LanguageToggle } from "./LanguageToggle";
import { OrganicBackground } from "./OrganicBackground";
import { ToggleDarkMode } from "../ToggleDarkMode";

interface ArticleContentProps {
  readonly articleId: string;
  readonly articlesByLocale: {
    readonly id: ArticleData;
    readonly en: ArticleData;
  };
  readonly hasImage: boolean;
  readonly relatedArticlesByLocale: {
    readonly id: ArticleData[];
    readonly en: ArticleData[];
  };
}

export default function ArticleContent({
  articlesByLocale,
  relatedArticlesByLocale,
}: Readonly<ArticleContentProps>) {
  const { locale, t, localePath } = useLocale();
  const articleData = articlesByLocale[locale];
  const relatedArticles = relatedArticlesByLocale[locale];
  const isLanguageMissing = !articleData.availableLocales.includes(locale);
  const readingMinutes = Math.max(
    1,
    Math.ceil(articleData.content.trim().split(/\s+/).length / 220)
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsContentVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0 }
    );

    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  const copy =
    locale === "id"
      ? {
          back: "Kembali ke arsip",
          reading: `${readingMinutes} menit baca`,
          comments: "Percakapan",
        }
      : {
          back: "Back to archive",
          reading: `${readingMinutes} min read`,
          comments: "Conversation",
        };

  return (
    <div className="nagare-home nagare-article-page">
      <OrganicBackground />

      <nav className="nagare-nav" aria-label="Article navigation">
        <Link href={localePath("/")} className="nagare-mark">
          DU
        </Link>
        <div className="nagare-nav-links">
          <Link href={localePath("/")}>
            {locale === "id" ? "Beranda" : "Home"}
          </Link>
          <Link href={localePath("/articles")}>{t.nav.articles}</Link>
          <Link href={localePath("/now")}>{t.nav.now}</Link>
          <LanguageToggle />
          <ToggleDarkMode />
        </div>
      </nav>

      <main className="nagare-article-main">
        <header className="nagare-article-header">
          <Link href={localePath("/articles")} className="nagare-article-back">
            ← {copy.back}
          </Link>
          <h1>{articleData.title}</h1>
          <p className="nagare-article-description">
            {articleData.description}
          </p>
          <div className="nagare-article-meta">
            <time>{articleData.date}</time>
            <span>{copy.reading}</span>
            {articleData.tags.map((tag) => (
              <Link href={localePath(`/tag/#${tag}`)} key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        </header>

        {isLanguageMissing && (
          <div className="nagare-article-notice">
            <strong>
              {t.article.onlyAvailable}{" "}
              {locale === "id" ? "English" : "Bahasa Indonesia"}
            </strong>
          </div>
        )}

        <div
          ref={contentRef}
          className={`nagare-reading-layout nagare-article-content-reveal ${
            isContentVisible ? "is-visible" : ""
          }`}
        >
          <article className="nagare-prose prose prose-lg max-w-none dark:prose-invert">
            <MarkdownRenderer>{articleData.content}</MarkdownRenderer>
          </article>
        </div>

        {relatedArticles.length > 0 && (
          <section className="nagare-related-section">
            <p className="nagare-archive-section-label">
              {t.article.relatedArticles}
            </p>
            <div className="nagare-related-grid">
              {relatedArticles.map(({ id, title, description, date }) => (
                <Link
                  key={id}
                  href={localePath(`/articles/${id}`)}
                  className="nagare-related-entry"
                >
                  <time>{date}</time>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <span>↗</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="nagare-comments-section">
          <p className="nagare-archive-section-label">{copy.comments}</p>
          <Comment />
        </section>
      </main>
    </div>
  );
}
