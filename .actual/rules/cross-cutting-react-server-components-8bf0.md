# Adopt Async/Await as Standard Concurrency Model for Asynchronous Operations: React Server Components

These rules are ALWAYS ACTIVE for all asynchronous operations in the codebase, including React Server Components, API routes, server actions, database queries, file system access, and external API integrations.

### Rules

- **R-ASYNC-001** MUST: React Server Components that fetch data MUST be declared as async functions.
- **R-ASYNC-002** MUST: All server-side data fetching operations MUST use async/await syntax.
- **R-ASYNC-003** MUST: API route handlers and server actions MUST use async/await for asynchronous operations.
- **R-ASYNC-004** MUST: Database query operations MUST use async/await syntax.
- **R-ASYNC-005** MUST: File system operations MUST use async/await syntax.
- **R-ASYNC-006** MUST: External API integrations MUST use async/await syntax.
- **R-ASYNC-007** MUST: Utility functions that perform asynchronous operations MUST use async/await syntax.
- **R-ASYNC-008** SHOULD: For parallel operations, prefer Promise.all() for fail-fast behavior or Promise.allSettled() when all results are needed regardless of failures.
- **R-ASYNC-009** SHOULD: Always include try-catch blocks in async functions that perform I/O operations, with appropriate error logging and user-facing error messages.
- **R-ASYNC-010** MAY: Use raw Promises or callbacks only when documented with inline comments explaining the rationale (exceptions: legacy callback-based library integration, advanced Promise combinators like Promise.race()).

### Verify

```bash
# Count async function declarations
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Run ESLint with async/await best practice rules
eslint src/ --rule 'require-await: error' --rule 'no-async-promise-executor: error' --rule 'no-return-await: error'

# Count raw Promise chains (should be minimal and documented)
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l
```

**Accept when:**
- All new asynchronous functions in src/ directory use async/await syntax (verified by grep showing consistent async function declarations)
- ESLint checks pass with no violations of async/await best practice rules (require-await, no-async-promise-executor, no-return-await)
- Raw Promise chains (.then) are only present in documented exception cases or third-party code
- All async functions performing I/O operations include try-catch blocks with error handling

<enforcement>
Clause Code MUST NOT skip or defer verification. ESLint rules are enforced in CI pipeline. Code review must verify async/await usage for all asynchronous operations. Violations block merge unless documented exceptions are approved by tech lead.
</enforcement>