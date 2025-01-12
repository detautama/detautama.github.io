import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleData {
  id: string;
  date: string;
  title: string;
  description: string;
  content: string;
  tags: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For other frontmatter fields
}

const postsDirectory = path.join(process.cwd(), "/app/articles");

export function getSortedArticlesData(): ArticleData[] {
  // Get file names under /posts, ignore directories
  const fileNames = fs.readdirSync(postsDirectory).filter((fileName) => {
    return fileName.endsWith(".md");
  });
  const allArticlesData: ArticleData[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // Extract the markdown content
    const content = matter(fileContents).content;
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      content,
      tags: matterResult.data.tags,
      ...(matterResult.data as Omit<
        ArticleData,
        "id" | "date" | "description" | "content" | "tags" | "title"
      >),
    };
  });

  // Sort articles by date
  return allArticlesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllArticleIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory).filter((fileName) => {
    return fileName.endsWith(".md");
  });

  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getArticleData(id: string): ArticleData {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    content: matterResult.content,
    tags: matterResult.data.tags,
    ...(matterResult.data as Omit<
      ArticleData,
      "id" | "date" | "description" | "content" | "tags" | "title"
    >),
  };
}
