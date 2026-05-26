# Adopt Async/Await Concurrency Model for Server-Side Data Fetching: Independent Async Operations

These rules are ALWAYS ACTIVE for React Server Components in app/ directory, Next.js API routes and route handlers, data access layer functions in lib/ directories, Server Actions for form handling and mutations, and utility functions that perform I/O operations.

### Rules

- **R-ASYNC-001** SHOULD: Independent async operations SHOULD be executed in parallel using Promise.all() or Promise.allSettled() when appropriate.

### Verify

```bash
# Count async function declarations
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Count raw Promise chains (should be minimal)
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l

# Verify ESLint rules pass
eslint src/ --rule '@typescript-eslint/no-floating-promises: error' --rule '@typescript-eslint/promise-function-async: error'
```

**Accept when:**
- All server components, API routes, and data access functions use async/await syntax (verify command 1 shows significant usage)
- Raw Promise chains (.then/.catch) are minimal or absent in application code (verify command 2 shows low count)
- ESLint checks pass with no floating promises or missing async declarations (verify command 3 exits with code 0)

<enforcement>
Clause Code MUST NOT skip or defer verification. ESLint violations block PR merge in CI pipeline. Code review feedback requires refactoring to async/await before approval. Pattern detection violations generate warnings in CI with links to this ADR.
</enforcement>