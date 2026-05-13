import { getSortedArticlesData } from "@/app/lib/articles";
import { Search } from "@/app/(home-layout)/search/SearchArticle";

export default function Page() {
  const articlesId = getSortedArticlesData("id");
  const articlesEn = getSortedArticlesData("en");

  return <Search articlesByLocale={{ id: articlesId, en: articlesEn }} />;
}
