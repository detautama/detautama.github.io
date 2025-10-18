import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://detautama.me/"),
  title: "Berita Desa Celuk | I Putu Deta Utama Putra",
  description: "Portal berita dan informasi terkini Desa Celuk, Sukawati, Gianyar, Bali",
};

export default function BeritaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header khusus untuk berita desa */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
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
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                Kembali ke Blog Utama
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="claude-container py-8">
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </main>

      {/* Footer khusus untuk berita desa */}
      <footer className="bg-slate-800 dark:bg-slate-950 text-white py-12 mt-16">
        <div className="claude-container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Desa Celuk</h3>
              <p className="text-slate-300 text-sm">
                Desa wisata kerajinan perak yang terkenal di Sukawati, Gianyar, Bali.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <p className="text-slate-300 text-sm">
                Kantor Desa Celuk<br />
                Sukawati, Gianyar, Bali<br />
                Indonesia
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Informasi</h3>
              <p className="text-slate-300 text-sm">
                Portal berita ini dikelola untuk memberikan informasi terkini 
                tentang kegiatan dan perkembangan Desa Celuk.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © 2024 Berita Desa Celuk - Dikembangkan oleh I Putu Deta Utama Putra
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}