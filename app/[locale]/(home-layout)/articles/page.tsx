import { getSortedArticlesData, getAllArticleIds } from "@/app/lib/articles";
import { Metadata } from "next";
import TulisanContent from "@/app/components/TulisanContent";

export const metadata: Metadata = {
  title: "Writing - I Putu Deta Utama Putra",
  description: "All writing — from code to life.",
};

export default async function WritingPage() {
  const articlesId = getSortedArticlesData("id");
  const articlesEn = getSortedArticlesData("en");
  const articleIds = getAllArticleIds();

  return (
    <TulisanContent
      articlesByLocale={{ id: articlesId, en: articlesEn }}
      articleIds={articleIds}
    />
  );
}
