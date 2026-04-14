import type { Metadata } from "next";
import "../globals.css";
import { Header } from "../server-components/Header";
import { TranslatedFooter } from "../components/TranslatedFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://detautama.me/"),
  title: "I Putu Deta Utama Putra",
  description: "Thoughts on life, code, and everything in between",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="brand-container min-h-screen py-8 pb-32 md:pb-8">
        <div className="mx-auto max-w-prose">{children}</div>
      </main>
      <TranslatedFooter />
    </div>
  );
}
