"use client";

import React from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";
import { ToggleDarkMode } from "../ToggleDarkMode";

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

const HERO_IMAGE_DARK = "/images/home/gunung-sunrise-hero-dark.webp";

const CYCLING_STREAK_DAYS = 55;
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

export default function HomeContent({
  articlesByLocale,
}: Readonly<HomeContentProps>) {
  const { locale, t, localePath } = useLocale();

  const allArticlesData = articlesByLocale[locale];
  const latestPosts = allArticlesData.slice(0, 6);

  const copy = {
    id: {
      heroTitle: "Hidup, kode, dan perjalanan kecil",
      startExploring: "Mulai jelajahi",
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
      calcNote: `Kalori dihitung dari ${CYCLING_CALORIES_PER_KM} kkal/km, CO₂ dari ${CYCLING_CO2_GRAMS_PER_KM} g/km (rata-rata emisi motor bensin) yang tidak jadi dikeluarkan, dikali total jarak.`,
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
      calcNote: `Calories are calculated at ${CYCLING_CALORIES_PER_KM} kcal/km, CO₂ at ${CYCLING_CO2_GRAMS_PER_KM} g/km (average gas-motorbike emissions) avoided, multiplied by total distance.`,
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


  const getArticleImage = (article: ArticleData, index: number) =>
    article.image ?? placeholderImages[(index + 3) % placeholderImages.length];

  return (
    <div className="animate-in">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="relative isolate aspect-[21/9] overflow-hidden rounded-2xl bg-brand-dark-bg sm:aspect-[3/1]">
          <div className="absolute right-3 top-3 z-10">
            <ToggleDarkMode />
          </div>
          <Image
            src={placeholderImages[0]}
            alt=""
            fill
            className="object-cover object-center opacity-100 transition-opacity duration-700 dark:opacity-0"
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
          <Image
            src={HERO_IMAGE_DARK}
            alt=""
            fill
            className="object-cover object-center opacity-0 transition-opacity duration-700 dark:opacity-100"
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
        </div>

        <div className="mt-6 max-w-2xl">
          <h1 className="font-display text-2xl font-bold leading-tight text-brand-text-primary dark:text-brand-dark-text sm:text-3xl md:text-4xl">
            {copy.heroTitle}
          </h1>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-3">
            <Link
              href={localePath("/articles")}
              className="inline-flex items-center rounded-full bg-brand-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-opacity-90 sm:px-5 sm:py-3 sm:text-sm"
            >
              {copy.startExploring}
            </Link>
            <Link
              href={localePath("/about")}
              className="inline-flex items-center rounded-full border border-brand-tan px-4 py-2 text-xs font-semibold text-brand-text-primary transition hover:bg-brand-tan dark:border-brand-dark-border dark:text-brand-dark-text dark:hover:bg-brand-dark-surface sm:px-5 sm:py-3 sm:text-sm"
            >
              {t.nav.about}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold sm:ml-auto sm:gap-x-6 sm:text-sm">
            <Link
              href={localePath("/articles")}
              className="text-brand-text-secondary transition hover:text-brand-accent dark:text-brand-dark-text/70"
            >
              {t.nav.articles}
            </Link>
            <Link
              href={localePath("/now")}
              className="text-brand-text-secondary transition hover:text-brand-accent dark:text-brand-dark-text/70"
            >
              {t.nav.now}
            </Link>
            <Link
              href={localePath("/search")}
              className="text-brand-text-secondary transition hover:text-brand-accent dark:text-brand-dark-text/70"
            >
              {locale === "id" ? "Cari arsip" : "Search archive"}
            </Link>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="bg-white py-14 dark:bg-brand-dark-surface sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <h2 className="font-display text-2xl font-bold text-brand-text-primary dark:text-brand-dark-text sm:text-3xl">
                {copy.latestPostsTitle}
              </h2>
              <Link
                href={localePath("/articles")}
                className="text-sm font-semibold text-brand-text-secondary transition hover:text-brand-accent dark:text-brand-dark-text/70"
              >
                {t.home.readAll}
              </Link>
            </div>

            <div className="divide-y divide-brand-tan dark:divide-brand-dark-border">
              {latestPosts.map((article, index) => (
                <Link
                  key={article.id}
                  href={localePath(`/articles/${article.id}`)}
                  className="group flex items-center gap-4 py-4 first:pt-0"
                >
                  <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-brand-tan sm:block dark:bg-brand-dark-surface">
                    <Image
                      src={getArticleImage(article, index)}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <time className="text-xs text-brand-text-secondary dark:text-brand-dark-text/60">
                      {article.date}
                    </time>
                    <h3 className="font-display text-lg font-semibold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="font-serif text-sm text-brand-text-secondary dark:text-brand-dark-text/70">
                        {article.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <br />
            {cyclingCopy.calcNote}
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
