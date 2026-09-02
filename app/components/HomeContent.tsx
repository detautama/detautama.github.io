"use client";

import { useEffect } from "react";
import { Link } from "next-view-transitions";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";
import { LanguageToggle } from "./LanguageToggle";
import { ToggleDarkMode } from "../ToggleDarkMode";
import { OrganicBackground } from "./OrganicBackground";

interface HomeContentProps {
  readonly articlesByLocale: {
    readonly id: ArticleData[];
    readonly en: ArticleData[];
  };
}

const profileCopy = {
  id: {
    greeting: "Halo, aku",
    name: "Deta.",
    intro: (
      <>
        Seorang developer, suami, ayah, dan pesepeda yang menulis tentang
        <em> teknologi</em>, <em>kehidupan</em>, dan hal-hal kecil di antaranya.
      </>
    ),
    aboutTitle: "Membuat sesuatu, lalu mencatat apa yang kupelajari.",
    aboutBody: [
      "Aku tinggal di Bali dan menghabiskan banyak waktu membangun produk web dengan TypeScript dan React. Blog ini adalah tempatku memperlambat pikiran—untuk memahami pekerjaan, keluarga, kesehatan mental, dan hidup sehari-hari dengan lebih jernih.",
      "Ketika tidak di depan layar, biasanya aku sedang bersepeda, menghabiskan waktu bersama keluarga, atau memikirkan kenapa hal sederhana sering memberi pelajaran paling panjang.",
    ],
    aboutCta: "Lebih jauh tentang aku",
    writingTitle: "Catatan dari perjalanan.",
    writingCta: "Lihat semua tulisan",
    nowTitle: "Apa yang sedang berjalan.",
    nowBody:
      "Membangun aplikasi, terus belajar menjadi ayah yang hadir, dan membuktikan bahwa perjalanan 12 km ke kantor tidak selalu membutuhkan motor.",
    nowCta: "Baca halaman sekarang",
    connectTitle: "Mari bertukar cerita.",
    connectBody:
      "Punya ide, pertanyaan, rekomendasi jalur sepeda, atau sekadar ingin menyapa? Kotak masukku selalu terbuka.",
    email: "Kirim email",
    scroll: "Gulir untuk menjelajah",
  },
  en: {
    greeting: "Hello, I’m",
    name: "Deta.",
    intro: (
      <>
        A developer, husband, father, and cyclist writing about
        <em> technology</em>, <em>life</em>, and the small things in between.
      </>
    ),
    aboutTitle: "Making things, then writing down what they teach me.",
    aboutBody: [
      "I live in Bali and spend much of my time building web products with TypeScript and React. This blog is where I slow my thoughts down—to understand work, family, mental health, and everyday life with a little more clarity.",
      "Away from the screen, I am usually cycling, spending time with my family, or wondering why the simplest moments often leave the longest lessons.",
    ],
    aboutCta: "More about me",
    writingTitle: "Notes from the journey.",
    writingCta: "Explore all writing",
    nowTitle: "What is in motion.",
    nowBody:
      "Building apps, learning to be a present father, and proving that a 12 km commute does not always require a motorbike.",
    nowCta: "Read the now page",
    connectTitle: "Let’s exchange stories.",
    connectBody:
      "Have an idea, a question, a cycling route recommendation, or simply want to say hello? My inbox is always open.",
    email: "Send an email",
    scroll: "Scroll to explore",
  },
} as const;

export default function HomeContent({
  articlesByLocale,
}: Readonly<HomeContentProps>) {
  const { locale, t, localePath } = useLocale();
  const copy = profileCopy[locale];
  const latestPosts = articlesByLocale[locale].slice(0, 4);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".nagare-section")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.6,
        rootMargin: "0px",
      }
    );

    for (const section of sections) {
      section.classList.add("nagare-reveal-ready");
    }

    const frame = requestAnimationFrame(() => {
      for (const section of sections) observer.observe(section);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="nagare-home">
      <OrganicBackground />

      <nav className="nagare-nav" aria-label="Homepage navigation">
        <Link href={localePath("/")} className="nagare-mark">
          DU
        </Link>
        <div className="nagare-nav-links">
          <Link href={localePath("/articles")}>{t.nav.articles}</Link>
          <Link href={localePath("/now")}>{t.nav.now}</Link>
          <Link href={localePath("/about")}>{t.nav.about}</Link>
          <LanguageToggle />
          <ToggleDarkMode />
        </div>
      </nav>

      <main className="nagare-main">
        <section className="nagare-hero">
          <div className="nagare-hero-copy">
            <p className="nagare-greeting">{copy.greeting}</p>
            <h1>{copy.name}</h1>
            <p className="nagare-intro">{copy.intro}</p>
          </div>
          <a href="#about" className="nagare-scroll-indicator">
            <span>{copy.scroll}</span>
            <i />
          </a>
        </section>

        <section id="about" className="nagare-section">
          <div className="nagare-section-heading">
            <h2>{copy.aboutTitle}</h2>
          </div>
          <div className="nagare-section-content nagare-copy-block">
            {copy.aboutBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link href={localePath("/about")} className="nagare-text-link">
              {copy.aboutCta} <span>↗</span>
            </Link>
          </div>
        </section>

        <section className="nagare-section">
          <div className="nagare-section-heading">
            <h2>{copy.writingTitle}</h2>
          </div>
          <div className="nagare-section-content">
            <div className="nagare-post-list">
              {latestPosts.map((article, index) => (
                <Link
                  key={article.id}
                  href={localePath(`/articles/${article.id}`)}
                  className="nagare-post-row"
                >
                  <span className="nagare-post-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="nagare-post-copy">
                    <span className="nagare-post-meta">
                      {article.date} · {article.tags.slice(0, 2).join(" / ")}
                    </span>
                    <strong>{article.title}</strong>
                    <span>{article.description}</span>
                  </span>
                  <span className="nagare-post-arrow">↗</span>
                </Link>
              ))}
            </div>
            <Link href={localePath("/articles")} className="nagare-text-link">
              {copy.writingCta} <span>↗</span>
            </Link>
          </div>
        </section>

        <section className="nagare-section nagare-now-section">
          <div className="nagare-section-heading">
            <h2>{copy.nowTitle}</h2>
          </div>
          <div className="nagare-section-content nagare-now-content">
            <p>{copy.nowBody}</p>
            <div className="nagare-now-metrics">
              <span>
                <strong>12</strong> km / trip
              </span>
              <span>
                <strong>60</strong> cycling days
              </span>
              <span>
                <strong>01</strong> growing family
              </span>
            </div>
            <Link href={localePath("/now")} className="nagare-text-link">
              {copy.nowCta} <span>↗</span>
            </Link>
          </div>
        </section>

        <section className="nagare-section nagare-connect-section">
          <div className="nagare-section-heading">
            <h2>{copy.connectTitle}</h2>
          </div>
          <div className="nagare-section-content nagare-connect-content">
            <p>{copy.connectBody}</p>
            <a
              href="mailto:detautama11@gmail.com"
              className="nagare-email-link"
            >
              {copy.email} <span>↗</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
