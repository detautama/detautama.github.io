import type { Metadata } from "next";
import "../../globals.css";
import { Header } from "../../server-components/Header";
import { TranslatedFooter } from "../../components/TranslatedFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://detautama.me/"),
  title: "I Putu Deta Utama Putra",
  description: "Thoughts on life, code, and everything in between",
};

export default function CleanLocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="site-shell">
      <Header />
      <main className="brand-container min-h-screen py-10 pb-32 md:pb-12">
        <div className="sao-panel mx-auto max-w-prose p-5 sm:p-8 md:p-10">
          {children}
        </div>
      </main>
      <TranslatedFooter />
    </div>
  );
}
