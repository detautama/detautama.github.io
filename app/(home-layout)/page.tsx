import Link from "next/link";
import { getSortedArticlesData } from "@/app/lib/articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles - I Putu Deta Utama Putra",
  description: "A collection of articles written by I Putu Deta Utama Putra",
};

export default async function Home() {
  const allArticlesData = getSortedArticlesData();
  const featuredArticles = allArticlesData.filter(
    (article) => article.featured
  );

  return (
    <div className="claude-container py-8 animate-in">
      <div className="mb-12">
        <h1 className="text-3xl font-display font-bold text-claude-text-primary dark:text-claude-dark-text mb-4">
          Welcome
        </h1>
        <p className="text-lg text-claude-text-secondary dark:text-claude-dark-text/80 max-w-2xl">
          Exploring JavaScript, web development, and modern software engineering through thoughtful articles and insights.
        </p>
      </div>

      {featuredArticles.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-claude-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h2 className="text-xl font-semibold text-claude-text-primary dark:text-claude-dark-text">
              Featured Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredArticles.map(({ id, title }) => (
              <Link
                href={`/articles/${id}`}
                key={id}
                className="group"
              >
                <div className="claude-featured-card h-32 flex items-center justify-center transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
                  <h3 className="text-center font-medium text-claude-text-primary dark:text-claude-dark-text px-4 line-clamp-3">
                    {title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <QuickLinks />

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-claude-text-primary dark:text-claude-dark-text mb-6">
          Recent Articles
        </h2>
        <div className="space-y-4">
          {allArticlesData.map(({ id, date, title, description, tag }, i) => (
            <article
              key={id}
              className="claude-article-card group animate-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {i === 0 && (
                      <span className="claude-badge bg-claude-accent text-white">
                        New
                      </span>
                    )}
                    <time className="text-sm text-claude-text-secondary dark:text-claude-dark-text/70">
                      {date}
                    </time>
                  </div>
                  <Link href={`/articles/${id}`}>
                    <h3 className="text-lg font-semibold text-claude-text-primary dark:text-claude-dark-text mb-2 group-hover:text-claude-accent transition-colors">
                      {title}
                    </h3>
                  </Link>
                  <p className="text-claude-text-secondary dark:text-claude-dark-text/80 line-clamp-2">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/tag/#${tag}`}
                    className="claude-badge hover:bg-claude-brown hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                  <Link
                    href={`/articles/${id}`}
                    className="text-claude-accent hover:text-claude-brown dark:hover:text-claude-accent/80 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const QuickLinks = () => {
  const links = [
    { href: "/tag", label: "Browse Tags", icon: "tag" },
    { href: "/contact", label: "Get in Touch", icon: "mail" },
    { href: "/links", label: "Links", icon: "link" },
    { href: "https://www.youtube.com/@detautama9899", label: "YouTube", icon: "video" },
  ];

  const icons = {
    tag: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    mail: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    link: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    video: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <section className="mb-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className="claude-button-secondary group"
          >
            <span className="mr-2">{icons[icon as keyof typeof icons]}</span>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};