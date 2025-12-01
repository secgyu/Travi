import fs from "fs";
import path from "path";
import matter from "gray-matter";

const guidesDirectory = path.join(process.cwd(), "content/guides");

export interface GuideMetadata {
  title: string;
  description: string;
  category: string;
  image: string;
  readTime: string;
  views: string;
  tags: string[];
  date: string;
  author: string;
  relatedGuides: Array<{
    id: string;
    title: string;
    image: string;
  }>;
}

export interface Guide {
  slug: string;
  metadata: GuideMetadata;
  content: string;
}

export async function getGuide(slug: string): Promise<Guide | null> {
  try {
    const fullPath = path.join(guidesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data as GuideMetadata,
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllGuides(): Promise<Guide[]> {
  const fileNames = fs.readdirSync(guidesDirectory);
  const guides = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        return getGuide(slug);
      })
  );

  return guides.filter((guide): guide is Guide => guide !== null);
}

export async function getAllGuideSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(guidesDirectory);
  return fileNames.filter((fileName) => fileName.endsWith(".mdx")).map((fileName) => fileName.replace(/\.mdx$/, ""));
}

