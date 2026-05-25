import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li
            key={p.slug}
            className="rounded border border-gray-200 p-4 dark:border-gray-800"
          >
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold">
              {p.title}
            </Link>
            <p className="text-sm text-gray-500">{p.date}</p>
            <p className="mt-2">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
