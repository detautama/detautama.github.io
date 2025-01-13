import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import { getTopTags } from "./lib/articles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto max-w-4xl">
          <div id="header" className="flex items-center justify-between py-5">
            <div id="header-left" className="flex items-center gap-4">
              <Link href="/">
                <Image
                  className="shimmer"
                  src="/deta.png"
                  alt="profile image"
                  width={70}
                  height={70}
                />
              </Link>
              <div id="tagline">
                <Link href="/" className="text-xl font-bold hover:underline">
                  I Putu Deta Utama Putra
                </Link>
                <p>A blog on JavaScript, web and more</p>
              </div>
            </div>
            <div id="header-right" className="flex gap-4">
              <a href="#docs">Docs</a>
              <a href="#github">GitHub</a>
              <Image
                src="images/search.svg"
                alt="search icon"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className="default_bg mb-6 h-2 w-full rounded-md"></div>
          <div className="flex gap-4">
            <div className="w-3/4">{children}</div>
            <div id="sidebar" className="flex w-1/4 flex-col gap-4">
              <TopCategories topTags={topTags} />
              <div className="h-48 rounded-md border-4 border-lime-800">
                Other things to promote
              </div>
            </div>
          </div>
          <footer
            id="footer"
            className="mt-10 w-full rounded-md py-2 text-center text-xs font-bold"
          >
            © 2021 I Putu Deta Utama Putra. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}

const TopCategories: React.FC<{ topTags: string[] }> = ({ topTags }) => {
  return (
    <div className="rounded-md border-4 border-lime-800">
      <div className="bg-lime-800 p-2 text-white">
        <h2 className="font-bold">Top Categories</h2>
      </div>
      <ul className="flex flex-wrap gap-1 p-2">
        {topTags.map((tag) => (
          <Link href={`/tag/#${tag}`} key={tag}>
            <li className="rounded-md bg-lime-700 p-1 text-xs font-bold text-white">
              {tag}
            </li>
          </Link>
        ))}
        <Link href={`/tag`}>
          <li className="rounded-md bg-lime-700 px-3 py-1 text-xs font-bold text-white">
            →
          </li>
        </Link>
      </ul>
    </div>
  );
};
