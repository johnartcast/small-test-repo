# Adopt Async/Await as Standard Concurrency Model for Asynchronous Operations: Parallel Async Operations

These rules are ALWAYS ACTIVE for all asynchronous operations in the codebase, including server-side data fetching, React Server Components, API route handlers, server actions, database queries, file system operations, and external API integrations.

### Rules

- **R-ASYNC-001** SHOULD: Parallel async operations that do not depend on each other SHOULD use Promise.all() or Promise.allSettled() with await.

### Verify

```bash
# Count async function declarations
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Check ESLint rules for async/await best practices
eslint src/ --rule 'require-await: error' --rule 'no-async-promise-executor: error'

# Count raw Promise chains (should be minimal and documented)
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l
```

**Accept when:**
- All new asynchronous functions in src/ directory use async/await syntax (verified by grep showing consistent async function declarations)
- ESLint checks pass with no violations of async/await best practice rules (require-await, no-async-promise-executor, no-return-await)
- Raw Promise chains (.then) are only present in documented exception cases or third-party code
- Parallel operations use Promise.all() for fail-fast behavior or Promise.allSettled() when all results are needed regardless of failures
- All async functions performing I/O operations include try-catch blocks with appropriate error handling

<enforcement>
Claude Code MUST NOT skip or defer verification. ESLint rules are enforced in CI pipeline. Code review must verify async/await patterns for all asynchronous operations. Violations block merge unless documented exceptions are approved by tech lead.
</enforcement>