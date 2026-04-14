import { getAllArticleIds, getArticleData } from "@/app/lib/articles";
import fs from "node:fs";
import path from "node:path";
import { Metadata } from "next";
import ArticleContent from "@/app/components/ArticleContent";

type Props = {
  params: Promise<{ articleId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articleId = (await params).articleId;
  const articleData = getArticleData(articleId, "id");
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
  const articleIdData = getArticleData(articleId, "id");
  const articleEnData = getArticleData(articleId, "en");
  const hasImage = fs.existsSync(path.join(process.cwd(), "public", "og-images", `${articleId}.png`));
  
  return (
    <ArticleContent
      articleId={articleId}
      articlesByLocale={{
        id: articleIdData,
        en: articleEnData,
      }}
      hasImage={hasImage}
    />
  );
}

export async function generateStaticParams() {
  const allArticlesId = getAllArticleIds();
  return allArticlesId.map((articleId) => ({
    articleId: articleId,
  }));
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
