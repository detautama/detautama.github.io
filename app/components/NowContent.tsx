"use client";

import { Link } from "next-view-transitions";
import { useLocale } from "../lib/LocaleContext";
import { EditorialReveal } from "./EditorialReveal";
import { SmallWebShell } from "./SmallWebShell";

const nowCopy = {
  id: {
    title: "Sekarang.",
    intro:
      "Catatan hidup yang sedang berlangsung—pekerjaan, hal-hal kecil, dan pertanyaan yang belum selesai.",
    updated: "Diperbarui Juni 2026 · Denpasar, Bali",
    note: "Terinspirasi dari gerakan /now",
    sectionNote: "Potongan hidup yang sedang berjalan",
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
    contactNote: "Kotak suratku selalu terbuka",
  },
  en: {
    title: "Now.",
    intro:
      "Notes from a life in progress—work, small pleasures, and questions that remain unfinished.",
    updated: "Updated June 2026 · Denpasar, Bali",
    note: "Inspired by the /now movement",
    sectionNote: "Fragments from a life in progress",
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
    contactNote: "My mailbox is always open",
  },
} as const;

export default function NowContent() {
  const { locale } = useLocale();
  const copy = nowCopy[locale];

  return (
    <SmallWebShell activeSection="now" contentClassName="small-web-now-content">
      <header className="small-web-page-header">
        <h1>{copy.title}</h1>
        <div className="small-web-rule" />
        <div className="small-web-page-intro">
          <p>{copy.intro}</p>
          <span>{copy.updated}</span>
        </div>
        <div className="small-web-archive-actions small-web-now-actions">
          <Link href="https://nownownow.com/about">↗ {copy.note}</Link>
        </div>
      </header>

      <section className="small-web-section">
        <header className="small-web-section-heading">
          <div>
            <span className="small-web-section-icon" aria-hidden="true">
              ◷
            </span>
            <div>
              <h2>{copy.title}</h2>
              <p>{copy.sectionNote}</p>
            </div>
          </div>
        </header>

        <div className="small-web-journal-list">
          {copy.sections.map((section) => (
            <EditorialReveal
              className="small-web-journal-card"
              key={section.number}
            >
              <span className="small-web-journal-number">{section.number}</span>
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </EditorialReveal>
          ))}
        </div>
      </section>

      <EditorialReveal className="small-web-contact-card">
        <span className="small-web-contact-icon" aria-hidden="true">
          ✉
        </span>
        <div>
          <p className="small-web-box-kicker">{copy.contactNote}</p>
          <h2>{copy.contact}</h2>
          <a href="mailto:detautama11@gmail.com">detautama11@gmail.com ↗</a>
        </div>
      </EditorialReveal>
    </SmallWebShell>
  );
}
