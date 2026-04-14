import { getSortedArticlesData, getAllArticleIds } from "@/app/lib/articles";
import { Metadata } from "next";
import HomeContent from "@/app/components/HomeContent";

export const metadata: Metadata = {
  title: "Articles - I Putu Deta Utama Putra",
  description: "A collection of articles written by I Putu Deta Utama Putra",
};

export default async function Home() {
  const articlesId = getSortedArticlesData("id");
  const articlesEn = getSortedArticlesData("en");
  const articleIds = getAllArticleIds();

  return (
    <HomeContent
      articlesByLocale={{
        id: articlesId,
        en: articlesEn,
      }}
      articleIds={articleIds}
    />
  );
}
