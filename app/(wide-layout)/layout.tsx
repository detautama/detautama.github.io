import type { Metadata } from "next";
import "../globals.css";
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
  return (
    <div className="mx-auto max-w-4xl px-4">
      <Header />
      <div>{children}</div>
      <footer
        id="footer"
        className="mt-10 w-full rounded-md py-2 text-center text-xs font-bold"
      >
        Thank you for visiting! - I Putu Deta Utama Putra
      </footer>
    </div>
  );
}
