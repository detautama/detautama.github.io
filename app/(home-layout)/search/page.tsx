import { getSortedArticlesData } from "../../lib/articles";
import { Search } from "./SearchArticle";

export default function Page() {
  const articlesId = getSortedArticlesData("id");
  const articlesEn = getSortedArticlesData("en");
  
  return <Search articlesByLocale={{ id: articlesId, en: articlesEn }} />;
}
