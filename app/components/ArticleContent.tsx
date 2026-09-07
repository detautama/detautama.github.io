"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import Comment from "../(clean-layout)/articles/[articleId]/Comment";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";
import { SmallWebShell } from "./SmallWebShell";

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
  articleId,
  articlesByLocale,
  hasImage,
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

  const copy =
    locale === "id"
      ? {
          back: "Kembali ke semua tulisan",
          reading: `${readingMinutes} menit baca`,
          related: "Baca selanjutnya",
          relatedNote: "Catatan lain yang mungkin kamu suka",
          comments: "Kotak percakapan",
          commentsNote: "Tinggalkan jejak sebelum pulang",
        }
      : {
          back: "Back to all writing",
          reading: `${readingMinutes} min read`,
          related: "Read next",
          relatedNote: "More notes you might enjoy",
          comments: "Conversation box",
          commentsNote: "Leave a little trace before you go",
        };

  return (
    <SmallWebShell
      activeSection="articles"
      contentClassName="small-web-article-content"
    >
      <article>
        <header className="small-web-article-header">
          <Link
            href={localePath("/articles")}
            className="small-web-article-back"
          >
            ← {copy.back}
          </Link>
          <h1>{articleData.title}</h1>
          <p className="small-web-article-description">
            {articleData.description}
          </p>
          <div className="small-web-article-meta">
            <time>{articleData.date}</time>
            <span>{copy.reading}</span>
            {articleData.tags.map((tag) => (
              <Link href={localePath(`/tag/#${tag}`)} key={tag}>
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        {isLanguageMissing && (
          <div className="small-web-article-notice">
            <span aria-hidden="true">☞</span>
            <strong>
              {t.article.onlyAvailable}{" "}
              {locale === "id" ? "English" : "Bahasa Indonesia"}
            </strong>
          </div>
        )}

        {hasImage && (
          <figure className="small-web-article-cover">
            <Image
              src={`/og-images/${articleId}.png`}
              alt=""
              width={1200}
              height={630}
              priority
            />
            <figcaption>archive image · {articleData.date}</figcaption>
          </figure>
        )}

        <div className="small-web-reading-paper">
          <div className="small-web-paper-pin" aria-hidden="true" />
          <div className="small-web-article-prose nagare-prose prose prose-lg max-w-none dark:prose-invert">
            <MarkdownRenderer>{articleData.content}</MarkdownRenderer>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="small-web-section small-web-related-section">
          <header className="small-web-section-heading">
            <div>
              <span className="small-web-section-icon" aria-hidden="true">
                ↗
              </span>
              <div>
                <h2>{copy.related}</h2>
                <p>{copy.relatedNote}</p>
              </div>
            </div>
          </header>
          <div className="small-web-featured-grid small-web-related-grid">
            {relatedArticles.map(({ id, title, description, date }) => (
              <Link
                key={id}
                href={localePath(`/articles/${id}`)}
                className="small-web-featured-card"
              >
                <time>{date}</time>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="small-web-featured-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="small-web-section small-web-comments-section">
        <header className="small-web-section-heading">
          <div>
            <span className="small-web-section-icon" aria-hidden="true">
              ✉
            </span>
            <div>
              <h2>{copy.comments}</h2>
              <p>{copy.commentsNote}</p>
            </div>
          </div>
        </header>
        <div className="small-web-comments-box">
          <Comment />
        </div>
      </section>
    </SmallWebShell>
  );
}
