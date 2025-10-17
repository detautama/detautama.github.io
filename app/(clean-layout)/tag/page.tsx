import { getSortedArticlesData } from "../../lib/articles";
import { Metadata } from "next";
import { TagContent } from "./TagContent";

export const metadata: Metadata = {
  title: "Tags - I Putu Deta Utama Putra",
  description: "A collection of tags used in articles",
};

export default async function Page() {
  const allArticlesData = getSortedArticlesData();
  // Flatten all tags from all articles
  const allTags = allArticlesData.flatMap((article) => article.tags);
  const uniqueTags = [...new Set(allTags)].sort();

  return (
    <div>
      <TagContent allArticlesData={allArticlesData} uniqueTags={uniqueTags} />
    </div>
  );
}
