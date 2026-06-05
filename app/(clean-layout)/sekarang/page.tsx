import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sekarang - I Putu Deta Utama Putra",
  description: "Apa yang sedang aku jalani sekarang — pekerjaan, bacaan, dan pikiran.",
};

export default function SekarangPage() {
  return (
    <div className="animate-in font-serif text-lg leading-relaxed text-brand-text-primary dark:text-brand-dark-text">
      <div className="mb-8 border-b border-brand-tan pb-8 dark:border-brand-dark-border">
        <h1 className="mb-2 font-display text-3xl font-bold text-brand-text-primary dark:text-brand-dark-text sm:text-4xl">
          Sekarang
        </h1>
        <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text/60">
          Terakhir diperbarui: Juni 2026 &middot; dari Denpasar, Bali
        </p>
      </div>

      <p className="mb-8 text-base text-brand-text-secondary dark:text-brand-dark-text/70">
        Halaman ini berisi apa yang sedang aku jalani hari-hari ini. Terinspirasi dari gerakan{" "}
        <Link href="https://nownownow.com/about" className="text-brand-accent hover:underline">
          /now
        </Link>
        .
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Sedang mengerjakan
          </h2>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Membangun fitur-fitur baru di produk yang aku kerjakan — banyak TypeScript, sedikit tidur.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Merombak website ini supaya lebih terasa seperti <em>manusia</em>, bukan portofolio developer.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Mulai lebih konsisten menulis — tidak hanya soal kode, tapi soal hidup.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Sedang membaca
          </h2>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>
                <em>Meditations</em> karya Marcus Aurelius — buku yang selalu bisa aku buka di halaman mana saja
                dan selalu relevan.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Artikel-artikel tentang parenting, produktivitas yang realistis (bukan hustle culture).</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Sedang menikmati
          </h2>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Bersepeda pagi di Bali sebelum macet — ini adalah meditasi bergerakku.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Momen-momen kecil bersama anakku yang terus tumbuh lebih cepat dari yang aku kira.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Sedang dipikirkan
          </h2>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>
                Bagaimana cara hadir sepenuhnya untuk keluarga sambil tetap mengerjakan pekerjaan yang aku
                cintai — tanpa salah satunya menjadi korban.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>
                Apa artinya menjadi developer yang baik di era AI — bukan soal takut digantikan, tapi soal
                tetap relevan dan berdampak.
              </span>
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-12 border-t border-brand-tan pt-8 dark:border-brand-dark-border">
        <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text/60">
          Halaman ini aku perbarui sesekali saat ada yang berubah.{" "}
          <a href="mailto:detautama11@gmail.com" className="text-brand-accent hover:underline">
            Hubungi aku
          </a>{" "}
          jika kamu punya rekomendasi buku, jalur sepeda, atau sekadar ingin ngobrol.
        </p>
      </div>
    </div>
  );
}
