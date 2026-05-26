# Adopt TypeScript as Standard Module Language for React Components and Utility Libraries: New Javascript Jsx

These rules are ALWAYS ACTIVE for all React components, pages, utility libraries, API routes, context providers, and configuration files that support TypeScript across the codebase.

### Rules

- **R-TS-001** MUST_NOT: New JavaScript (.js or .jsx) files MUST NOT be added to the codebase without explicit architectural approval.
- **R-TS-002** MUST: All React components and pages MUST use .tsx extension.
- **R-TS-003** MUST: All utility libraries and helper modules MUST use .ts extension.
- **R-TS-004** MUST: All API routes and backend logic MUST use .ts or .tsx extension.
- **R-TS-005** MUST: All context providers and state management MUST use .ts or .tsx extension.
- **R-TS-006** MUST: tsconfig.json MUST have strict mode enabled with 'strict': true and 'noImplicitAny': true.
- **R-TS-007** MUST: TypeScript compiler MUST run without errors in strict mode.
- **R-TS-008** SHOULD: ESLint SHOULD be configured with @typescript-eslint plugin to enforce TypeScript best practices.
- **R-TS-009** SHOULD: Shared type definition files (e.g., types/index.ts) SHOULD be created for domain models used across multiple modules.
- **R-TS-010** SHOULD: TypeScript path aliases SHOULD be configured in tsconfig.json to simplify imports.
- **R-TS-011** MAY: Build configuration files that require JavaScript (e.g., webpack.config.js) MAY remain in JavaScript.
- **R-TS-012** MAY: Legacy migration code with documented exception approval MAY use JavaScript.

### Verify

```bash
# Verify no unexempted JavaScript files exist
find . -name '*.js' -o -name '*.jsx' | grep -v node_modules | grep -v '.next' | wc -l | grep -q '^0$'

# Verify strict mode is enabled in tsconfig.json
grep -q '"strict": true' tsconfig.json

# Verify TypeScript compilation succeeds in strict mode
npx tsc --noEmit --project tsconfig.json
```

**Accept when:**
- All source files in src/ directory use .ts or .tsx extensions (excluding explicitly exempted files)
- TypeScript compiler runs without errors in strict mode
- tsconfig.json has strict mode enabled and no implicit any types are allowed
- No new .js or .jsx files are present in the codebase outside of exempted build configuration

<enforcement>
Claude Code MUST NOT skip or defer verification. Pre-commit hooks, CI/CD pipeline, and code review processes MUST enforce TypeScript compilation and flag JavaScript files for architectural review. Violations result in build failure and require exception approval.
</enforcement>