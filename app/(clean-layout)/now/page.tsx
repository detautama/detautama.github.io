import { Metadata } from "next";
import NowContent from "@/app/components/NowContent";

export const metadata: Metadata = {
  title: "Sekarang - I Putu Deta Utama Putra",
  description:
    "Apa yang sedang aku jalani sekarang — pekerjaan, bacaan, dan pikiran.",
};

export default function NowPage() {
  return <NowContent />;
}
