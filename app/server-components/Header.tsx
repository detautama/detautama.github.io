import Link from "next/link";
import { ToggleDarkMode } from "../ToggleDarkMode";
import Image from "next/image";

export const Header = () => {
  return (
    <>
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
    </>
  );
};
