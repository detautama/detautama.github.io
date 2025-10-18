import { getSortedBeritaData, getFeaturedBerita, getTopKategoriBerita, BeritaData } from "../../lib/berita";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berita Desa Celuk - Portal Informasi Terkini",
  description: "Portal berita dan informasi terkini Desa Celuk, Sukawati, Gianyar, Bali. Temukan berita, kegiatan, dan perkembangan desa wisata kerajinan perak.",
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
    <article className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {berita.kategori}
          </span>
          {berita.featured && (
            <span className="px-3 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full">
              ⭐ Unggulan
            </span>
          )}
        </div>
        
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Link href={`/berita-desa/${berita.id}`}>
            {berita.title}
          </Link>
        </h2>
        
        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
          {berita.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span>👤 {berita.penulis}</span>
            <span>📅 {formatDate(berita.date)}</span>
          </div>
          
          <Link 
            href={`/berita-desa/${berita.id}`}
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Baca selengkapnya →
          </Link>
        </div>
        
        {berita.tags && berita.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {berita.tags.map((tag: string) => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
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
      <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Selamat Datang di Portal Berita Desa Celuk
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Dapatkan informasi terkini tentang kegiatan, perkembangan, dan berita penting 
          dari Desa Celuk, pusat kerajinan perak terkenal di Bali.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center border border-slate-200 dark:border-slate-700">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {allBerita.length}
          </div>
          <div className="text-slate-600 dark:text-slate-300">Total Berita</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center border border-slate-200 dark:border-slate-700">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {featuredBerita.length}
          </div>
          <div className="text-slate-600 dark:text-slate-300">Berita Unggulan</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center border border-slate-200 dark:border-slate-700">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {topKategori.length}
          </div>
          <div className="text-slate-600 dark:text-slate-300">Kategori Aktif</div>
        </div>
      </section>

      {/* Featured Berita */}
      {featuredBerita.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
            📂 Kategori Berita
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {topKategori.map((kategori) => (
              <Link
                key={kategori}
                href={`/berita-desa/kategori/${encodeURIComponent(kategori.toLowerCase())}`}
                className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-slate-800 dark:text-white">
                  {kategori}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {allBerita.filter(b => b.kategori === kategori).length} berita
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Berita */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
          📰 Semua Berita
        </h2>
        
        {allBerita.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
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