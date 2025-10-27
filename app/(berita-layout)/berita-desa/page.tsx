import {
  getSortedBeritaData,
  getFeaturedBerita,
  getTopKategoriBerita,
  BeritaData,
} from "../../lib/berita";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berita Desa Celuk - Portal Informasi Terkini",
  description:
    "Portal berita dan informasi terkini Desa Celuk, Sukawati, Gianyar, Bali. Temukan berita, kegiatan, dan perkembangan desa wisata kerajinan perak.",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BeritaCard({ berita }: { berita: BeritaData }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {berita.kategori}
          </span>
          {berita.featured && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              ⭐ Unggulan
            </span>
          )}
        </div>

        <h2 className="mb-3 text-xl font-semibold text-slate-800 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
          <Link href={`/berita-desa/${berita.id}`}>{berita.title}</Link>
        </h2>

        <p className="mb-4 line-clamp-3 text-slate-600 dark:text-slate-300">
          {berita.description}
        </p>

        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span>👤 {berita.penulis}</span>
            <span>📅 {formatDate(berita.date)}</span>
          </div>

          <Link
            href={`/berita-desa/${berita.id}`}
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Baca selengkapnya →
          </Link>
        </div>

        {berita.tags && berita.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {berita.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default async function BeritaDesaPage() {
  const allBerita = getSortedBeritaData();
  const featuredBerita = getFeaturedBerita();
  const topKategori = getTopKategoriBerita({ limit: 6 });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 py-12 text-center dark:from-slate-800 dark:to-slate-700">
        <h1 className="mb-4 text-4xl font-bold text-slate-800 dark:text-white">
          Selamat Datang di Portal Berita Desa Celuk
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Dapatkan informasi terkini tentang kegiatan, perkembangan, dan berita
          penting dari Desa Celuk, pusat kerajinan perak terkenal di Bali.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {allBerita.length}
          </div>
          <div className="text-slate-600 dark:text-slate-300">Total Berita</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {featuredBerita.length}
          </div>
          <div className="text-slate-600 dark:text-slate-300">
            Berita Unggulan
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {topKategori.length}
          </div>
          <div className="text-slate-600 dark:text-slate-300">
            Kategori Aktif
          </div>
        </div>
      </section>

      {/* Featured Berita */}
      {featuredBerita.length > 0 && (
        <section>
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-white">
            ⭐ Berita Unggulan
          </h2>
          <div className="grid gap-6">
            {featuredBerita.slice(0, 2).map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {topKategori.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
            📂 Kategori Berita
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {topKategori.map((kategori) => (
              <Link
                key={kategori}
                href={`/berita-desa/kategori/${encodeURIComponent(kategori.toLowerCase())}`}
                className="rounded-lg border border-slate-200 bg-white p-4 text-center transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="font-semibold text-slate-800 dark:text-white">
                  {kategori}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {allBerita.filter((b) => b.kategori === kategori).length}{" "}
                  berita
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Berita */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
          📰 Semua Berita
        </h2>

        {allBerita.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">📝</div>
            <h3 className="mb-2 text-xl font-semibold text-slate-700 dark:text-slate-300">
              Belum Ada Berita
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Berita akan segera ditambahkan. Silakan kembali lagi nanti.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {allBerita.map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
