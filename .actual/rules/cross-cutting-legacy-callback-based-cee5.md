# Adopt Async/Await as Standard Concurrency Model for Asynchronous Operations: Legacy Callback Based

These rules are ALWAYS ACTIVE for all asynchronous operations in the codebase, including server-side data fetching, React Server Components, API route handlers, server actions, database queries, file system operations, and external API integrations.

### Rules

- **R-ASYNC-001** MUST: Use async/await syntax for all new asynchronous functions involving I/O operations, API calls, database queries, or file system access.
- **R-ASYNC-002** MAY: Legacy callback-based APIs MAY be wrapped in async functions using Promise constructors to maintain consistency.
- **R-ASYNC-003** MUST: Include try-catch blocks in async functions that perform I/O operations, with appropriate error logging and user-facing error messages.
- **R-ASYNC-004** SHOULD: Use Promise.all() for fail-fast parallel operations or Promise.allSettled() when all results are needed regardless of failures.
- **R-ASYNC-005** SHOULD: Avoid sequential awaits that could be parallelized; use Promise.all() or Promise.allSettled() for concurrent operations.
- **R-ASYNC-006** MUST NOT: Use async functions as Promise executors (no-async-promise-executor).
- **R-ASYNC-007** MUST NOT: Use unnecessary return await statements; return the Promise directly when appropriate (no-return-await).

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
Claude Code MUST NOT skip or defer verification. ESLint rules are enforced in CI pipeline. Code review must verify async/await usage for all asynchronous operations. Violations block merge unless documented exceptions are approved by tech lead.
</enforcement>