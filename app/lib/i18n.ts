export type Locale = "id" | "en";

export const translations = {
  id: {
    nav: {
      articles: "Artikel",
      about: "Tentang",
      tags: "Tag",
      projects: "Proyek",
      subtitle: "Life, Code & Everything in between",
    },
    home: {
      greeting: "Halo, aku Deta.",
      tagline:
        "Developer asal Bali yang mencoba waras di antara baris kode, kesibukan sebagai ayah, dan obsesi kecil pada sepeda serta stoikisme. Di sini aku mencatat apa pun yang layak dipikirkan dua kali.",
      latestArticles: "Tulisan Terbaru",
      featured: "Pilihan",
      new: "Baru",
      readAll: "Lihat Semua Tulisan",
      quickLinks: {
        browse: "Cari Tag",
        contact: "Hubungi Saya",
        links: "Tautan",
      },
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
  },
  en: {
    nav: {
      articles: "Articles",
      about: "About",
      tags: "Tags",
      projects: "Projects",
    },
    home: {
      greeting: "Hi, I'm Deta.",
      tagline:
        "A developer from Bali trying to stay sane between lines of code, busy days as a father, and small obsessions with cycling and stoicism. Here I write down anything worth thinking twice about.",
      latestArticles: "Latest Writing",
      featured: "Featured",
      new: "New",
      readAll: "View All Posts",
      quickLinks: {
        browse: "Browse Tags",
        contact: "Get in Touch",
        links: "Links",
      },
    },
    article: {
      old: "This article is old",
      oldDescription:
        "This article was written more than a year ago. Some of the information might be outdated.",
      readMore: "Read more",
      share: "Like the article? Share it with others or copy the link!",
      copy: "Copy",
      copied: "Copied!",
      onlyAvailable: "This article is only available in",
    },
    footer: {
      text: "Thank you for visiting!",
    },
    search: {
      placeholder: "Search articles...",
      title: "Search Articles",
    },
    tag: {
      count: (n: number) => `Tags (${n})`,
    },
  },
};

export type Translations = typeof translations.id;
