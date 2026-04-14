"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "../lib/LocaleContext";

export default function AboutContent() {
  const { locale } = useLocale();

  if (locale === "en") {
    return (
      <div className="animate-in font-serif text-lg leading-relaxed text-brand-text-primary dark:text-brand-dark-text">
        <h1 className="mb-8 font-display text-4xl font-bold text-brand-text-primary dark:text-brand-dark-text sm:text-5xl">
          Hi, I'm Deta.
        </h1>

        <div className="mb-10 overflow-hidden rounded-2xl shadow-xl">
          <Image
            className="w-full transition-transform duration-500 hover:scale-105"
            src="/about.jpg"
            alt="Deta in Bali"
            width={900}
            height={450}
            priority
          />
        </div>

        <div className="space-y-6">
          <p className="text-xl font-medium leading-normal sm:text-2xl">
            I'm a web developer, a father, and someone trying to find balance in Bali, Indonesia.
          </p>

          <p>
            This blog was born from a simple need: a place to organize my thoughts. 
            For some, writing is a way to share. For me, writing is a way to 
            <em> understand</em>. Whether it's about complex lines of code, the art of being a parent, 
            or just reflections from a morning bike ride.
          </p>

          <h2 className="pt-4 font-display text-2xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Beyond Code
          </h2>

          <p>
            While I spend most of my days with TypeScript and React, my mind often wanders far from the terminal. 
            I am deeply interested in topics like <strong>healthy productivity</strong>, 
            <strong>mental health in the workplace</strong>, and the philosophy of 
            <strong>Stoicism</strong> which helps me stay calm amidst the hustle and bustle of the IT world.
          </p>

          <p>
            The last two years of my life have been dominated by the most challenging yet most rewarding role: 
            being a father. This experience has changed how I see <em>work-life integrity</em> 
            and the importance of truly being &quot;present&quot; for my family.
          </p>

          <h2 className="pt-4 font-display text-2xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Background
          </h2>

          <p>
            I graduated as the valedictorian from STIKI Indonesia in 2019. My interest in programming 
            started in high school when I tried to make a simple Pac-Man game. Since then, 
            my curiosity has never really stopped.
          </p>

          <p>
            Oh, and I'm a <em>food enthusiast</em>! If you come to Bali, 
            I highly recommend <Link href="https://en.wikipedia.org/wiki/Lawar" className="text-brand-accent hover:underline">lawar</Link> — 
            a traditional Balinese dish made from a mixture of vegetables, coconut, and authentic spices.
          </p>

          <div className="mt-12 border-t border-brand-tan pt-8">
            <p className="text-sm text-brand-text-secondary">
              Want to discuss something or just say hi? 
              Please send an email to <a href="mailto:detautama11@gmail.com" className="text-brand-accent hover:underline">detautama11@gmail.com</a>. 
              Or check the <Link href="/contact" className="text-brand-accent hover:underline">/contact</Link> page for more details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to Indonesian
  return (
    <div className="animate-in font-serif text-lg leading-relaxed text-brand-text-primary dark:text-brand-dark-text">
      <h1 className="mb-8 font-display text-4xl font-bold text-brand-text-primary dark:text-brand-dark-text sm:text-5xl">
        Halo, aku Deta.
      </h1>

      <div className="mb-10 overflow-hidden rounded-2xl shadow-xl">
        <Image
          className="w-full transition-transform duration-500 hover:scale-105"
          src="/about.jpg"
          alt="Deta in Bali"
          width={900}
          height={450}
          priority
        />
      </div>

      <div className="space-y-6">
        <p className="text-xl font-medium leading-normal sm:text-2xl">
          Aku adalah seorang web developer, seorang ayah, dan seseorang yang mencoba menemukan keseimbangan di Bali, Indonesia.
        </p>

        <p>
          Blog ini lahir dari kebutuhan sederhana: tempat untuk menata pikiran. 
          Bagi sebagian orang, menulis adalah cara berbagi. Bagiku, menulis adalah cara untuk 
          <em> memahami</em>. Entah itu tentang baris kode yang rumit, seni menjadi orang tua, 
          atau sekadar refleksi dari kayuhan sepeda di pagi hari.
        </p>

        <h2 className="pt-4 font-display text-2xl font-bold text-brand-text-primary dark:text-brand-dark-text">
          Di Luar Kode
        </h2>

        <p>
          Meskipun aku menghabiskan sebagian besar hariku dengan TypeScript dan React, 
          pikiranku sering berkelana jauh dari terminal. Aku sangat tertarik pada topik 
          <strong> produktivitas yang sehat</strong>, <strong>kesehatan mental di lingkungan kerja</strong>, 
          serta filosofi <strong>Stoikisme</strong> yang membantuku tetap tenang di tengah 
          hiruk-pikuk dunia IT.
        </p>

        <p>
          Dua tahun terakhir hidupku didominasi oleh peran paling menantang sekaligus 
          paling membahagiakan: menjadi seorang ayah. Pengalaman ini mengubah caraku 
          melihat <em>work-life integrity</em> dan pentingnya benar-benar &quot;hadir&quot; untuk keluarga.
        </p>

        <h2 className="pt-4 font-display text-2xl font-bold text-brand-text-primary dark:text-brand-dark-text">
          Latar Belakang
        </h2>

        <p>
          Aku lulus sebagai lulusan terbaik dari STIKI Indonesia tahun 2019. Ketertarikanku 
          pada pemrograman dimulai sejak SMA saat mencoba membuat game Pac-Man sederhana. 
          Sejak saat itu, rasa penasaranku tidak pernah benar-benar berhenti.
        </p>

        <p>
          Oh, dan aku adalah seorang <em>food enthusiast</em>! Jika kamu ke Bali, 
          aku sangat merekomendasikan <Link href="https://id.wikipedia.org/wiki/Lawar" className="text-brand-accent hover:underline">lawar</Link> — 
          kuliner khas Bali yang menggunakan campuran sayuran, kelapa, dan bumbu rempah yang autentik.
        </p>

        <div className="mt-12 border-t border-brand-tan pt-8">
          <p className="text-sm text-brand-text-secondary">
            Ingin berdiskusi atau sekadar menyapa? 
            Silakan kirim email ke <a href="mailto:detautama11@gmail.com" className="text-brand-accent hover:underline">detautama11@gmail.com</a>. 
            Atau cek halaman <Link href="/contact" className="text-brand-accent hover:underline">/contact</Link> untuk detail lebih lanjut.
          </p>
        </div>
      </div>
    </div>
  );
}
