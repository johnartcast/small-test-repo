# Adopt Async/Await Concurrency Model for Server-Side Data Fetching: Server Actions Use

These rules are ALWAYS ACTIVE for all server-side code including React Server Components, Next.js API routes, data access layer functions, Server Actions, and utility functions that perform I/O operations.

### Rules

- **R-ASYNC-001** MAY: Server Actions MAY use async/await syntax for form submissions and mutations following the same patterns as server components and API routes.

### Verify

```bash
# Count async/await usage in server-side code
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Count raw Promise chains in application code (should be minimal)
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l

# Verify ESLint rules pass for async/await enforcement
eslint src/ --rule '@typescript-eslint/no-floating-promises: error' --rule '@typescript-eslint/promise-function-async: error'
```

**Accept when:**
- All server components, API routes, and data access functions use async/await syntax (verify command 1 shows significant usage)
- Raw Promise chains (.then/.catch) are minimal or absent in application code (verify command 2 shows low count)
- ESLint checks pass with no floating promises or missing async declarations (verify command 3 exits with code 0)

<enforcement>
Clause Code MUST NOT skip or defer verification. ESLint violations block PR merge in CI pipeline. Code review feedback requires refactoring to async/await before approval. Pattern detection violations generate warnings in CI with links to this ADR.
</enforcement>