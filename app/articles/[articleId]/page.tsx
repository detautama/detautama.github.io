import { getAllArticleIds, getArticleData } from "@/app/lib/articles";
import Link from "next/link";
import Image from "next/image";
import { MarkdownRenderer } from "@/app/MarkdownRenderer";
import { Metadata } from "next";

type Props = {
  params: Promise<{ articleId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articleId = (await params).articleId;
  const articleData = getArticleData(articleId);
  return {
    title: articleData.title,
    description: articleData.description,
  };
}

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
      <h1 className="text-center text-3xl font-bold">{artileData.title}</h1>
      <div className="mb-10" />
      <article className="prose dark:prose-invert">
        <MarkdownRenderer>{artileData.content}</MarkdownRenderer>
      </article>
      <div className="mb-5" />
      <div className="flex items-center justify-between">
        <time className="text-gray-500 dark:text-gray-300">
          {artileData.date}
        </time>
        <div className="flex items-center justify-center gap-2 text-center">
          <Link
            href={`/tag/#${artileData.tag}`}
            className="flex gap-1 rounded-md bg-gradient-to-r from-lime-800 to-indigo-800 px-2 py-1 text-xs font-bold tracking-wide text-white"
          >
            <Image src="/images/tag.svg" alt="tag" width={16} height={16} />
            {artileData.tag}
          </Link>
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
