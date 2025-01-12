import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostData {
  id: string;
  date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For other frontmatter fields
}

const postsDirectory = path.join(process.cwd(), "/app/posts");

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  console.log("fileNames", fileNames);
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      date: matterResult.data.date,
      ...(matterResult.data as Omit<PostData, "id" | "date">),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
