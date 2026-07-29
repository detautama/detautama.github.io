import type { Metadata } from "next";
import GameClient from "./GameClient";

export const metadata: Metadata = {
  title: "Temukan Benda — I Putu Deta Utama Putra",
  description:
    "Game interaktif: perhatikan gambar dengan seksama dan klik lokasi benda tersembunyi!",
};

export default function GamePage() {
  return <GameClient />;
}
