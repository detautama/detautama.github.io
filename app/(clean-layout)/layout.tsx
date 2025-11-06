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
    <div>
      <Header />
      <main className="claude-container min-h-screen py-8 pb-32 md:pb-8">
        <div className="mx-auto max-w-prose">
          {children}
        </div>
      </main>
      <footer className="claude-container py-8 pb-28 md:pb-8 text-center">
        <p className="text-sm text-claude-text-secondary dark:text-claude-dark-text/70">
          Thank you for visiting! - I Putu Deta Utama Putra
        </p>
      </footer>
    </div>
  );
}