import type { Metadata } from "next";
import { EB_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ScrollToTop } from "./ScrollToTop";
import { LocaleProvider } from "./lib/LocaleContext";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://detautama.me/"),
  title: "I Putu Deta Utama Putra",
  description: "Thoughts on life, code, and everything in between.",
  openGraph: {
    url: "https://detautama.me/",
    type: "website",
    title: "I Putu Deta Utama Putra",
    description: "Thoughts on life, code, and everything in between.",
  },
  other: {
    "og:logo": "https://detautama.me/deta.png",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <GoogleAnalytics gaId="G-74BLMRKJD6" />
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <LocaleProvider initialLocale="id">
              {children}
              <ScrollToTop />
            </LocaleProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
