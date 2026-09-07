"use client";

import { Link } from "next-view-transitions";
import { ArticleData } from "../lib/articles";
import { useLocale } from "../lib/LocaleContext";
import { SmallWebShell } from "./SmallWebShell";

interface HomeContentProps {
  readonly articlesByLocale: {
    readonly id: ArticleData[];
    readonly en: ArticleData[];
  };
}

const profileCopy = {
  id: {
    title: "Halo, aku Deta!",
    intro:
      "Developer, suami, ayah, dan pesepeda dari Bali. Di sini aku merawat catatan tentang teknologi, kehidupan, dan hal-hal kecil di antaranya.",
    noteTitle: "Tentang tempat ini",
    noteBody:
      "Blog ini adalah rumah digital yang kubangun sendiri—tanpa algoritma, tanpa infinite scroll, dan tanpa tuntutan untuk selalu terlihat sibuk.",
    noteCta: "Kenalan lebih jauh",
    latest: "Catatan terbaru",
    allWriting: "Buka semua tulisan",
    nowTitle: "Sedang apa sekarang?",
    nowBody:
      "Membangun aplikasi, belajar menjadi ayah yang hadir, dan menikmati perjalanan 12 km ke kantor dengan sepeda.",
    nowCta: "Baca halaman sekarang",
    deskTitle: "Di atas mejaku",
    deskItems: ["React Native", "Kotlin", "Tailwind CSS"],
    shoutTitle: "Kotak pesan",
    shoutBody:
      "Punya ide, rekomendasi jalur sepeda, atau sekadar ingin menyapa?",
    shoutCta: "Kirim surat elektronik",
  },
  en: {
    title: "Hello, I’m Deta!",
    intro:
      "A developer, husband, father, and cyclist from Bali. This is where I keep notes about technology, life, and the small things in between.",
    noteTitle: "About this place",
    noteBody:
      "This blog is a digital home I built myself—without algorithms, infinite scroll, or the pressure to always look busy.",
    noteCta: "Get to know me",
    latest: "Latest notes",
    allWriting: "Open the full archive",
    nowTitle: "What is happening now?",
    nowBody:
      "Building apps, learning to be a present father, and enjoying the 12 km ride to work on my bicycle.",
    nowCta: "Read the now page",
    deskTitle: "On my desk",
    deskItems: ["React Native", "Kotlin", "Tailwind CSS"],
    shoutTitle: "Message box",
    shoutBody: "Have an idea, a cycling route, or simply want to say hello?",
    shoutCta: "Send electronic mail",
  },
} as const;

export default function HomeContent({
  articlesByLocale,
}: Readonly<HomeContentProps>) {
  const { locale, localePath } = useLocale();
  const copy = profileCopy[locale];
  const latestPosts = articlesByLocale[locale].slice(0, 4);

  return (
    <SmallWebShell activeSection="home">
      <section className="small-web-welcome">
        <h1>{copy.title}</h1>
        <div className="small-web-rule" />
        <div className="small-web-intro-grid">
          <p className="small-web-lead">{copy.intro}</p>
          <div className="small-web-note">
            <span aria-hidden="true">☼</span>
            <div>
              <h2>{copy.noteTitle}</h2>
              <p>{copy.noteBody}</p>
              <Link href={localePath("/about")}>{copy.noteCta} →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="small-web-section">
        <header className="small-web-section-heading">
          <div>
            <span className="small-web-section-icon" aria-hidden="true">
              ✎
            </span>
            <div>
              <h2>{copy.latest}</h2>
            </div>
          </div>
          <Link href={localePath("/articles")}>{copy.allWriting} →</Link>
        </header>

        <div className="small-web-posts">
          {latestPosts.map((article, index) => (
            <Link
              key={article.id}
              href={localePath(`/articles/${article.id}`)}
              className="small-web-post"
            >
              <span className="small-web-post-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="small-web-post-copy">
                <span>
                  {article.date} · {article.tags.slice(0, 2).join(" / ")}
                </span>
                <strong>{article.title}</strong>
                <small>{article.description}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="small-web-bottom-grid">
        <article className="small-web-box small-web-now-box">
          <span className="small-web-box-tape" aria-hidden="true" />
          <p className="small-web-box-kicker">/now</p>
          <h2>{copy.nowTitle}</h2>
          <p>{copy.nowBody}</p>
          <Link href={localePath("/now")}>{copy.nowCta} →</Link>
        </article>

        <article className="small-web-box small-web-desk-box">
          <p className="small-web-box-kicker">desk.log</p>
          <h2>{copy.deskTitle}</h2>
          <ul>
            {copy.deskItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="small-web-box small-web-message-box">
          <span aria-hidden="true" className="small-web-envelope">
            ✉
          </span>
          <h2>{copy.shoutTitle}</h2>
          <p>{copy.shoutBody}</p>
          <a href="mailto:detautama11@gmail.com">{copy.shoutCta} →</a>
        </article>
      </section>
    </SmallWebShell>
  );
}
