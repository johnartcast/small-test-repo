# Adopt Async/Await as Standard Concurrency Model for Asynchronous Operations: Functions That Call

These rules are ALWAYS ACTIVE for all asynchronous operations in the codebase, including server-side data fetching, React Server Components, API route handlers, server actions, database queries, file system operations, and external API integrations.

### Rules

- **R-ASYNC-001** MUST: Functions that call async functions MUST either await the result or explicitly handle the returned Promise.

### Verify

```bash
# Count async function declarations
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Run ESLint with async/await best practice rules
eslint src/ --rule 'require-await: error' --rule 'no-async-promise-executor: error' --rule 'no-return-await: error'

# Count raw Promise chains (should only appear in documented exceptions)
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l
```

**Accept when:**
- All new asynchronous functions in src/ directory use async/await syntax (verified by grep showing consistent async function declarations)
- ESLint checks pass with no violations of async/await best practice rules (require-await, no-async-promise-executor, no-return-await)
- Raw Promise chains (.then) are only present in documented exception cases or third-party code
- All async function calls are either awaited or have explicit Promise error handling

<enforcement>
Clause Code MUST NOT skip or defer verification. ESLint rules enforced in CI pipeline. Code review must verify async/await usage for all asynchronous operations. CI build fails if violations are detected.
</enforcement>