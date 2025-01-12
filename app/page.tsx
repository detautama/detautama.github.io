import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <FeaturedArticles />
      <div className="mb-5" />
      <AdditionalLinks />
      <div className="mb-5" />
      <Articles />
    </div>
  );
}

const FeaturedArticles = () => {
  return (
    <div>
      <div className="flex items-center justify-center mb-4 gap-2">
        <Image
          src="/images/favorite-featured.svg"
          alt="profile image"
          width={25}
          height={25}
        />
        <h3 className="font-bold text-2xl text-center">Featured Articles</h3>
      </div>
      <div id="featured-article" className="grid grid-cols-3 gap-4">
        <Link href="/article/1">
          <div className="default_bg text-center h-28 rounded-lg p-4 flex items-center justify-center font-bold">
            <article>
              Learn how to build a blog with Next.js, Tailwind CSS and
              TypeScript
            </article>
          </div>
        </Link>
        <Link href="/article/2">
          <div className="default_bg text-center h-28 rounded-lg p-4 flex items-center justify-center font-bold">
            <article>What is React?</article>
          </div>
        </Link>
        <Link href="/article/3">
          <div className="default_bg text-center h-28 rounded-lg p-4 flex items-center justify-center font-bold">
            <article>How to build a blog with Next.js</article>
          </div>
        </Link>
        <Link href="/article/1">
          <div className="default_bg text-center h-28 rounded-lg p-4 flex items-center justify-center font-bold">
            <article>How to build a blog with Next.js</article>
          </div>
        </Link>
        <Link href="/article/2">
          <div className="default_bg text-center h-28 rounded-lg p-4 flex items-center justify-center font-bold">
            <article>
              Performant, flexible and extensible JavaScript library for
              building
            </article>
          </div>
        </Link>
        <Link href="/article/3">
          <div className="default_bg text-center h-28 rounded-lg p-4 flex items-center justify-center font-bold">
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
        <div className="default_bg text-xs h-9 text-center rounded-lg flex items-center justify-center font-bold">
          Categories
        </div>
      </Link>
      <Link href="/get-in-touch">
        <div className="default_bg text-xs h-9 text-center rounded-lg flex items-center justify-center font-bold">
          Get in Touch
        </div>
      </Link>
      <Link href="/links">
        <div className="default_bg text-xs h-9 text-center rounded-lg flex items-center justify-center font-bold">
          Links
        </div>
      </Link>
      <Link href="/youtube">
        <div className="default_bg text-xs h-9 text-center rounded-lg flex items-center justify-center font-bold">
          YouTube
        </div>
      </Link>
    </div>
  );
};

const Articles = () => {
  return (
    <div id="articles">
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="rounded-lg post_shadow p-4 mb-4 relative" key={i}>
          {i === 0 && (
            <Image
              className="absolute -top-3 -left-3"
              src="/images/new-post.svg"
              alt="new post"
              width={40}
              height={40}
            />
          )}
          <article>
            <Link href="/article/1">
              <h1 className="font-bold text-center text-xl hover:text-lime-600">
                How to build a blog with Next.js
              </h1>
            </Link>
            <p className="text-left">
              <span className="font-bold">Jan 1, 2022 — </span>
              PHP is one of the most popular programming languages in the world.
              It’s been around for a long time and has a huge community of
              developers. It’s used for everything from simple websites to
              complex web applications. If you’re learning PHP, you need a good
              development environment to practice.
            </p>
            <div className="mb-4" />
            <div className="flex justify-between">
              <Link href="/article/1" className="text-lime-600">
                Read more
              </Link>
              <Link href="/article/1" className="text-lime-600">
                JavaScript
              </Link>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};
