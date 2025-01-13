import { getAllArticleIds, getArticleData } from "@/app/lib/articles";
import Link from "next/link";
import Markdown from "react-markdown";

export default async function Page({
  params,
}: {
  readonly params: Promise<{
    readonly articleId: string;
  }>;
}) {
  const { articleId } = await params;
  const artileData = getArticleData(articleId);
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">{artileData.title}</h1>
      <div className="mb-5" />
      <div className="mb-5" />
      <div className="text-center text-gray-500">{artileData.description}</div>
      <div className="mb-5" />
      <article>
        <Markdown>{artileData.content}</Markdown>
      </article>
      <div className="mb-5" />
      <div className="flex items-center justify-between">
        <time className="text-gray-500">{artileData.date}</time>
        <div className="flex items-center justify-center gap-2 text-center">
          {artileData.tags
            .split(",")
            .map((string) => string.trim())
            .map((tag) => (
              <Link
                href={`/tag/${tag}`}
                key={tag}
                className="rounded-md bg-gradient-to-r from-lime-800 to-indigo-800 px-2 py-1 text-xs font-bold tracking-wide text-white"
              >
                {tag}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const allArticlesId = getAllArticleIds();
  return allArticlesId.map((articleId) => ({
    articleId: articleId,
  }));
}
