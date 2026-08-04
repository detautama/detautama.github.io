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

type IconProps = { className?: string };

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconBike({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M5.5 17.5 10 8h4l4.5 9.5" />
      <path d="M10 8l3 5.5h5.5" />
      <path d="M12.5 5.5h2.5l1 2.5" />
    </svg>
  );
}

function IconMapPin({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M12 21s7-7.58 7-12a7 7 0 10-14 0c0 4.42 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function IconRepeat({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11V9a4 4 0 014-4h14" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  );
}

function IconFlame({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M12 22c4 0 6.5-2.7 6.5-6.2 0-2.6-1.5-4-2.6-5.4-.4 1.6-1.2 2.4-2 2.9.3-2.7-.7-5.7-3.1-7.3.4 2-.1 3.6-1.4 5C7.8 12.5 6.5 14 6.5 16.3 6.5 19.4 9 22 12 22z" />
    </svg>
  );
}

function IconLeaf({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M5 21c0-9.4 6.6-16 16-16 0 9.4-6.6 16-16 16z" />
      <path d="M5 21c3-3.5 6-6.5 11-11.5" />
    </svg>
  );
}

function IconHome({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v10h12V10" />
    </svg>
  );
}

function IconBuilding({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
      <path d="M10 21v-4h4v4" />
    </svg>
  );
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

const CYCLING_STREAK_DAYS = 43;
const CYCLING_ONE_WAY_KM = 12;
const CYCLING_DAILY_KM = CYCLING_ONE_WAY_KM * 2;
const CYCLING_TOTAL_KM = CYCLING_STREAK_DAYS * CYCLING_DAILY_KM;
const CYCLING_CALORIES_PER_KM = 35;
const CYCLING_TOTAL_CALORIES = CYCLING_TOTAL_KM * CYCLING_CALORIES_PER_KM;
const CYCLING_CO2_GRAMS_PER_KM = 120;
const CYCLING_TOTAL_CO2_KG = Math.round(
  (CYCLING_TOTAL_KM * CYCLING_CO2_GRAMS_PER_KM) / 1000
);
const CYCLING_MILESTONES = [7, 30, 50, 100, 200, 365];
const CYCLING_NEXT_MILESTONE =
  CYCLING_MILESTONES.find((m) => m > CYCLING_STREAK_DAYS) ??
  CYCLING_STREAK_DAYS + 50;
const CYCLING_MILESTONE_PROGRESS = Math.round(
  (CYCLING_STREAK_DAYS / CYCLING_NEXT_MILESTONE) * 100
);

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

  const cyclingCopy = {
    id: {
      eyebrow: "Statistik Personal",
      title: `${CYCLING_STREAK_DAYS} Hari Bersepeda ke Kantor`,
      body: "12 km dari rumah ke kantor itu jarak yang biasanya orang otomatis naik motor. Aku mau buktiin nggak harus selalu begitu — sepeda juga bisa, asal mau mulai dan dijalanin tiap hari. Nggak perlu road bike, sepeda ibu-ibu atau sepeda jadulku dari zaman SMP juga cukup.",
      home: "Rumah",
      office: "Kantor",
      milestoneLabel: `Menuju ${CYCLING_NEXT_MILESTONE} hari beruntun`,
      disclaimer:
        "Angka kalori dan CO₂ adalah estimasi kasar, bukan hasil pengukuran presisi.",
      stats: [
        {
          label: "Total Jarak",
          value: CYCLING_TOTAL_KM.toLocaleString("id-ID"),
          unit: "km",
          Icon: IconMapPin,
        },
        {
          label: "Jarak Harian",
          value: CYCLING_DAILY_KM,
          unit: "km",
          Icon: IconRepeat,
        },
        {
          label: "Estimasi Kalori",
          value: CYCLING_TOTAL_CALORIES.toLocaleString("id-ID"),
          unit: "kkal",
          Icon: IconFlame,
        },
        {
          label: "CO₂ Dihemat",
          value: CYCLING_TOTAL_CO2_KG.toLocaleString("id-ID"),
          unit: "kg",
          Icon: IconLeaf,
        },
      ],
    },
    en: {
      eyebrow: "Personal Stats",
      title: `${CYCLING_STREAK_DAYS} Days Cycling to the Office`,
      body: "12 km from home to the office is the kind of distance most people just hop on a motorbike for. I wanted to prove it doesn't have to be that way — a bike works too, if you just start and keep it up every day. No need for a road bike either, a city bike or even my old bike from middle school does the job.",
      home: "Home",
      office: "Office",
      milestoneLabel: `Toward a ${CYCLING_NEXT_MILESTONE}-day streak`,
      disclaimer:
        "Calorie and CO₂ figures are rough estimates, not precise measurements.",
      stats: [
        {
          label: "Total Distance",
          value: CYCLING_TOTAL_KM.toLocaleString("en-US"),
          unit: "km",
          Icon: IconMapPin,
        },
        {
          label: "Daily Distance",
          value: CYCLING_DAILY_KM,
          unit: "km",
          Icon: IconRepeat,
        },
        {
          label: "Est. Calories",
          value: CYCLING_TOTAL_CALORIES.toLocaleString("en-US"),
          unit: "kcal",
          Icon: IconFlame,
        },
        {
          label: "CO₂ Saved",
          value: CYCLING_TOTAL_CO2_KG.toLocaleString("en-US"),
          unit: "kg",
          Icon: IconLeaf,
        },
      ],
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

      <section
        id="bersepeda"
        className="bg-brand-cream py-14 dark:bg-brand-dark-bg sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="brand-badge inline-flex items-center gap-1.5">
                <IconBike className="h-3.5 w-3.5" />
                {cyclingCopy.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-brand-text-primary dark:text-brand-dark-text sm:text-4xl">
                {cyclingCopy.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-text-secondary dark:text-brand-dark-text/70">
                {cyclingCopy.body}
              </p>

              <div className="mt-6 flex items-center gap-3 text-sm text-brand-text-secondary dark:text-brand-dark-text/70">
                <span className="flex items-center gap-1.5">
                  <IconHome className="h-5 w-5 text-brand-forest dark:text-brand-accent" />
                  {cyclingCopy.home}
                </span>
                <span className="relative flex-1 border-t-2 border-dashed border-brand-forest/40 dark:border-brand-accent/40">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-cream px-2 text-xs font-semibold text-brand-forest dark:bg-brand-dark-bg dark:text-brand-accent">
                    {CYCLING_ONE_WAY_KM} km
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconBuilding className="h-5 w-5 text-brand-forest dark:text-brand-accent" />
                  {cyclingCopy.office}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-wide text-brand-text-secondary dark:text-brand-dark-text/60">
                  <span>{cyclingCopy.milestoneLabel}</span>
                  <span>
                    {CYCLING_STREAK_DAYS}/{CYCLING_NEXT_MILESTONE}
                  </span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/70 dark:bg-brand-dark-surface">
                  <div
                    className="h-full rounded-full bg-brand-forest transition-all duration-500 dark:bg-brand-accent"
                    style={{ width: `${CYCLING_MILESTONE_PROGRESS}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cyclingCopy.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-white p-5 shadow-sm dark:bg-brand-dark-surface"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-tan text-brand-forest dark:bg-brand-dark-bg dark:text-brand-accent">
                    <stat.Icon className="h-5 w-5" />
                  </span>
                  <div
                    className="mt-2 text-2xl font-bold text-brand-text-primary dark:text-brand-dark-text"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {stat.value}
                    <span className="ml-1 text-sm font-medium text-brand-text-secondary dark:text-brand-dark-text/60">
                      {stat.unit}
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-brand-text-primary dark:text-brand-dark-text">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-brand-text-secondary dark:text-brand-dark-text/50">
            {cyclingCopy.disclaimer}
          </p>
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
