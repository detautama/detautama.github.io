import { getSortedArticlesData } from "@/app/lib/articles";
import { Metadata } from "next";
import HomeContent from "@/app/components/HomeContent";

export const metadata: Metadata = {
  title: "I Putu Deta Utama Putra",
  description: "Ayah, pengendara sepeda, dan developer asal Bali.",
};

export default async function Home() {
  const articlesId = getSortedArticlesData("id");
  const articlesEn = getSortedArticlesData("en");

  return (
    <HomeContent
      articlesByLocale={{
        id: articlesId,
        en: articlesEn,
      }}
    />
  );
}
