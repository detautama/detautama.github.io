import {
  getBeritaByKategori,
  getTopKategoriBerita,
  BeritaData,
} from "../../../../lib/berita";
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
  const capitalizedKategori =
    decodedKategori.charAt(0).toUpperCase() + decodedKategori.slice(1);

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

export default async function KategoriPage({ params }: Params) {
  const { kategori } = await params;
  const decodedKategori = decodeURIComponent(kategori);

  // Get all categories to find exact match
  const allCategories = getTopKategoriBerita({ limit: 50 });
  const exactCategory = allCategories.find(
    (cat) => cat.toLowerCase() === decodedKategori.toLowerCase()
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
        <Link
          href="/berita-desa"
          className="hover:text-slate-800 dark:hover:text-slate-200"
        >
          Berita Desa
        </Link>
        <span>→</span>
        <span className="text-slate-800 dark:text-slate-200">
          Kategori: {capitalizedKategori}
        </span>
      </nav>

      {/* Header */}
      <header className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 py-8 text-center dark:from-slate-800 dark:to-slate-700">
        <h1 className="mb-4 text-3xl font-bold text-slate-800 dark:text-white">
          Berita Kategori: {capitalizedKategori}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          {beritaInCategory.length} berita ditemukan dalam kategori ini
        </p>
      </header>

      {/* Berita List */}
      {beritaInCategory.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">📰</div>
          <h3 className="mb-2 text-xl font-semibold text-slate-700 dark:text-slate-300">
            Belum Ada Berita
          </h3>
          <p className="mb-6 text-slate-500 dark:text-slate-400">
            Belum ada berita dalam kategori {capitalizedKategori}.
          </p>
          <Link
            href="/berita-desa"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
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
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              ← Lihat Semua Berita
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
