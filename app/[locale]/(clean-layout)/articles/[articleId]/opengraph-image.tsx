import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { getAllArticleIds, getArticleData } from "@/app/lib/articles";
import { PlantDecoration } from "@/app/lib/og-plant";

export const dynamic = "force-static";
export const alt = "Article OG Image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticleIds().map((articleId) => ({ locale: "en", articleId }));
}

type Props = {
  params: Promise<{ locale: string; articleId: string }>;
};

export default async function OGImage({ params }: Props) {
  const { articleId } = await params;
  const articleData = getArticleData(articleId, "en");

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
          width={170}
          height={170}
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
            marginLeft: 55,
            flex: 1,
            height: "100%",
            paddingTop: "60px",
            paddingBottom: "60px",
          }}
        >
          <div style={{ fontSize: 18, color: "#3B7A57", fontWeight: 600 }}>
            detautama.me
          </div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: "#1C1C1C",
              lineHeight: 1.25,
              marginTop: 20,
              flex: 1,
              overflow: "hidden",
            }}
          >
            {articleData.title}
          </div>
          {articleData.tags?.length > 0 && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {articleData.tags.slice(0, 4).map((tag: string) => (
                <div
                  key={tag}
                  style={{
                    background: "#3B7A57",
                    color: "white",
                    borderRadius: 20,
                    padding: "5px 16px",
                    fontSize: 17,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
        <PlantDecoration />
      </div>
    ),
    { ...size }
  );
}
