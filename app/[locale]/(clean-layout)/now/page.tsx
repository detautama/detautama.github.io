import { Metadata } from "next";
import NowContent from "@/app/components/NowContent";

export const metadata: Metadata = {
  title: "Now - I Putu Deta Utama Putra",
  description: "What I'm doing now — work, reading, and thoughts.",
};

export default function NowPage() {
  return <NowContent />;
}
