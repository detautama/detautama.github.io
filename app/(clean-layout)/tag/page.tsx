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
  // Flatten all tags from all articles
  const allTags = allArticlesData.flatMap((article) => article.tags);
  const uniqueTags = [...new Set(allTags)].sort();

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">
        Tags ({uniqueTags.length})
      </h1>
      <div className="mb-5" />
      <div className="flex flex-wrap gap-2">
        {uniqueTags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/#${tag}`}
            className="claude-badge flex gap-1 transition-colors hover:bg-claude-brown hover:text-white"
          >
            <Image src="/images/tag.svg" alt="tag" width={16} height={16} />
            {tag}
          </Link>
        ))}
      </div>
      <div className="mb-5" />
      <hr className="pb-4" />
      {uniqueTags.map((tag) => (
        <div key={tag}>
          <p className="text-2xl font-bold" id={tag}>
            {tag} (
            {
              allArticlesData.filter((article) => article.tags.includes(tag))
                .length
            }
            )
          </p>
          <div className="mb-5" />
          <div className="flex flex-wrap gap-4">
            {allArticlesData
              .filter((article) => article.tags.includes(tag))
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
