import {
  getBeritaData,
  getAllBeritaIds,
  getSortedBeritaData,
} from "../../../lib/berita";
import { MarkdownRenderer } from "../../../MarkdownRenderer";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const ids = getAllBeritaIds();
  return ids.map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  try {
    const berita = getBeritaData(slug);
    return {
      title: `${berita.title} | Berita Desa Celuk`,
      description: berita.description,
      openGraph: {
        title: berita.title,
        description: berita.description,
        type: "article",
        publishedTime: berita.date,
        authors: [berita.penulis],
        tags: berita.tags,
      },
    };
  } catch {
    return {
      title: "Berita Tidak Ditemukan | Berita Desa Celuk",
      description: "Berita yang Anda cari tidak dapat ditemukan.",
    };
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BeritaDetailPage({ params }: Params) {
  const { slug } = await params;

  let berita;
  try {
    berita = getBeritaData(slug);
  } catch {
    notFound();
  }

  // Get related berita (same category, excluding current berita)
  const allBerita = getSortedBeritaData();
  const relatedBerita = allBerita
    .filter((b) => b.kategori === berita.kategori && b.id !== berita.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
        <Link
          href="/berita-desa"
          className="hover:text-slate-800 dark:hover:text-slate-200"
        >
          Berita Desa
        </Link>
        <span>→</span>
        <span className="text-slate-800 dark:text-slate-200">
          {berita.title}
        </span>
      </nav>

      <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        {/* Article Header */}
        <header className="border-b border-slate-200 p-8 dark:border-slate-700">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {berita.kategori}
            </span>
            {berita.featured && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                ⭐ Unggulan
              </span>
            )}
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl dark:text-white">
            {berita.title}
          </h1>

          <p className="mb-6 text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            {berita.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span>👤</span>
              <span>{berita.penulis}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{formatDate(berita.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📂</span>
              <span>{berita.kategori}</span>
            </div>
          </div>

          {berita.tags && berita.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {berita.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="p-8">
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <MarkdownRenderer>{berita.content}</MarkdownRenderer>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBerita.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
            Berita Terkait
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedBerita.map((related) => (
              <article
                key={related.id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="p-6">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {related.kategori}
                  </span>

                  <h3 className="mb-2 mt-3 text-lg font-semibold text-slate-800 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                    <Link href={`/berita-desa/${related.id}`}>
                      {related.title}
                    </Link>
                  </h3>

                  <p className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                    {related.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{formatDate(related.date)}</span>
                    <Link
                      href={`/berita-desa/${related.id}`}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Baca →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Back to Berita */}
      <div className="mt-12 text-center">
        <Link
          href="/berita-desa"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          ← Kembali ke Berita Desa
        </Link>
      </div>
    </div>
  );
}
