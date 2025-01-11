import Link from "next/link";

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
    <div id="featured-article" className="grid grid-cols-3 gap-4">
      <Link href="/article/1">
        <div className="default_bg text-center h-28 rounded-lg p-4 flex items-center justify-center font-bold">
          <article>
            Learn how to build a blog with Next.js, Tailwind CSS and TypeScript
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
            Performant, flexible and extensible JavaScript library for building
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
        <div className="rounded-lg post_shadow" key={i}>
          <article className="p-4 mb-4 rounded-lg">
            <Link href="/article/1">
              <h1 className="font-bold text-center text-xl hover:text-lime-600">
                How to build a blog with Next.js
              </h1>
            </Link>
            <p className="text-center">
              <span className="font-bold">Jan 1, 2022 — </span>
              PHP is one of the most popular programming languages in the world.
              It’s been around for a long time and has a huge community of
              developers. It’s used for everything from simple websites to
              complex web applications. If you’re learning PHP, you need a good
              development environment to practice.
            </p>
          </article>
        </div>
      ))}
    </div>
  );
};
