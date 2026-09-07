"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { useLocale } from "../lib/LocaleContext";
import { EditorialReveal } from "./EditorialReveal";
import { SmallWebShell } from "./SmallWebShell";

const copy = {
  id: {
    title: "Manusia di balik layar.",
    intro:
      "Aku Deta—web developer, suami, ayah, dan seseorang yang terus belajar menemukan keseimbangan di Bali.",
    imageAlt: "Deta di Bali",
    storyTitle: "Menulis untuk memahami.",
    story: [
      "Blog ini lahir dari kebutuhan sederhana: tempat untuk menata pikiran. Bagiku, menulis bukan hanya cara berbagi, tetapi cara memahami—entah itu baris kode yang rumit, seni menjadi orang tua, atau refleksi dari kayuhan sepeda pagi.",
      "Sebagian besar hariku ditemani TypeScript dan React. Di luar terminal, aku tertarik pada produktivitas yang sehat, kesehatan mental di tempat kerja, dan Stoikisme yang membantu menjaga perspektif.",
    ],
    lifeTitle: "Hadir untuk hal yang penting.",
    life: [
      "Menjadi ayah mengubah caraku melihat work-life integrity. Aku semakin percaya bahwa pekerjaan yang baik seharusnya memberi ruang untuk benar-benar hadir bersama keluarga.",
      "Aku lulus sebagai lulusan terbaik STIKI Indonesia pada 2019. Rasa penasaran pada programming dimulai sejak SMA ketika mencoba membuat game Pac-Man sederhana—dan belum berhenti sejak itu.",
    ],
    bali: "Kalau kamu ke Bali, cobalah lawar—campuran sayuran, kelapa, dan rempah yang selalu terasa seperti rumah.",
    contactTitle: "Punya cerita untuk dibagikan?",
    contactBody:
      "Aku selalu senang berbicara tentang teknologi, menjadi orang tua, bersepeda, atau kehidupan di Bali.",
    contact: "Kirim email",
    portraitNote: "Sebuah wajah dari Bali",
  },
  en: {
    title: "The human behind the screen.",
    intro:
      "I’m Deta—a web developer, husband, father, and someone continually learning to find balance in Bali.",
    imageAlt: "Deta in Bali",
    storyTitle: "Writing to understand.",
    story: [
      "This blog began with a simple need: a place to arrange my thoughts. Writing is not only how I share, but how I understand—whether it is a complex line of code, the art of parenting, or a reflection from a morning bike ride.",
      "Most of my days involve TypeScript and React. Away from the terminal, I care about healthy productivity, mental health at work, and Stoicism as a way to keep perspective.",
    ],
    lifeTitle: "Being present for what matters.",
    life: [
      "Becoming a father changed how I see work-life integrity. I increasingly believe that good work should leave room to be genuinely present with family.",
      "I graduated as STIKI Indonesia’s valedictorian in 2019. My curiosity for programming began in high school with an attempt to build a small Pac-Man game—and it has not stopped since.",
    ],
    bali: "If you visit Bali, try lawar—a mix of vegetables, coconut, and spices that always tastes like home.",
    contactTitle: "Have a story to share?",
    contactBody:
      "I’m always happy to talk about technology, parenting, cycling, or life in Bali.",
    contact: "Send an email",
    portraitNote: "A face from Bali",
  },
} as const;

export default function AboutContent() {
  const { locale } = useLocale();
  const content = copy[locale];

  return (
    <SmallWebShell
      activeSection="about"
      contentClassName="small-web-about-content"
    >
      <header className="small-web-page-header">
        <h1>{content.title}</h1>
        <div className="small-web-rule" />
        <div className="small-web-page-intro">
          <p>{content.intro}</p>
          <span>Denpasar · UTC+8</span>
        </div>
      </header>

      <EditorialReveal className="small-web-about-portrait">
        <div>
          <Image
            src="/about.jpg"
            alt={content.imageAlt}
            width={1400}
            height={800}
            priority
          />
          <span>{content.portraitNote} · Bali, Indonesia</span>
        </div>
      </EditorialReveal>

      <div className="small-web-about-stories">
        <EditorialReveal className="small-web-story-card">
          <div className="small-web-story-heading">
            <span aria-hidden="true">01</span>
            <h2>{content.storyTitle}</h2>
          </div>
          <div className="small-web-story-copy">
            {content.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </EditorialReveal>

        <EditorialReveal className="small-web-story-card">
          <div className="small-web-story-heading">
            <span aria-hidden="true">02</span>
            <h2>{content.lifeTitle}</h2>
          </div>
          <div className="small-web-story-copy">
            {content.life.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              {content.bali}{" "}
              <Link
                href={
                  locale === "id"
                    ? "https://id.wikipedia.org/wiki/Lawar"
                    : "https://en.wikipedia.org/wiki/Lawar"
                }
              >
                {locale === "id" ? "Tentang lawar ↗" : "About lawar ↗"}
              </Link>
            </p>
          </div>
        </EditorialReveal>
      </div>

      <EditorialReveal className="small-web-contact-card">
        <span className="small-web-contact-icon" aria-hidden="true">
          ✉
        </span>
        <div>
          <p className="small-web-box-kicker">{content.contactTitle}</p>
          <h2>{content.contactBody}</h2>
          <a href="mailto:detautama11@gmail.com">{content.contact} ↗</a>
        </div>
      </EditorialReveal>
    </SmallWebShell>
  );
}
