import { promises as fs } from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

const postsPath = path.join(process.cwd(), "data", "posts.json");

export async function getAllPosts(): Promise<Post[]> {
  const raw = await fs.readFile(postsPath, "utf-8");
  const posts = JSON.parse(raw) as Post[];
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}
