import { getSortedArticlesData } from "../lib/articles";
import { Search } from "./SearchArticle";

export default function Page() {
  const allArticlesData = getSortedArticlesData();
  return <Search articles={allArticlesData} />;
}
