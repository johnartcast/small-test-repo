# Adopt Async/Await as Standard Concurrency Model for Asynchronous Operations: New Code Not

These rules are ALWAYS ACTIVE for all asynchronous operations in the codebase, including server-side data fetching, React Server Components, API route handlers, server actions, database queries, file system operations, external API integrations, and utility functions that perform asynchronous operations.

### Rules

- **R-ASYNC-001** MUST_NOT: New code MUST NOT use callback-based patterns or raw Promise constructors when async/await provides equivalent functionality.

### Verify

```bash
# Count async function declarations
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l

# Run ESLint with async/await best practice rules
eslint src/ --rule 'require-await: error' --rule 'no-async-promise-executor: error' --rule 'no-return-await: error'

# Count raw Promise chains (should only appear in documented exceptions or third-party code)
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l
```

**Accept when:**
- All new asynchronous functions in src/ directory use async/await syntax (verified by grep showing consistent async function declarations)
- ESLint checks pass with no violations of async/await best practice rules (require-await, no-async-promise-executor, no-return-await)
- Raw Promise chains (.then) are only present in documented exception cases or third-party code
- All async functions performing I/O operations include try-catch blocks with appropriate error handling
- Parallel operations use Promise.all() or Promise.allSettled() rather than sequential awaits

<enforcement>
Claude Code MUST NOT skip or defer verification of async/await patterns. ESLint rules enforced in CI pipeline are mandatory. Code review must verify async/await usage for all asynchronous operations before merge.
</enforcement>