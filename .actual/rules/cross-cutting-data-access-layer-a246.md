# Adopt Async/Await Concurrency Model for Server-Side Data Fetching: Data Access Layer

These rules are ALWAYS ACTIVE for React Server Components in app/ directory, Next.js API routes and route handlers, data access layer functions in lib/ directories, Server Actions for form handling and mutations, and utility functions that perform I/O operations.

### Rules

- **R-ASYNC-001** SHOULD: Data access layer functions (e.g., in lib/ directories) SHOULD be implemented as async functions returning Promises.
- **R-ASYNC-002** MUST: Avoid raw Promise chains (.then()/.catch()) in favor of async/await syntax for improved readability and maintainability.
- **R-ASYNC-003** SHOULD: Use try-catch blocks for error handling in async functions rather than .catch() chains.
- **R-ASYNC-004** SHOULD: Coordinate parallel operations using Promise.all() for fail-fast behavior or Promise.allSettled() when partial results are acceptable.
- **R-ASYNC-005** SHOULD: Use TypeScript's async function return type annotations (Promise<T>) to ensure type safety across async boundaries.
- **R-ASYNC-006** SHOULD: Document async function behavior in JSDoc comments, especially regarding error handling and return values.
- **R-ASYNC-007** MAY: Use Promise.race() for timeout patterns: Promise.race([fetchData(), timeout(5000)]).

### Verify

```bash
# Count async function usage
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Count raw Promise chains (should be minimal)
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l

# Verify ESLint rules pass
eslint src/ --rule '@typescript-eslint/no-floating-promises: error' --rule '@typescript-eslint/promise-function-async: error'
```

**Accept when:**
- All server components, API routes, and data access functions use async/await syntax (first verify command shows significant usage)
- Raw Promise chains (.then/.catch) are minimal or absent in application code (second verify command shows low count)
- ESLint checks pass with no floating promises or missing async declarations (third verify command exits with code 0)

<enforcement>
Clause Code MUST NOT skip or defer verification. ESLint violations block PR merge in CI pipeline. Code review feedback requires refactoring to async/await before approval. Approved exceptions must be tracked with reference to exception ID (EX-001 or EX-002) and reviewed by tech lead or architect.
</enforcement>