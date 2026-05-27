# Adopt Async/Await as Standard Concurrency Model for Asynchronous Operations: Async Functions Use

These rules are ALWAYS ACTIVE for all asynchronous operations in TypeScript/JavaScript codebases, including API routes, server components, data fetching utilities, and action handlers.

### Rules

- **R-ASYNC-001** MUST: Async functions MUST use try-catch blocks for error handling rather than .catch() methods or error callbacks.

### Verify

```bash
# Count .then() usage in source files
grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v node_modules | wc -l

# Count async function usage in source files
grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | grep -v node_modules | wc -l

# Run ESLint checks for async/await best practices
npx eslint src/ --ext .ts,.tsx --rule '@typescript-eslint/no-floating-promises: error' --rule '@typescript-eslint/await-thenable: error'
```

**Accept when:**
- The ratio of async/await usage to .then() usage is at least 10:1 in the codebase, indicating strong adoption of the async/await pattern
- All new API routes, server components, and data fetching utilities use async/await syntax with proper try-catch error handling
- ESLint checks pass with no violations of async/await best practices rules (no-floating-promises, await-thenable, require-await)

<enforcement>
Claude Code MUST NOT skip or defer verification. Automated ESLint checks in CI pipeline enforce async/await best practices. Code review blocks merge if asynchronous functions lack proper async/await syntax or error handling. TypeScript compiler strict mode catches missing await keywords and unhandled promise types.
</enforcement>