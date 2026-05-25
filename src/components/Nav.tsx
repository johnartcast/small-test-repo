import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <div className="flex gap-4 text-sm">
          <Link href="/" className="font-semibold">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/todos">Todos</Link>
          <Link href="/weather">Weather</Link>
          <Link href="/about">About</Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
