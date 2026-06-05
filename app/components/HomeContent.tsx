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

const sections = [
  {
    href: "/articles",
    emoji: "✍️",
    key: "tulisan" as const,
  },
  {
    href: "/thoughts",
    emoji: "💭",
    key: "thoughts" as const,
  },
  {
    href: "/now",
    emoji: "⏳",
    key: "now" as const,
  },
  {
    href: "/about",
    emoji: "🪴",
    key: "about" as const,
  },
];

export default function HomeContent({ articlesByLocale }: Readonly<HomeContentProps>) {
  const { locale, t, localePath } = useLocale();

  const allArticlesData = articlesByLocale[locale];
  const latestThree = allArticlesData.slice(0, 3);

  const sectionLabels = {
    tulisan: {
      label: t.nav.articles,
      desc: locale === "id" ? "Catatan dari perjalanan hidup dan pekerjaan." : "Notes from life and work.",
    },
    thoughts: {
      label: t.nav.thoughts,
      desc: locale === "id" ? "Opini singkat. Dipikirkan, tapi tidak berlebihan." : "Short opinions. Considered, not over-thought.",
    },
    now: {
      label: t.nav.now,
      desc: locale === "id" ? "Apa yang sedang aku jalani hari ini." : "What I'm doing right now.",
    },
    about: {
      label: t.nav.about,
      desc: locale === "id" ? "Siapa aku di balik layar dan kode." : "Who I am beyond the screen and code.",
    },
  };

  return (
    <div className="brand-container animate-in py-12 md:py-20">
      {/* Hero */}
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-8">
          <Image
            src="/deta.png"
            alt="I Putu Deta Utama Putra"
            width={160}
            height={160}
            className="rounded-full ring-[5px] ring-brand-tan shadow-lg dark:ring-brand-dark-border"
            priority
          />
        </div>
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-brand-text-primary dark:text-brand-dark-text sm:text-5xl">
          {t.home.greeting}
        </h1>
        <p className="max-w-xl font-serif text-lg leading-relaxed text-brand-text-secondary dark:text-brand-dark-text/75">
          {t.home.tagline}
        </p>
      </div>

      {/* Section Cards */}
      <div className="mb-16 grid grid-cols-2 gap-4">
        {sections.map(({ href, emoji, key }) => {
          const { label, desc } = sectionLabels[key];
          return (
            <Link
              key={href}
              href={localePath(href)}
              className="group flex flex-col rounded-2xl border border-brand-tan bg-white p-5 transition-all duration-200 hover:border-brand-forest/30 hover:shadow-md dark:border-brand-dark-border dark:bg-brand-dark-surface dark:hover:border-brand-accent/30"
            >
              <span className="mb-3 text-2xl">{emoji}</span>
              <span className="mb-1 font-display font-semibold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                {label}
              </span>
              <span className="text-sm leading-snug text-brand-text-secondary dark:text-brand-dark-text/60">
                {desc}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Latest Writing Teaser */}
      {latestThree.length > 0 && (
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-brand-text-secondary dark:text-brand-dark-text/50">
            {t.home.latestArticles}
          </p>
          <div className="space-y-4">
            {latestThree.map(({ id, title, date }) => (
              <Link
                key={id}
                href={localePath(`/articles/${id}`)}
                className="group flex items-baseline justify-between gap-4 border-b border-brand-tan pb-4 last:border-0 dark:border-brand-dark-border"
              >
                <span className="font-serif text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                  {title}
                </span>
                <time className="shrink-0 text-xs text-brand-text-secondary dark:text-brand-dark-text/50">
                  {date}
                </time>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href={localePath("/articles")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent transition-colors hover:text-brand-forest dark:hover:text-brand-accent/80"
            >
              {t.home.readAll}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
