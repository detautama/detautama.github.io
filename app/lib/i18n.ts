export type Locale = "id" | "en";

export const translations = {
  id: {
    nav: {
      articles: "Tulisan",
      about: "Tentang",
      tags: "Tag",
      projects: "Proyek",
      thoughts: "Pikiran",
      sekarang: "Sekarang",
      subtitle: "Hidup, kode, dan segalanya",
    },
    home: {
      greeting: "Halo, aku Deta.",
      tagline:
        "Ayah, pengendara sepeda, dan developer asal Bali yang mencoba tetap waras di antara baris kode, tangisan bayi malam hari, dan rabbithole filsafat stoikisme. Di sini aku mencatat apa pun yang layak dipikirkan dua kali.",
      latestArticles: "Tulisan Terbaru",
      featured: "Pilihan",
      new: "Baru",
      readAll: "Lihat Semua Tulisan",
      nowLink: "Lihat apa yang sedang aku jalani",
      quickLinks: {
        browse: "Cari Tag",
        links: "Tautan",
      },
    },
    tulisan: {
      subtitle: "Semua catatan — dari kode sampai cerita hidup.",
    },
    sekarang: {
      title: "Sekarang",
      lastUpdated: "Terakhir diperbarui",
      intro: "Halaman ini berisi apa yang sedang aku jalani hari-hari ini. Terinspirasi dari gerakan",
    },
    article: {
      old: "Artikel ini sudah lama",
      oldDescription:
        "Artikel ini ditulis lebih dari setahun yang lalu. Beberapa informasi mungkin sudah usang.",
      readMore: "Baca selengkapnya",
      share: "Suka artikel ini? Bagikan ke temanmu atau salin link-nya!",
      share_button: "Bagikan",
      copy: "Salin",
      copied: "Tersalin!",
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
    tag: {
      count: (n: number) => `Tag (${n})`,
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
      tags: "Tags",
      projects: "Projects",
      thoughts: "Thoughts",
      sekarang: "Now",
      subtitle: "Life, code & everything in between",
    },
    home: {
      greeting: "Hi, I'm Deta.",
      tagline:
        "Father, cyclist, and developer from Bali trying to stay sane between lines of code, late-night baby cries, and Stoic philosophy rabbit holes. Here I write down anything worth thinking twice about.",
      latestArticles: "Latest Writing",
      featured: "Featured",
      new: "New",
      readAll: "View All Posts",
      nowLink: "See what I'm up to right now",
      quickLinks: {
        browse: "Browse Tags",
        links: "Links",
      },
    },
    tulisan: {
      subtitle: "All writing — from code to life.",
    },
    sekarang: {
      title: "Now",
      lastUpdated: "Last updated",
      intro: "This page captures what I'm doing these days. Inspired by the",
    },
    article: {
      old: "This article is old",
      oldDescription:
        "This article was written more than a year ago. Some of the information might be outdated.",
      readMore: "Read more",
      share: "Like the article? Share it with others or copy the link!",
      share_button: "Share",
      copy: "Copy",
      copied: "Copied!",
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
    tag: {
      count: (n: number) => `Tags (${n})`,
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
