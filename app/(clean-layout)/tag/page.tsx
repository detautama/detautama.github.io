import Link from "next/link";
import Image from "next/image";
import { getSortedArticlesData } from "../../lib/articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags - I Putu Deta Utama Putra",
  description: "A collection of tags used in articles",
};

export default async function Page() {
  const allArticlesData = getSortedArticlesData();
  const tags = allArticlesData.map((article) => article.tag);
  const uniqueTags = [...new Set(tags)];
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">
        Tags ({uniqueTags.length})
      </h1>
      <div className="mb-5" />
      <div className="flex flex-wrap gap-2">
        {uniqueTags.map((tag, i) => (
          <Link
            key={i}
            href={`/tag/#${tag}`}
            className="flex gap-1 rounded-md bg-gradient-to-r from-lime-800 to-indigo-800 px-2 py-1 text-xs font-bold tracking-wide text-white"
          >
            <Image src="/images/tag.svg" alt="tag" width={16} height={16} />
            {tag}
          </Link>
        ))}
      </div>
      <div className="mb-5" />
      <hr className="pb-4" />
      {uniqueTags.map((tag, i) => (
        <div key={i}>
          <p className="text-2xl font-bold" id={tag}>
            {tag} (
            {allArticlesData.filter((article) => article.tag === tag).length})
          </p>
          <div className="mb-5" />
          <div className="flex flex-wrap gap-4">
            {allArticlesData
              .filter((article) => article.tag === tag)
              .map((article) => (
                <div key={article.id}>
                  <article>
                    <Link href={`/articles/${article.id}`}>
                      <h1 className="mb-2text-2xl font-bold hover:text-lime-600">
                        {article.title}
                      </h1>
                    </Link>
                  </article>
                </div>
              ))}
          </div>
          <div className="mb-5" />
          <hr />
          <div className="mb-5" />
        </div>
      ))}
    </div>
  );
}
