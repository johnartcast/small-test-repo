# Adopt Async/Await Concurrency Model for Server-Side Data Fetching: Server Side Data

These rules are ALWAYS ACTIVE for all server-side code including React Server Components in the app/ directory, Next.js API routes and route handlers, data access layer functions in lib/ directories, Server Actions for form handling and mutations, and utility functions that perform I/O operations.

### Rules

- **R-ASYNC-001** MUST: All server-side data fetching operations MUST use async/await syntax rather than raw Promise chains or callbacks.

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
Claude Code MUST NOT skip or defer verification. ESLint violations block PR merge in CI pipeline. Code review feedback requires refactoring to async/await before approval. Approved exceptions must be documented in code comments with reference to exception ID (EX-001 or EX-002) and reviewed by tech lead or architect.
</enforcement>