import type { Metadata } from "next";
import "../globals.css";
import { Header } from "../server-components/Header";

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
      <footer className="brand-container py-8 pb-28 text-center md:pb-8">
        <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text/70">
          Matur Suksma! Terima kasih sudah mampir.
        </p>
      </footer>
    </div>
  );
}
