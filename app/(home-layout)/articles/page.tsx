import { getSortedArticlesData, getAllArticleIds } from "@/app/lib/articles";
import { Metadata } from "next";
import TulisanContent from "@/app/components/TulisanContent";

export const metadata: Metadata = {
  title: "Tulisan - I Putu Deta Utama Putra",
  description: "Semua catatan — dari kode sampai cerita hidup.",
};

export default async function ArticlesPage() {
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
