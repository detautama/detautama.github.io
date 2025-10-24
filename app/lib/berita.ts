import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BeritaData {
  id: string;
  date: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  kategori: string;
  penulis: string;
  featured: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For other frontmatter fields
}

const beritaDirectory = path.join(process.cwd(), "/app/berita");

export function getSortedBeritaData(): BeritaData[] {
  // Get file names under /berita, ignore directories
  const fileNames = fs.readdirSync(beritaDirectory).filter((fileName) => {
    return fileName.endsWith(".md");
  });
  const allBeritaData: BeritaData[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(beritaDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // Extract the markdown content
    const content = matter(fileContents).content;
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Handle both old 'tag' field and new 'tags' field for backward compatibility
    let tags: string[] = [];
    if (matterResult.data.tags && Array.isArray(matterResult.data.tags)) {
      tags = matterResult.data.tags;
    } else if (matterResult.data.tag) {
      tags = [matterResult.data.tag];
    }

    // Combine the data with the id
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      content,
      tags,
      kategori: matterResult.data.kategori || "Umum",
      penulis: matterResult.data.penulis || "Admin Desa",
      featured: matterResult.data.featured || false,
      ...(matterResult.data as Omit<
        BeritaData,
        | "id"
        | "date"
        | "description"
        | "content"
        | "tags"
        | "title"
        | "kategori"
        | "penulis"
        | "featured"
      >),
    };
  });

  // Sort berita by date (newest first)
  return allBeritaData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllBeritaIds(): string[] {
  const fileNames = fs.readdirSync(beritaDirectory).filter((fileName) => {
    return fileName.endsWith(".md");
  });

  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getBeritaData(id: string): BeritaData {
  const fullPath = path.join(beritaDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Handle both old 'tag' field and new 'tags' field for backward compatibility
  let tags: string[] = [];
  if (matterResult.data.tags && Array.isArray(matterResult.data.tags)) {
    tags = matterResult.data.tags;
  } else if (matterResult.data.tag) {
    tags = [matterResult.data.tag];
  }

  // Combine the data with the id
  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    content: matterResult.content,
    tags,
    kategori: matterResult.data.kategori || "Umum",
    penulis: matterResult.data.penulis || "Admin Desa",
    featured: matterResult.data.featured || false,
    ...(matterResult.data as Omit<
      BeritaData,
      | "id"
      | "date"
      | "description"
      | "content"
      | "tags"
      | "title"
      | "kategori"
      | "penulis"
      | "featured"
    >),
  };
}

export function getTopKategoriBerita({ limit = 5 }): string[] {
  const allBeritaData = getSortedBeritaData();
  const categories = allBeritaData.reduce(
    (acc, berita) => {
      if (berita.kategori) {
        acc[berita.kategori] = acc[berita.kategori]
          ? acc[berita.kategori] + 1
          : 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.keys(categories)
    .sort((a, b) => categories[b] - categories[a])
    .slice(0, limit);
}

export function getBeritaByKategori(kategori: string): BeritaData[] {
  const allBeritaData = getSortedBeritaData();
  return allBeritaData.filter(
    (berita) => berita.kategori.toLowerCase() === kategori.toLowerCase()
  );
}

export function getFeaturedBerita(): BeritaData[] {
  const allBeritaData = getSortedBeritaData();
  return allBeritaData.filter((berita) => berita.featured);
}
