import { getSortedArticlesData } from "../lib/articles";
import { Search } from "./Search";

export default function Page() {
  const allArticlesData = getSortedArticlesData();
  return <Search articles={allArticlesData} />;
}
