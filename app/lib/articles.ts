import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleData {
  id: string;
  date: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  featured: boolean;
  availableLocales: ("id" | "en")[];
  currentLocale: "id" | "en";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For other frontmatter fields
}

const postsDirectory = path.join(process.cwd(), "/app/articles");

export function getSortedArticlesData(locale: "id" | "en" = "id"): ArticleData[] {
  const ids = getAllArticleIds();
  const allArticlesData = ids.map((id) => getArticleData(id, locale));

  // Sort articles by date
  return allArticlesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllArticleIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory).filter((fileName) => {
    return fileName.endsWith(".md");
  });

  const ids = new Set(
    fileNames.map((fileName) =>
      fileName.replace(/\.(id|en)\.md$/, "").replace(/\.md$/, "")
    )
  );

  return Array.from(ids);
}

export function getArticleData(id: string, locale: "id" | "en" = "id"): ArticleData {
  const fileNames = fs.readdirSync(postsDirectory);
  
  // Find available locales for this ID
  const availableLocales = fileNames
    .filter(f => f.startsWith(id) && f.endsWith(".md"))
    .map(f => {
      if (f === `${id}.id.md`) return "id";
      if (f === `${id}.en.md`) return "en";
      if (f === `${id}.md`) {
        // We need to guess or have a default. 
        // For now, assume .md files are the "primary" one.
        // We'll treat them as the language they are written in.
        return null;
      }
      return null;
    })
    .filter((l): l is "id" | "en" => l !== null);

  // Determine which file to load
  let fileNameToLoad = `${id}.${locale}.md`;
  let currentLocale = locale;

  if (!fs.existsSync(path.join(postsDirectory, fileNameToLoad))) {
    // Fallback to .md
    if (fs.existsSync(path.join(postsDirectory, `${id}.md`))) {
      fileNameToLoad = `${id}.md`;
      // If we fallback to .md, we should check what language it is.
      // For this blog, most .md are ID, but some are EN.
      // We can add a 'lang' field in frontmatter if needed, but for now let's keep it simple.
    } else {
      // Fallback to any available language
      const anyFile = fileNames.find(f => f.startsWith(id) && f.endsWith(".md"));
      if (anyFile) {
        fileNameToLoad = anyFile;
        if (anyFile.includes(".en.md")) currentLocale = "en";
        if (anyFile.includes(".id.md")) currentLocale = "id";
      }
    }
  }

  const fullPath = path.join(postsDirectory, fileNameToLoad);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Handle both old 'tag' field and new 'tags' field
  let tags: string[] = [];
  if (matterResult.data.tags && Array.isArray(matterResult.data.tags)) {
    tags = matterResult.data.tags;
  } else if (matterResult.data.tag) {
    tags = [matterResult.data.tag];
  }

  // Final locale check from frontmatter if present
  if (matterResult.data.lang) {
    currentLocale = matterResult.data.lang;
  }

  // Combine the data with the id
  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    content: matterResult.content,
    tags,
    featured: matterResult.data.featured,
    availableLocales: availableLocales.length > 0 ? availableLocales : (matterResult.data.lang ? [matterResult.data.lang] : ["id"]),
    currentLocale,
    ...(matterResult.data as Omit<
      ArticleData,
      "id" | "date" | "description" | "content" | "tags" | "title" | "featured" | "availableLocales" | "currentLocale"
    >),
  };
}

export function getTopTags({ limit = 5, locale = "id" }: { limit?: number; locale?: "id" | "en" } = {}): string[] {
  const allArticlesData = getSortedArticlesData(locale);
  const tags = allArticlesData.reduce(
    (acc, article) => {
      if (article.tags && Array.isArray(article.tags)) {
        for (const tag of article.tags) {
          acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
        }
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.keys(tags)
    .sort((a, b) => tags[b] - tags[a])
    .slice(0, limit);
}
