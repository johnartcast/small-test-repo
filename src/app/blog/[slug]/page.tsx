import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return (
    <article className="space-y-4">
      <Link href="/blog" className="text-sm text-blue-600">
        ← Back to blog
      </Link>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <p className="leading-relaxed">{post.body}</p>
    </article>
  );
}
