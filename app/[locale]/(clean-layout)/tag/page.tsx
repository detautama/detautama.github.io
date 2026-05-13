import { getSortedArticlesData } from "@/app/lib/articles";
import { Metadata } from "next";
import { TagContent } from "@/app/(clean-layout)/tag/TagContent";

export const metadata: Metadata = {
  title: "Tags - I Putu Deta Utama Putra",
  description: "A collection of tags used in articles",
};

export default async function Page() {
  const articlesId = getSortedArticlesData("id");
  const articlesEn = getSortedArticlesData("en");

  return (
    <div>
      <TagContent articlesByLocale={{ id: articlesId, en: articlesEn }} />
    </div>
  );
}
