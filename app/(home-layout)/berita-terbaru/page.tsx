import Link from 'next/link';

export default function BeritaAccessPage() {
  return (
    <div className="claude-container py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-8">
          📰 Berita Terbaru
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
          Akses berita terbaru tentang Bank Sampah Celuk - Sukawati
        </p>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
            Bank Sampah Celuk - Sukawati Gelar Aksi Tukar Sampah Anorganik/Plastik
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Minggu, 19 Oktober 2025 | Pukul 08.00 - 11.00 WITA
          </p>
          <Link 
            href="/berita-desa/bank-sampah-celuk-sukawati-oktober-2025"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            📖 Baca Berita Lengkap
          </Link>
        </div>
        
        <div className="mt-12">
          <Link 
            href="/berita-desa"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            🏠 Lihat Semua Berita Desa Celuk
          </Link>
        </div>
      </div>
    </div>
  );
}