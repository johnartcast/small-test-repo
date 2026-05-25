# Adopt Async/Await as Standard Concurrency Model for Asynchronous Operations: Error Handling Async

These rules are ALWAYS ACTIVE for all asynchronous operations in the codebase, including server-side data fetching, React Server Components, API route handlers, server actions, database queries, file system operations, external API integrations, and utility functions that perform asynchronous operations.

### Rules

- **R-ASYNC-001** SHOULD: Error handling in async functions SHOULD use try-catch blocks rather than .catch() chains.

### Verify

```bash
# Count async function declarations
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Run ESLint checks for async/await best practices
eslint src/ --rule 'require-await: error' --rule 'no-async-promise-executor: error'

# Count raw Promise chains (should be minimal and documented)
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l
```

**Accept when:**
- All new asynchronous functions in src/ directory use async/await syntax (verified by grep showing consistent async function declarations)
- ESLint checks pass with no violations of async/await best practice rules (require-await, no-async-promise-executor, no-return-await)
- Raw Promise chains (.then) are only present in documented exception cases or third-party code
- Error handling in async functions consistently uses try-catch blocks rather than .catch() chains

<enforcement>
Clause Code MUST NOT skip or defer verification. ESLint rules are enforced in CI pipeline. Code review must verify async/await patterns for all asynchronous operations. Violations block merge unless documented exceptions are approved by tech lead.
</enforcement>