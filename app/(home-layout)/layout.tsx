import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { getTopTags } from "../lib/articles";
import { Header } from "../server-components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://detautama.me/"),
  title: "I Putu Deta Utama Putra",
  description: "A blog on JavaScript, web, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topTags = getTopTags({
    limit: 5,
  });
  return (
    <div className="mx-auto max-w-4xl px-4">
      <Header />
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-3/4">{children}</div>
        <div id="sidebar" className="flex w-full flex-col gap-4 md:w-1/4">
          <TopCategories topTags={topTags} />
        </div>
      </div>
      <footer
        id="footer"
        className="mt-10 w-full rounded-md py-2 text-center text-xs font-bold"
      >
        Thank you for visiting! - I Putu Deta Utama Putra
      </footer>
    </div>
  );
}

const TopCategories: React.FC<{ topTags: string[] }> = ({ topTags }) => {
  return (
    <div className="rounded-md border-4 border-lime-800">
      <div className="bg-lime-800 p-2 text-white">
        <h2 className="font-bold">Top Categories</h2>
      </div>
      <div className="flex flex-wrap gap-1 p-2">
        {topTags.map((tag) => (
          <Link href={`/tag/#${tag}`} key={tag}>
            <div className="rounded-md bg-lime-700 p-1 text-xs font-bold text-white">
              {tag}
            </div>
          </Link>
        ))}
        <Link href={`/tag`}>
          <div className="rounded-md bg-lime-700 px-3 py-1 text-xs font-bold text-white">
            →
          </div>
        </Link>
      </div>
    </div>
  );
};
