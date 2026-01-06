import { getAllArticleIds, getArticleData } from "@/app/lib/articles";
import Link from "next/link";
import Image from "next/image";
import { MarkdownRenderer } from "@/app/MarkdownRenderer";
import { Metadata } from "next";
import Comment from "./Comment";
import ShareButton from "./ShareButton";

type Props = {
  params: Promise<{ articleId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articleId = (await params).articleId;
  const articleData = getArticleData(articleId);
  return {
    title: articleData.title,
    description: articleData.description,
    openGraph: {
      images: `/og-images/${articleId}.png`,
    },
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
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        {artileData.title}
      </h1>
      <div className="mb-5" />
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <time className="text-gray-500 dark:text-gray-300">
          {artileData.date}
        </time>
        <div className="flex flex-wrap items-center justify-center gap-2 text-center">
          {artileData.tags.map((tag) => (
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
      </div>
      <div className="mb-6" />
      <div className="mb-6">
        <Image
          src={`/og-images/${articleId}.png`}
          alt={artileData.title}
          width={1200}
          height={630}
          className="h-auto w-full rounded-md"
          priority
        />
      </div>
      <WarningIfArticleIsOld date={artileData.date} />
      <div className="mb-10" />
      <article className="prose dark:prose-invert">
        <MarkdownRenderer>{artileData.content}</MarkdownRenderer>
      </article>
      <ShareButton />
      <Comment />
    </div>
  );
}

export async function generateStaticParams() {
  const allArticlesId = getAllArticleIds();
  return allArticlesId.map((articleId) => ({
    articleId: articleId,
  }));
}

const WarningIfArticleIsOld = ({ date }: { date: string }) => {
  const now = new Date();
  const articleDate = new Date(date);
  const diff = now.getTime() - articleDate.getTime();
  const diffDays = diff / (1000 * 60 * 60 * 24);
  if (diffDays > 365) {
    return (
      <div className="rounded-md border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700">
        <p className="font-bold">This article is old</p>
        <p>
          This article was written more than a year ago. Some of the information
          might be outdated.
        </p>
      </div>
    );
  }
};
