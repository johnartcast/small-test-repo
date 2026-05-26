# Adopt Async/Await Concurrency Model for Server-Side Data Fetching: Async Functions Include

These rules are ALWAYS ACTIVE for all server-side code including React Server Components in the app/ directory, Next.js API routes and route handlers, data access layer functions in lib/ directories, Server Actions for form handling and mutations, and utility functions that perform I/O operations.

### Rules

- **R-ASYNC-001** MUST: All async functions MUST include proper error handling using try-catch blocks or allow errors to propagate to error boundaries.

### Verify

```bash
# Count async function declarations in source
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
Claude Code MUST NOT skip or defer verification. All async functions must be reviewed for proper error handling compliance before code is accepted.
</enforcement>