export default function AboutPage() {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">About</h1>
      <p>
        This site demonstrates several Next.js patterns chosen to give an
        architecture analysis agent something to chew on:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>App Router with a mix of server and client components.</li>
        <li>Server Actions for todo mutations (no separate API layer).</li>
        <li>A Node-runtime route handler that proxies a third-party API.</li>
        <li>Static generation of blog posts via <code>generateStaticParams</code>.</li>
        <li>React Context for theme state, persisted to <code>localStorage</code>.</li>
        <li>JSON files on disk as the persistence layer.</li>
      </ul>
    </article>
  );
}
