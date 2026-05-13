import { Metadata } from "next";
import AboutContent from "@/app/components/AboutContent";

export const metadata: Metadata = {
  title: "About - I Putu Deta Utama Putra",
  description: "Meet Deta — a developer, father, and thinker from Bali.",
};

export default function Page() {
  return <AboutContent />;
}
