import { getSortedArticlesData } from "../lib/articles";
import { Search } from "./search";

export default function Page() {
  const allArticlesData = getSortedArticlesData();
  return <Search articles={allArticlesData} />;
}
