# Adopt Async/Await Concurrency Model for Server-Side Data Fetching: Server Components Not

These rules are ALWAYS ACTIVE for all React Server Components in the app/ directory, Next.js API routes and route handlers, data access layer functions in lib/ directories, Server Actions for form handling and mutations, and utility functions that perform I/O operations.

### Rules

- **R-ASYNC-001** MUST NOT: Server components MUST NOT use callback-based async patterns (e.g., callback functions passed to setTimeout, fs.readFile with callbacks).
- **R-ASYNC-002** MUST: Use async/await syntax for all asynchronous operations in server-side code.
- **R-ASYNC-003** SHOULD: Implement consistent error handling patterns using try-catch blocks for recoverable errors.
- **R-ASYNC-004** SHOULD: Use Promise.all() for parallel operations requiring fail-fast behavior, or Promise.allSettled() when partial results are acceptable.
- **R-ASYNC-005** SHOULD: Document async function behavior in JSDoc comments, especially regarding error handling and return values.
- **R-ASYNC-006** MAY: Use Promise.race() for timeout patterns (e.g., Promise.race([fetchData(), timeout(5000)])).

### Verify

```bash
# Count async function usage
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Count raw Promise chains (should be minimal)
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l

# Run ESLint checks for floating promises and missing async declarations
eslint src/ --rule '@typescript-eslint/no-floating-promises: error' --rule '@typescript-eslint/promise-function-async: error'
```

**Accept when:**
- All server components, API routes, and data access functions use async/await syntax (verify command 1 shows significant usage)
- Raw Promise chains (.then/.catch) are minimal or absent in application code (verify command 2 shows low count)
- ESLint checks pass with no floating promises or missing async declarations (verify command 3 exits with code 0)

<enforcement>
Claude Code MUST NOT skip or defer verification. ESLint violations block PR merge in CI pipeline. Code review feedback requires refactoring to async/await before approval. Pattern detection violations generate warnings in CI with links to this ADR.
</enforcement>