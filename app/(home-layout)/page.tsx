import Link from "next/link";
import { getSortedArticlesData, getAllArticleIds } from "@/app/lib/articles";
import { Metadata } from "next";
import FeelingLuckyButton from "@/app/components/FeelingLuckyButton";

export const metadata: Metadata = {
  title: "Articles - I Putu Deta Utama Putra",
  description: "A collection of articles written by I Putu Deta Utama Putra",
};

export default async function Home() {
  const allArticlesData = getSortedArticlesData();
  const featuredArticles = allArticlesData.filter(
    (article) => article.featured
  );
  const articleIds = getAllArticleIds();

  return (
    <div className="brand-container animate-in py-8">
      <div className="mb-12 border-b border-brand-tan pb-12">
        <h1 className="mb-4 font-display text-4xl font-bold text-brand-text-primary dark:text-brand-dark-text">
          Halo, aku Deta.
        </h1>
        <p className="max-w-2xl font-serif text-xl leading-relaxed text-brand-text-secondary dark:text-brand-dark-text/80">
          Developer asal Bali yang mencoba waras di antara baris kode, 
          kesibukan sebagai ayah, dan obsesi kecil pada sepeda serta stoikisme. 
          Di sini aku mencatat apa pun yang layak dipikirkan dua kali.
        </p>
      </div>

      {featuredArticles.length > 0 && (
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <svg
              className="h-5 w-5 text-brand-accent"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
            <h2 className="font-display text-xl font-semibold text-brand-text-primary dark:text-brand-dark-text">
              Pilihan
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map(({ id, title }) => (
              <Link href={`/articles/${id}`} key={id} className="group">
                <div className="brand-featured-card flex h-32 items-center justify-center transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
                  <h3 className="line-clamp-3 px-4 text-center font-display font-medium text-brand-text-primary dark:text-brand-dark-text">
                    {title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <QuickLinks articleIds={articleIds} />

      <section className="mb-12">
        <h2 className="mb-6 font-display text-xl font-semibold text-brand-text-primary dark:text-brand-dark-text">
          Tulisan Terbaru
        </h2>
        <div className="space-y-4">
          {allArticlesData.map(({ id, date, title, description, tags }, i) => (
            <article
              key={id}
              className="brand-article-card animate-in group"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="mb-2 flex items-center gap-3">
                {i === 0 && (
                  <span className="brand-badge bg-brand-accent text-white">
                    Baru
                  </span>
                )}
                <time className="text-sm text-brand-text-secondary dark:text-brand-dark-text/70">
                  {date}
                </time>
              </div>
              <Link href={`/articles/${id}`}>
                <h3 className="mb-2 font-display text-xl font-bold text-brand-text-primary transition-colors group-hover:text-brand-accent dark:text-brand-dark-text">
                  {title}
                </h3>
              </Link>
              <p className="mb-3 line-clamp-2 font-serif text-brand-text-secondary dark:text-brand-dark-text/80">
                {description}
              </p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/#${tag}`}
                      className="brand-badge transition-colors hover:bg-brand-forest hover:text-white"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/articles/${id}`}
                  className="shrink-0 text-brand-accent transition-colors hover:text-brand-forest dark:hover:text-brand-accent/80"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const QuickLinks = ({ articleIds }: { articleIds: string[] }) => {
  const links = [
    { href: "/tag", label: "Browse Tags", icon: "tag" },
    { href: "/contact", label: "Get in Touch", icon: "mail" },
    { href: "/links", label: "Links", icon: "link" },
    {
      href: "https://www.youtube.com/@detautama9899",
      label: "YouTube",
      icon: "video",
    },
  ];

  const icons = {
    tag: (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
    mail: (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    link: (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
    video: (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  };

  return (
    <section className="mb-12">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className="brand-button-secondary group"
          >
            <span className="mr-2">{icons[icon as keyof typeof icons]}</span>
            <span>{label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-3 flex justify-center">
        <FeelingLuckyButton articleIds={articleIds} />
      </div>
    </section>
  );
};
