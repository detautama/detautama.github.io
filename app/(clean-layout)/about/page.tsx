import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang - I Putu Deta Utama Putra",
  description: "Mengenal Deta — seorang developer, ayah, dan pemikir dari Bali.",
};

export default async function Page() {
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
