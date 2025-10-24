import Link from "next/link";

export default function BeritaAccessPage() {
  return (
    <div className="claude-container py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-8 text-4xl font-bold text-slate-800 dark:text-white">
          📰 Berita Terbaru
        </h1>
        <p className="mb-12 text-lg text-slate-600 dark:text-slate-400">
          Akses berita terbaru tentang Bank Sampah Celuk - Sukawati
        </p>

        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-4 text-2xl font-semibold text-slate-800 dark:text-white">
            Bank Sampah Celuk - Sukawati Gelar Aksi Tukar Sampah
            Anorganik/Plastik
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Minggu, 19 Oktober 2025 | Pukul 08.00 - 11.00 WITA
          </p>
          <Link
            href="/berita-desa/bank-sampah-celuk-sukawati-oktober-2025"
            className="inline-block rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition-colors hover:bg-green-700"
          >
            📖 Baca Berita Lengkap
          </Link>
        </div>

        <div className="mt-12">
          <Link
            href="/berita-desa"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            🏠 Lihat Semua Berita Desa Celuk
          </Link>
        </div>
      </div>
    </div>
  );
}
