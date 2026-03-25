import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf";
const FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";

console.log("Loading fonts...");
const fontRegular = fs.readFileSync(FONT_REG);
const fontBold = fs.readFileSync(FONT_BOLD);
console.log("Fonts loaded OK");

const ARTICLES_DIR = path.join(ROOT, "app/articles");
const OG_DIR = path.join(ROOT, "public/og-images");
if (!fs.existsSync(OG_DIR)) fs.mkdirSync(OG_DIR, { recursive: true });

function getGradient(tags, title) {
  const text = ((tags || []).join(" ") + " " + (title || "")).toLowerCase();
  if (text.includes("ai") || text.includes("artificial")) return ["#0f172a", "#1e3a5f"];
  if (text.includes("react") || text.includes("frontend") || text.includes("css")) return ["#0f2027", "#203a43"];
  if (text.includes("typescript") || text.includes("javascript")) return ["#0d1b2a", "#1a3a5c"];
  if (text.includes("karir") || text.includes("mindset") || text.includes("skill") || text.includes("programmer")) return ["#1a0533", "#2d1b69"];
  if (text.includes("security") || text.includes("keamanan")) return ["#1a0000", "#3b0000"];
  if (text.includes("test") || text.includes("debug")) return ["#001a0d", "#003319"];
  return ["#0f172a", "#1e293b"];
}

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function generateOG(articleId, title, tags) {
  const [c1, c2] = getGradient(tags, title);
  const lines = wrapText(title, 28);
  const fontSize = lines.length <= 2 ? 70 : lines.length === 3 ? 62 : 54;
  const tagLabel = (tags && tags.length > 0) ? tags[0] : "Article";

  // Build title children - must be flat spans in a flex column container
  const titleChildren = lines.map(line => ({
    type: "div",
    props: {
      style: { display: "flex" },
      children: [{
        type: "span",
        props: {
          style: { color: "#ffffff", fontSize, fontWeight: 700, lineHeight: 1.2 },
          children: line
        }
      }]
    }
  }));

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "60px 80px",
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
          fontFamily: "DejaVu Sans",
        },
        children: [
          // Tag badge
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "8px 20px",
              },
              children: [{
                type: "span",
                props: {
                  style: { color: "#94a3b8", fontSize: 24, fontWeight: 400 },
                  children: tagLabel.toUpperCase()
                }
              }]
            }
          },
          // Title block
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                flex: 1,
                justifyContent: "center",
                paddingTop: "24px",
                paddingBottom: "24px",
              },
              children: titleChildren
            }
          },
          // Footer
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: { color: "#64748b", fontSize: 22, fontWeight: 400 },
                    children: "detautama.github.io"
                  }
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      width: 80,
                      height: 4,
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: "2px",
                    },
                    children: []
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "DejaVu Sans", data: fontRegular, weight: 400, style: "normal" },
        { name: "DejaVu Sans", data: fontBold, weight: 700, style: "normal" },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();
  fs.writeFileSync(path.join(OG_DIR, `${articleId}.png`), png);
  console.log(`Generated: ${articleId}.png`);
}

async function main() {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith(".md"));
  let generated = 0, skipped = 0, failed = 0;

  for (const file of files) {
    const articleId = file.replace(/\.md$/, "");
    const outputPath = path.join(OG_DIR, `${articleId}.png`);
    if (fs.existsSync(outputPath)) { skipped++; continue; }

    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    const { data } = matter(content);
    const title = data.title || articleId;
    const tags = data.tags || [];

    try {
      await generateOG(articleId, title, tags);
      generated++;
    } catch (err) {
      console.error(`Failed: ${articleId} - ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone! Generated: ${generated}, Skipped: ${skipped}, Failed: ${failed}`);
}

main().catch(console.error);
