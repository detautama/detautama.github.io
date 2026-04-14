import { Metadata } from "next";
import AboutContent from "@/app/components/AboutContent";

export const metadata: Metadata = {
  title: "Tentang - I Putu Deta Utama Putra",
  description: "Mengenal Deta — seorang developer, ayah, dan pemikir dari Bali.",
};

export default function Page() {
  return <AboutContent />;
}
