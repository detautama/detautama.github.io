"use client";

import { Link } from "next-view-transitions";
import { useLocale } from "../lib/LocaleContext";
import { OrganicBackground } from "./OrganicBackground";
import { EditorialNav } from "./EditorialNav";
import { EditorialReveal } from "./EditorialReveal";

const nowCopy = {
  id: {
    title: "Sekarang.",
    intro:
      "Catatan hidup yang sedang berlangsung—pekerjaan, hal-hal kecil, dan pertanyaan yang belum selesai.",
    updated: "Diperbarui Juni 2026 · Denpasar, Bali",
    note: "Terinspirasi dari gerakan /now",
    sections: [
      {
        number: "01",
        title: "Sedang mengerjakan",
        items: [
          "React Native untuk aplikasi latihan vokal.",
          "Website perusahaan dengan Next.js.",
          "Menulis lebih konsisten, tidak hanya tentang kode.",
        ],
      },
      {
        number: "02",
        title: "Sedang menikmati",
        items: [
          "Bersepeda pagi di Bali sebelum jalanan ramai.",
          "Momen kecil bersama anakku yang tumbuh lebih cepat dari perkiraan.",
        ],
      },
      {
        number: "03",
        title: "Sedang dipikirkan",
        items: [
          "Cara hadir sepenuhnya untuk keluarga sambil tetap mengerjakan pekerjaan yang aku cintai.",
          "Arti menjadi developer yang baik di era AI—tetap relevan, manusiawi, dan berdampak.",
        ],
      },
    ],
    contact: "Kirim rekomendasi atau sekadar menyapa",
  },
  en: {
    title: "Now.",
    intro:
      "Notes from a life in progress—work, small pleasures, and questions that remain unfinished.",
    updated: "Updated June 2026 · Denpasar, Bali",
    note: "Inspired by the /now movement",
    sections: [
      {
        number: "01",
        title: "Working on",
        items: [
          "A React Native vocal practice application.",
          "A company website built with Next.js.",
          "Writing more consistently, beyond code.",
        ],
      },
      {
        number: "02",
        title: "Enjoying",
        items: [
          "Morning bike rides in Bali before the roads get busy.",
          "Small moments with my child, who keeps growing faster than expected.",
        ],
      },
      {
        number: "03",
        title: "Thinking about",
        items: [
          "How to be fully present for family while still doing work I love.",
          "What it means to be a good developer in the AI era—relevant, human, and meaningful.",
        ],
      },
    ],
    contact: "Send a recommendation or simply say hello",
  },
} as const;

export default function NowContent() {
  const { locale } = useLocale();
  const copy = nowCopy[locale];

  return (
    <div className="nagare-home nagare-editorial-page nagare-now-page">
      <OrganicBackground />
      <EditorialNav />
      <main className="nagare-editorial-main">
        <header className="nagare-editorial-hero">
          <h1>{copy.title}</h1>
          <div className="nagare-editorial-intro">{copy.intro}</div>
          <div className="nagare-now-meta">
            <span>{copy.updated}</span>
            <Link href="https://nownownow.com/about">{copy.note} ↗</Link>
          </div>
        </header>

        <div className="nagare-now-list">
          {copy.sections.map((section) => (
            <EditorialReveal
              className="nagare-now-section"
              key={section.number}
            >
              <span>{section.number}</span>
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </EditorialReveal>
          ))}
        </div>

        <EditorialReveal className="nagare-editorial-contact">
          <h2>{copy.contact}.</h2>
          <div>
            <a href="mailto:detautama11@gmail.com">detautama11@gmail.com ↗</a>
          </div>
        </EditorialReveal>
      </main>
    </div>
  );
}
