import Link from "next/link";

const links = [
  { href: "/blog", label: "Read the blog" },
  { href: "/todos", label: "Manage todos" },
  { href: "/weather", label: "Check the weather" },
  { href: "/about", label: "About this site" },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Small Test Site</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        A tiny Next.js 14 app used to exercise architecture analysis tools.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded border border-gray-200 p-4 hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
            >
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
