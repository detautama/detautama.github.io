import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://detautama.me/"),
  title: "Berita Desa Celuk | I Putu Deta Utama Putra",
  description:
    "Portal berita dan informasi terkini Desa Celuk, Sukawati, Gianyar, Bali",
};

export default function BeritaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header khusus untuk berita desa */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="claude-container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                🏛️ Berita Desa Celuk
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sukawati, Gianyar, Bali
              </p>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm text-slate-600 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                Kembali ke Blog Utama
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="claude-container py-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>

      {/* Footer khusus untuk berita desa */}
      <footer className="mt-16 bg-slate-800 py-12 text-white dark:bg-slate-950">
        <div className="claude-container">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Desa Celuk</h3>
              <p className="text-sm text-slate-300">
                Desa wisata kerajinan perak yang terkenal di Sukawati, Gianyar,
                Bali.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Kontak</h3>
              <p className="text-sm text-slate-300">
                Kantor Desa Celuk
                <br />
                Sukawati, Gianyar, Bali
                <br />
                Indonesia
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Informasi</h3>
              <p className="text-sm text-slate-300">
                Portal berita ini dikelola untuk memberikan informasi terkini
                tentang kegiatan dan perkembangan Desa Celuk.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-700 pt-8 text-center">
            <p className="text-sm text-slate-400">
              © 2024 Berita Desa Celuk - Dikembangkan oleh I Putu Deta Utama
              Putra
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
