"use client";

import { useState } from "react";
import Image from "next/image";

const achievements = [
  {
    title:
      "Led an internal session on 'npm update vs. npm outdated' at Oddbit.",
    image: "/images/achievements/ss-ow-jan.jpg",
    desc: "Shared insights on how to use npm outdated and npm update for better dependency management.",
    year: "2025",
    tags: ["Tech", "Speaking", "Community"],
  },
  {
    title:
      "Led an internal session on 'The Difference Between Functional Testing and Visual Testing' at Oddbit.",
    image: "/images/achievements/dbfv.jpg",
    desc: "Shared insights on the differences between functional testing and visual testing.",
    year: "2025",
    tags: ["Tech", "Speaking", "Community"],
  },
  {
    title: "Speaker at Google I/O extended - Bali 2024",
    image: "/images/achievements/sagioeb2024.jpg",
    desc: "Shared insights on new Transition API in web development.",
    year: "2024",
    tags: ["Speaking", "Tech", "Google I/O", "Community"],
  },
  {
    title: "Speaker at Google I/O extended - Bali 2022",
    image: "/images/achievements/intro-zustand.jpg",
    desc: "Shared insights on Introduction to Zustand.",
    year: "2022",
    tags: ["Speaking", "Tech", "Google I/O", "Community"],
  },
  {
    title: "Setup blueprint POS printer for local store",
    image: "/images/achievements/bp-setup.jpg",
    desc: "Helped local store to setup POS printer for their daily sales.",
    year: "2025",
    tags: ["Tech", "Community"],
  },
  {
    title:
      "2 years as a supervisory board member of Koperasi Serba Usaha Banjar Celuk.",
    image: "/images/achievements/pengawas-ksu-celuk-2025.jpg",
    desc: "Ensured financial transparency, compliance, and efficiency through audits and recommendations.",
    year: "2025",
    tags: ["Community", "Teamwork"],
  },
  {
    title: "Onboarding Senior Developer at Oddbit",
    image: "/images/achievements/onboarding-snr-dev.jpg",
    desc: "Helped onboard a new Senior Developer at Oddbit, ensuring they were comfortable with the team and the project.",
    year: "2025",
    tags: ["Teamwork"],
  },
  {
    title: "Interviewed Senior Developer Candidates at Oddbit",
    image: "/images/achievements/interview-snr-dev.png",
    desc: "Conducted technical interviews for Senior Developer candidates to ensure alignment with team and project needs.",
    year: "2025",
    tags: ["Tech", "Teamwork", "Hiring"],
  },
  {
    title: "Bachelor's Degree in Information Technology",
    image: "/images/achievements/it-graduation.jpg",
    desc: "Earned a Bachelor's Degree in Information Technology from STIKI Indonesia, graduating as the top student in 2019 with a GPA of 3.94.",
    year: "2019",
    tags: ["Education", "Tech"],
  },
].sort((a, b) => b.year.localeCompare(a.year));

export default function AchievementsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredAchievements = achievements.filter((ach) =>
    selectedTags.length === 0
      ? true
      : ach.tags.some((tag) => selectedTags.includes(tag))
  );

  const allTags = Array.from(new Set(achievements.flatMap((ach) => ach.tags)));

  return (
    <div className="min-h-screen bg-transparent p-6">
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        My Achievements
      </h1>
      <div className="mb-5" />
      <p className="text-center md:text-left">
        {`List of my achievements that I've done in the past. I'm proud of these as they
        have helped me grow and learn new things.`}
      </p>
      <div className="mb-5" />
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {allTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => toggleTag(tag)}
            className={`rounded-full px-3 py-1 text-xs ${
              selectedTags.includes(tag)
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-900"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
        {filteredAchievements.map((ach) => (
          <div
            key={ach.title}
            className="flex flex-col justify-between rounded-2xl border border-white p-4 shadow-lg"
          >
            <div>
              <div className="relative h-40 w-full">
                <Image
                  src={ach.image}
                  alt={ach.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{ach.title}</h2>
              <p className="mt-2">{ach.desc}</p>
              <p className="mt-2 text-sm">{ach.year}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {ach.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-900"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
