import { getBeritaByKategori, getTopKategoriBerita, BeritaData } from "../../../../lib/berita";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{
    kategori: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getTopKategoriBerita({ limit: 20 });
  return categories.map((kategori) => ({
    kategori: kategori.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { kategori } = await params;
  const decodedKategori = decodeURIComponent(kategori);
  const capitalizedKategori = decodedKategori.charAt(0).toUpperCase() + decodedKategori.slice(1);
  
  return {
    title: `Berita ${capitalizedKategori} | Berita Desa Celuk`,
    description: `Kumpulan berita kategori ${capitalizedKategori} dari Desa Celuk, Sukawati, Gianyar, Bali.`,
  };
}

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

export default async function KategoriPage({ params }: Params) {
  const { kategori } = await params;
  const decodedKategori = decodeURIComponent(kategori);
  
  // Get all categories to find exact match
  const allCategories = getTopKategoriBerita({ limit: 50 });
  const exactCategory = allCategories.find(
    cat => cat.toLowerCase() === decodedKategori.toLowerCase()
  );
  
  if (!exactCategory) {
    notFound();
  }
  
  const beritaInCategory = getBeritaByKategori(exactCategory);
  const capitalizedKategori = exactCategory;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
        <Link href="/berita-desa" className="hover:text-slate-800 dark:hover:text-slate-200">
          Berita Desa
        </Link>
        <span>→</span>
        <span className="text-slate-800 dark:text-slate-200">Kategori: {capitalizedKategori}</span>
      </nav>

      {/* Header */}
      <header className="text-center py-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Berita Kategori: {capitalizedKategori}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          {beritaInCategory.length} berita ditemukan dalam kategori ini
        </p>
      </header>

      {/* Berita List */}
      {beritaInCategory.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Belum Ada Berita
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Belum ada berita dalam kategori {capitalizedKategori}.
          </p>
          <Link 
            href="/berita-desa"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            ← Kembali ke Semua Berita
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {beritaInCategory.map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
          
          {/* Back to Berita */}
          <div className="text-center">
            <Link 
              href="/berita-desa"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              ← Lihat Semua Berita
            </Link>
          </div>
        </>
      )}
    </div>
  );
}