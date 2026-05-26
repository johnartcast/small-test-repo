# Adopt Async/Await Concurrency Model for Server-Side Data Fetching: Route Handlers That

These rules are ALWAYS ACTIVE for all React Server Components in the app/ directory, Next.js API routes and route handlers, data access layer functions in lib/ directories, Server Actions for form handling and mutations, and utility functions that perform I/O operations.

### Rules

- **R-ASYNC-001** MUST: API route handlers that perform I/O operations MUST use async/await for all asynchronous operations.
- **R-ASYNC-002** MUST: All server components, API routes, and data access functions MUST use async/await syntax instead of raw Promise chains (.then/.catch) or callback-based patterns.
- **R-ASYNC-003** SHOULD: Use TypeScript's async function return type annotations (Promise<T>) to ensure type safety across async boundaries.
- **R-ASYNC-004** SHOULD: Implement consistent error handling patterns using try-catch blocks for recoverable errors, allowing critical errors to propagate to error boundaries.
- **R-ASYNC-005** SHOULD: For parallel operations, prefer Promise.all() for fail-fast behavior or Promise.allSettled() when partial results are acceptable.
- **R-ASYNC-006** MAY: Use Promise.race() for timeout patterns (e.g., Promise.race([fetchData(), timeout(5000)])).
- **R-ASYNC-007** MAY: Document async function behavior in JSDoc comments, especially regarding error handling and return values.

### Verify

```bash
# Count async/await usage in source files
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Count raw Promise chains to identify legacy patterns
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l

# Run ESLint with async/await enforcement rules
eslint src/ --rule '@typescript-eslint/no-floating-promises: error' --rule '@typescript-eslint/promise-function-async: error'
```

**Accept when:**
- All server components, API routes, and data access functions use async/await syntax (verify command 1 shows significant usage)
- Raw Promise chains (.then/.catch) are minimal or absent in application code (verify command 2 shows low count)
- ESLint checks pass with no floating promises or missing async declarations (verify command 3 exits with code 0)

<enforcement>
Claude Code MUST NOT skip or defer verification. All three verification commands MUST pass before accepting code that modifies server-side data fetching patterns.
</enforcement>