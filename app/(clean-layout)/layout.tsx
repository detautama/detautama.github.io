import type { Metadata } from "next";
import Image from "next/image";
import "../globals.css";
import Link from "next/link";
import { ToggleDarkMode } from "../ToggleDarkMode";

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
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div
        id="header"
        className="flex flex-col items-center justify-between gap-4 py-5 md:flex-row"
      >
        <div
          id="header-left"
          className="flex flex-col items-center gap-4 md:flex-row"
        >
          <Link href="/">
            <Image
              className="shimmer"
              src="/deta.png"
              alt="profile image"
              width={70}
              height={70}
            />
          </Link>
          <div id="tagline" className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold hover:underline">
              I Putu Deta Utama Putra
            </Link>
            <small className="mb-3 block">ᬇ​ᬧᬸᬢᬸ​ᬤᬾᬢ​ᬉᬢᬫ​ᬧᬸᬢ᭄ᬭ</small>
            <p>A blog on JavaScript, web, and more</p>
          </div>
        </div>
        <div id="header-right" className="flex gap-4">
          <Link href={"/search"}>
            <Image
              src="/images/search.svg"
              alt="search icon"
              width={20}
              height={20}
            />
          </Link>
          <ToggleDarkMode />
        </div>
      </div>
      <div className="default_bg mb-6 flex w-full justify-center gap-6 rounded-md p-0.5 font-bold">
        <Link href="/">Articles</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
      </div>
      <div className="mx-auto max-w-[65ch]">{children}</div>
      <footer
        id="footer"
        className="mt-10 w-full rounded-md py-2 text-center text-xs font-bold"
      >
        Thank you for visiting! - I Putu Deta Utama Putra
      </footer>
    </div>
  );
}
