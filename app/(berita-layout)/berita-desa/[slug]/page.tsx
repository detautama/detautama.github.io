import { getBeritaData, getAllBeritaIds, getSortedBeritaData } from "../../../lib/berita";
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
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-8">
        <Link href="/berita-desa" className="hover:text-slate-800 dark:hover:text-slate-200">
          Berita Desa
        </Link>
        <span>→</span>
        <span className="text-slate-800 dark:text-slate-200">{berita.title}</span>
      </nav>

      <article className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Article Header */}
        <header className="p-8 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {berita.kategori}
            </span>
            {berita.featured && (
              <span className="px-3 py-1 text-sm font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full">
                ⭐ Unggulan
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            {berita.title}
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
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
            <div className="flex flex-wrap gap-2 mt-6">
              {berita.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="p-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MarkdownRenderer>{berita.content}</MarkdownRenderer>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBerita.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
            Berita Terkait
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedBerita.map((related) => (
              <article key={related.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {related.kategori}
                  </span>
                  
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mt-3 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Link href={`/berita-desa/${related.id}`}>
                      {related.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                    {related.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{formatDate(related.date)}</span>
                    <Link 
                      href={`/berita-desa/${related.id}`}
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
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
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          ← Kembali ke Berita Desa
        </Link>
      </div>
    </div>
  );
}