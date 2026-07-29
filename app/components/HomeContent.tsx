"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";

interface HomeContentProps {
  readonly articlesByLocale: {
    readonly id: ArticleData[];
    readonly en: ArticleData[];
  };
}

const placeholderImages = [
  "/images/home/IMG_3177-hero.webp",
  "/images/home/rak-buku-card.webp",
  "/images/gallery/feb-2025.jpg",
  "/images/home/last-section.webp",
  "/images/achievements/it-graduation.jpg",
  "/images/home/now-bike-card.webp",
  "/images/gallery/mei-2020.jpg",
  "/images/blog/wimcycle-nitro-komuting.jpg",
  "/images/achievements/bp-setup.jpg",
  "/images/gallery/jan-2020.jpg",
  "/images/blog/How-I-Improved-My-Productivity-and-Well-Being-with-Time-Blocking.jpg",
  "/images/achievements/sagioeb2024.jpg",
];

const directionCards = [
  {
    href: "/articles",
    image: placeholderImages[1],
    key: "articles" as const,
  },
  {
    href: "/thoughts",
    image: placeholderImages[2],
    key: "thoughts" as const,
  },
  {
    href: "/now",
    image: placeholderImages[5],
    key: "now" as const,
  },
];

const visualJournal = [
  {
    image: placeholderImages[6],
  },
  {
    image: placeholderImages[7],
  },
  {
    image: placeholderImages[8],
  },
  {
    image: placeholderImages[9],
  },
  {
    image: placeholderImages[10],
  },
];

export default function HomeContent({
  articlesByLocale,
}: Readonly<HomeContentProps>) {
  const { locale, t, localePath } = useLocale();

  const allArticlesData = articlesByLocale[locale];
  const latestPosts = allArticlesData.slice(0, 6);
  const latestLeadPost = latestPosts[0];
  const latestPostCards = latestPosts.slice(1);

  const copy = {
    id: {
      heroTitle: "Hidup, kode, dan perjalanan kecil",
      startExploring: "Mulai jelajahi",
      chooseDirection: "Pilih arah bacaan",
      readMore: "Baca tulisan",
      latestPostsTitle: "Tulisan terbaru",
      aboutTitle: "Suami, bapak, developer, pengendara sepeda, dan pencatat hal kecil.",
      aboutBody:
        "Website ini menjadi tempat menyimpan pelajaran dari kerja, keluarga, teknologi, dan hari-hari biasa yang ternyata tidak biasa-biasa amat.",
      aboutCta: "Kenalan lebih jauh",
    },
    en: {
      heroTitle: "Life, code, and small journeys",
      startExploring: "Start exploring",
      chooseDirection: "Choose a direction",
      readMore: "Read story",
      latestPostsTitle: "Latest posts",
      aboutTitle: "Husband, father, developer, cyclist, and collector of small notes.",
      aboutBody:
        "This site keeps lessons from work, family, technology, and ordinary days that usually turn out less ordinary than expected.",
      aboutCta: "Get to know me",
    },
  }[locale];

  const directionLabels = {
    articles: {
      label: t.nav.articles,
      desc:
        locale === "id"
          ? "Catatan panjang tentang kode, kerja, dan hidup."
          : "Longer notes on code, work, and life.",
    },
    thoughts: {
      label: t.nav.thoughts,
      desc:
        locale === "id"
          ? "Fragmen pendek yang sedang kupikirkan."
          : "Short fragments I am thinking through.",
    },
    now: {
      label: t.nav.now,
      desc:
        locale === "id"
          ? "Apa yang sedang menjadi fokus hari ini."
          : "What has my attention these days.",
    },
  };

  const getArticleImage = (article: ArticleData, index: number) =>
    article.image ?? placeholderImages[(index + 3) % placeholderImages.length];

  return (
    <div className="animate-in">
      <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-brand-dark-bg text-white">
        <Image
          src={placeholderImages[0]}
          alt=""
          fill
          className="object-cover object-center md:object-[center_58%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {copy.heroTitle}
            </h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={localePath("/articles")}
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-text-primary transition hover:bg-brand-tan"
              >
                {copy.startExploring}
              </Link>
              <Link
                href={localePath("/about")}
                className="inline-flex items-center rounded-full border border-white/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                {t.nav.about}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-12 dark:bg-brand-dark-bg sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-brand-text-primary dark:text-brand-dark-text">
                {copy.chooseDirection}
              </h2>
            </div>
            <Link
              href={localePath("/search")}
              className="text-sm font-semibold text-brand-text-secondary transition hover:text-brand-accent dark:text-brand-dark-text/70"
            >
              {locale === "id" ? "Cari arsip" : "Search archive"}
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {directionCards.map(({ href, image, key }) => {
              const { desc } = directionLabels[key];

              return (
                <Link
                  key={href}
                  href={localePath(href)}
                  className="group relative min-h-[280px] overflow-hidden rounded-lg bg-brand-dark-bg"
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="mt-3 max-w-xs font-serif text-xl leading-snug">
                      {desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {latestLeadPost && (
        <section className="bg-white py-14 dark:bg-brand-dark-surface sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-bold text-brand-text-primary dark:text-brand-dark-text">
                {copy.latestPostsTitle}
              </h2>
              <Link
                href={localePath("/articles")}
                className="hidden text-sm font-semibold text-brand-text-secondary transition hover:text-brand-accent dark:text-brand-dark-text/70 sm:inline"
              >
                {t.home.readAll}
              </Link>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <Link
                href={localePath(`/articles/${latestLeadPost.id}`)}
                className="group overflow-hidden rounded-lg bg-brand-cream shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-brand-dark-bg"
              >
                <div className="relative aspect-[16/10] bg-brand-tan">
                  <Image
                    src={getArticleImage(latestLeadPost, 0)}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <time className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-text-secondary dark:text-brand-dark-text/55">
                    {latestLeadPost.date}
                  </time>
                  <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-text-primary group-hover:text-brand-accent dark:text-brand-dark-text sm:text-4xl">
                    {latestLeadPost.title}
                  </h3>
                  {latestLeadPost.description && (
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-brand-text-secondary dark:text-brand-dark-text/70 sm:text-base">
                      {latestLeadPost.description}
                    </p>
                  )}
                </div>
              </Link>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {latestPostCards.map((article, index) => (
                  <Link
                    key={article.id}
                    href={localePath(`/articles/${article.id}`)}
                    className="group grid grid-cols-[120px_1fr] overflow-hidden rounded-lg bg-brand-cream shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-brand-dark-bg sm:grid-cols-1 lg:grid-cols-[150px_1fr]"
                  >
                    <div className="relative min-h-[140px] bg-brand-tan sm:aspect-[4/3] lg:aspect-auto">
                      <Image
                        src={getArticleImage(article, index + 1)}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 150px, (min-width: 640px) 50vw, 120px"
                      />
                    </div>
                    <div className="p-4">
                      <time className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-text-secondary dark:text-brand-dark-text/55">
                        {article.date}
                      </time>
                      <h3 className="mt-2 line-clamp-3 font-serif text-lg leading-snug text-brand-text-primary group-hover:text-brand-accent dark:text-brand-dark-text">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-10 dark:bg-brand-dark-surface sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {visualJournal.map((item, index) => (
              <div
                key={item.image}
                className={`group relative aspect-[3/4] overflow-hidden rounded-lg bg-brand-tan ${
                  index === 1 || index === 3 ? "sm:translate-y-8" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 640px) 20vw, 50vw"
                />
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8f0ee] py-14 dark:bg-brand-dark-bg sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-lg bg-brand-dark-bg lg:mx-0">
            <Image
              src={placeholderImages[3]}
              alt="I Putu Deta Utama Putra"
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-4xl font-bold leading-tight text-brand-text-primary dark:text-brand-dark-text">
              {copy.aboutTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-text-secondary dark:text-brand-dark-text/75">
              {copy.aboutBody}
            </p>
            <Link
              href={localePath("/about")}
              className="mt-8 inline-flex w-fit items-center rounded-full bg-[#f8d45c] px-5 py-3 text-sm font-semibold text-brand-text-primary transition hover:bg-white"
            >
              {copy.aboutCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
