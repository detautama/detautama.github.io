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
}
