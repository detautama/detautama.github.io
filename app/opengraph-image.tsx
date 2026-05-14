import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { PlantDecoration } from "@/app/lib/og-plant";

export const dynamic = "force-static";
export const alt = "I Putu Deta Utama Putra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const profileImg = readFileSync(
    path.join(process.cwd(), "public", "deta.png")
  );
  const profileSrc = `data:image/png;base64,${profileImg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #F5F3EE 0%, #E4E0D8 100%)",
          padding: "60px 70px",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          alt=""
          src={profileSrc}
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
            border: "5px solid #3B7A57",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 60,
            flex: 1,
          }}
        >
          <div
            style={{ fontSize: 52, fontWeight: 700, color: "#1C1C1C", lineHeight: 1.2 }}
          >
            I Putu Deta Utama Putra
          </div>
          <div
            style={{ fontSize: 26, color: "#5A5E52", marginTop: 24, lineHeight: 1.5 }}
          >
            Thoughts on life, code, and everything in between.
          </div>
          <div
            style={{ fontSize: 22, color: "#3B7A57", fontWeight: 600, marginTop: 40 }}
          >
            detautama.me
          </div>
        </div>
        <PlantDecoration />
      </div>
    ),
    { ...size }
  );
}
