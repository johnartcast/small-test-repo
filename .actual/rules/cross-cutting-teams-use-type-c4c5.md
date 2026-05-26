# Adopt TypeScript as Standard Module Language for React Components and Utility Libraries: Teams Use Type

These rules are ALWAYS ACTIVE for all React components, pages, utility libraries, API routes, context providers, and configuration files that support TypeScript across the application stack.

### Rules

- **R-TS-001** MUST: Use TypeScript (.ts or .tsx) for all React components and pages.
- **R-TS-002** MUST: Use TypeScript (.ts or .tsx) for all utility libraries and helper modules.
- **R-TS-003** MUST: Use TypeScript (.ts or .tsx) for all API routes and backend logic.
- **R-TS-004** MUST: Use TypeScript (.ts or .tsx) for all context providers and state management.
- **R-TS-005** MUST: Enable strict mode in tsconfig.json with 'strict': true and 'noImplicitAny': true.
- **R-TS-006** MUST: Configure ESLint with @typescript-eslint plugin to enforce TypeScript best practices.
- **R-TS-007** SHOULD: Create shared type definition files (e.g., types/index.ts) for domain models used across multiple modules.
- **R-TS-008** SHOULD: Use TypeScript path aliases in tsconfig.json to simplify imports and improve code organization.
- **R-TS-009** MAY: Use type inference where TypeScript can reliably infer types without explicit annotations.
- **R-TS-010** MUST NOT: Use 'any' type without explicit justification and code review approval.

### Verify

```bash
# Verify no untyped JavaScript files exist in source
find . -name '*.js' -o -name '*.jsx' | grep -v node_modules | grep -v '.next' | wc -l | grep -q '^0$'

# Verify strict mode is enabled
grep -q '"strict": true' tsconfig.json

# Verify TypeScript compilation succeeds in strict mode
npx tsc --noEmit --project tsconfig.json
```

**Accept when:**
- All source files in src/ directory use .ts or .tsx extensions (excluding explicitly exempted files)
- TypeScript compiler runs without errors in strict mode
- tsconfig.json has strict mode enabled and no implicit any types are allowed
- ESLint configuration includes @typescript-eslint plugin rules
- No .js or .jsx files exist in the source tree (excluding build artifacts and node_modules)

<enforcement>
Claude Code MUST NOT skip or defer verification. Pre-commit hooks, CI/CD pipeline, and code review processes MUST enforce TypeScript compilation and type safety checks. Violations result in build failure and require architectural review.
</enforcement>