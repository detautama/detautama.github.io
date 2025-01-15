import Link from "next/link";
import Image from "next/image";
import { getSortedArticlesData, ArticleData } from "@/app/lib/articles";

export default async function Home() {
  const allArticlesData = getSortedArticlesData();
  const featuredArticles = allArticlesData.filter(
    (article) => article.featured
  );

  return (
    <div>
      <FeaturedArticles featuredArticles={featuredArticles} />
      <div className="mb-5" />
      <AdditionalLinks />
      <div className="mb-5" />
      <Articles allArticlesData={allArticlesData} />
    </div>
  );
}

const FeaturedArticles: React.FC<{ featuredArticles: ArticleData[] }> = ({
  featuredArticles,
}) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-2">
        <Image
          src="/images/favorite-featured.svg"
          alt="profile image"
          width={25}
          height={25}
        />
        <h3 className="text-center text-2xl font-bold">Featured Articles</h3>
      </div>
      <div
        id="featured-article"
        className="grid grid-cols-2 gap-4 md:grid-cols-3"
      >
        {featuredArticles.map(({ id, title }) => (
          <Link href={`/articles/${id}`} key={id} className="hover:scale-110">
            <div className="default_bg flex h-28 items-center justify-center rounded-lg p-4 text-center font-bold">
              <article className="line-clamp-3">{title}</article>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const AdditionalLinks = () => {
  return (
    <div
      id="additional-links"
      className="grid grid-cols-2 gap-4 md:grid-cols-4"
    >
      <Link href="/tag">
        <div className="flex h-9 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-violet-700 to-lime-800 text-center text-xs font-bold text-white">
          <Image
            src="/images/tags-white.svg"
            alt="tag"
            width={16}
            height={16}
          />
          Tags
        </div>
      </Link>
      <Link href="/contact">
        <div className="flex h-9 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-violet-700 to-lime-800 text-center text-xs font-bold text-white">
          <Image src="/images/mail.svg" alt="mail" width={16} height={16} />
          Get in Touch
        </div>
      </Link>
      <Link href="/links">
        <div className="flex h-9 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-violet-700 to-lime-800 text-center text-xs font-bold text-white">
          <Image src="/images/link.svg" alt="link" width={16} height={16} />
          Links
        </div>
      </Link>
      <Link href="https://www.youtube.com/@detautama9899">
        <div className="flex h-9 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-violet-700 to-lime-800 text-center text-xs font-bold text-white">
          <Image
            src="/images/youtube.svg"
            alt="youtube"
            width={16}
            height={16}
          />
          YouTube
        </div>
      </Link>
    </div>
  );
};

const Articles: React.FC<{ allArticlesData: ArticleData[] }> = ({
  allArticlesData,
}) => {
  return (
    <div id="articles">
      {allArticlesData.map(({ id, date, title, description, tag }, i) => (
        <div
          className="post_shadow relative mb-4 rounded-lg p-4 dark:border dark:border-white"
          key={id}
        >
          {i === 0 && (
            <Image
              className="absolute -left-2 -top-2"
              src="/images/new-post.svg"
              alt="new post"
              width={40}
              height={40}
            />
          )}
          <article>
            <Link href={`/articles/${id}`}>
              <h1 className="mb-2 text-center text-2xl font-bold hover:text-lime-600">
                {title}
              </h1>
            </Link>
            <p className="mb-4 text-center text-xs font-bold text-gray-600 dark:text-gray-300">
              {date}
            </p>
            <p>{description}</p>
            <div className="mb-4" />
            <div className="flex justify-between">
              <Link
                href={`/articles/${id}`}
                className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-1 text-xs font-bold tracking-wide text-white"
              >
                Read more →
              </Link>
              <div className="flex gap-2">
                <Link
                  href={`/tag/#${tag}`}
                  className="flex gap-1 rounded-md bg-gradient-to-r from-lime-800 to-indigo-800 px-2 py-1 text-xs font-bold tracking-wide text-white"
                >
                  <Image
                    src="/images/tag.svg"
                    alt="tag"
                    width={16}
                    height={16}
                  />
                  {tag}
                </Link>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};
