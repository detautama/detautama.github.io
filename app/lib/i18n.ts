export type Locale = "id" | "en";

export const translations = {
  id: {
    nav: {
      articles: "Tulisan",
      about: "Tentang",
      projects: "Proyek",
      now: "Sekarang",
    },
    home: {
      featured: "Pilihan",
      new: "Baru",
      readAll: "Lihat Semua Tulisan",
      quickLinks: {
        browse: "Cari Tag",
      },
    },
    tulisan: {
      subtitle: "Semua catatan — dari kode sampai cerita hidup.",
    },
    article: {
      old: "Artikel ini sudah lama",
      oldDescription:
        "Artikel ini ditulis lebih dari setahun yang lalu. Beberapa informasi mungkin sudah usang.",
      share: "Suka artikel ini? Bagikan ke temanmu atau salin link-nya!",
      share_button: "Bagikan",
      onlyAvailable: "Artikel ini hanya tersedia dalam bahasa",
      relatedArticles: "Artikel Serupa",
    },
    footer: {
      text: "Matur Suksma! Terima kasih sudah mampir.",
    },
    search: {
      placeholder: "Cari artikel...",
      title: "Cari Artikel",
      result: (n: number) => `Ditemukan ${n} artikel`,
      noResult: "Tidak ada artikel yang ditemukan.",
    },
    thoughts: {
      searchPlaceholder: "Cari pikiran...",
      emptyTitle: "Belum ada pikiran di sini.",
      emptySubtitle: "Nantikan — pikiran pertama sedang dalam perjalanan.",
      noResult: "Tidak ada pikiran yang cocok.",
      result: (n: number) => `Ditemukan ${n} pikiran`,
    },
    projects: {
      title: "Proyek",
      description:
        "Berikut beberapa proyek yang pernah aku kerjakan. Sebagian besar tidak bersifat open source, tapi aku dengan senang hati berbagi wawasan atau mendiskusikannya lebih lanjut jika kamu tertarik.",
      visitProject: "Kunjungi Proyek →",
    },
  },
  en: {
    nav: {
      articles: "Writing",
      about: "About",
      projects: "Projects",
      now: "Now",
    },
    home: {
      featured: "Featured",
      new: "New",
      readAll: "View All Posts",
      quickLinks: {
        browse: "Browse Tags",
      },
    },
    tulisan: {
      subtitle: "All writing — from code to life.",
    },
    article: {
      old: "This article is old",
      oldDescription:
        "This article was written more than a year ago. Some of the information might be outdated.",
      share: "Like the article? Share it with others or copy the link!",
      share_button: "Share",
      onlyAvailable: "This article is only available in",
      relatedArticles: "Related Articles",
    },
    footer: {
      text: "Thank you for visiting!",
    },
    search: {
      placeholder: "Search articles...",
      title: "Search Articles",
      result: (n: number) => `Found ${n} article${n === 1 ? "" : "s"}`,
      noResult: "No articles found.",
    },
    thoughts: {
      searchPlaceholder: "Search thoughts...",
      emptyTitle: "Nothing here yet.",
      emptySubtitle: "Check back soon — the first thought is on its way.",
      noResult: "No thoughts matched your search.",
      result: (n: number) => `Found ${n} thought${n === 1 ? "" : "s"}`,
    },
    projects: {
      title: "Projects",
      description:
        "These are some of the projects I've worked on in my spare time. Most of these projects are not open source. However, I'd be happy to share insights or discuss them further if you're interested.",
      visitProject: "Visit Project →",
    },
  },
};

export type Translations = typeof translations.id;
