import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData, PostData } from "@/app/lib/posts";
import Markdown from "react-markdown";

export default async function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div>
      <FeaturedArticles />
      <div className="mb-5" />
      <AdditionalLinks />
      <div className="mb-5" />
      <Articles allPostsData={allPostsData} />
    </div>
  );
}

const FeaturedArticles = () => {
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
      <div id="featured-article" className="grid grid-cols-3 gap-4">
        <Link href="/article/1">
          <div className="default_bg flex h-28 items-center justify-center rounded-lg p-4 text-center font-bold">
            <article>
              Learn how to build a blog with Next.js, Tailwind CSS and
              TypeScript
            </article>
          </div>
        </Link>
        <Link href="/article/2">
          <div className="default_bg flex h-28 items-center justify-center rounded-lg p-4 text-center font-bold">
            <article>What is React?</article>
          </div>
        </Link>
        <Link href="/article/3">
          <div className="default_bg flex h-28 items-center justify-center rounded-lg p-4 text-center font-bold">
            <article>How to build a blog with Next.js</article>
          </div>
        </Link>
        <Link href="/article/1">
          <div className="default_bg flex h-28 items-center justify-center rounded-lg p-4 text-center font-bold">
            <article>How to build a blog with Next.js</article>
          </div>
        </Link>
        <Link href="/article/2">
          <div className="default_bg flex h-28 items-center justify-center rounded-lg p-4 text-center font-bold">
            <article>
              Performant, flexible and extensible JavaScript library for
              building
            </article>
          </div>
        </Link>
        <Link href="/article/3">
          <div className="default_bg flex h-28 items-center justify-center rounded-lg p-4 text-center font-bold">
            <article>
              What is React? React is a JavaScript library for building user
            </article>
          </div>
        </Link>
      </div>
    </div>
  );
};

const AdditionalLinks = () => {
  return (
    <div id="additional-links" className="grid grid-cols-4 gap-4">
      <Link href="/categories">
        <div className="default_bg flex h-9 items-center justify-center rounded-lg text-center text-xs font-bold">
          Categories
        </div>
      </Link>
      <Link href="/get-in-touch">
        <div className="default_bg flex h-9 items-center justify-center rounded-lg text-center text-xs font-bold">
          Get in Touch
        </div>
      </Link>
      <Link href="/links">
        <div className="default_bg flex h-9 items-center justify-center rounded-lg text-center text-xs font-bold">
          Links
        </div>
      </Link>
      <Link href="/youtube">
        <div className="default_bg flex h-9 items-center justify-center rounded-lg text-center text-xs font-bold">
          YouTube
        </div>
      </Link>
    </div>
  );
};

const Articles: React.FC<{ allPostsData: PostData[] }> = ({ allPostsData }) => {
  return (
    <div id="articles">
      {allPostsData.map(({ id, date, title, description, tags }, i) => (
        <div className="post_shadow relative mb-4 rounded-lg p-4" key={id}>
          {i === 0 && (
            <Image
              className="absolute -left-3 -top-3"
              src="/images/new-post.svg"
              alt="new post"
              width={40}
              height={40}
            />
          )}
          <article>
            <Link href={`/article/${id}`}>
              <h1 className="mb-2 text-center text-2xl font-bold hover:text-lime-600">
                {title}
              </h1>
            </Link>
            <p className="font-bold">{date} </p>
            <Markdown>{description}</Markdown>
            <div className="mb-4" />
            <div className="flex justify-between">
              <Link
                href={`/article/${id}`}
                className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-1 text-xs font-bold tracking-wide text-white"
              >
                Read more →
              </Link>
              <div className="flex gap-2">
                {tags
                  .split(",")
                  .map((string) => string.trim())
                  .map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag}`}
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
                  ))}
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};
