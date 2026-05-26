# Adopt TypeScript as Standard Module Language for React Components and Utility Libraries: Route Handlers Implemented

These rules are ALWAYS ACTIVE for all React components, pages, utility libraries, API routes, context providers, and state management modules in the codebase.

### Rules

- **R-TS-001** MUST: All API route handlers MUST be implemented in TypeScript.
- **R-TS-002** MUST: All React components and pages MUST use .tsx or .ts file extensions.
- **R-TS-003** MUST: All utility libraries and helper modules MUST use .ts file extensions.
- **R-TS-004** MUST: tsconfig.json MUST have strict mode enabled with `"strict": true` and `"noImplicitAny": true`.
- **R-TS-005** MUST: ESLint MUST be configured with @typescript-eslint plugin to enforce TypeScript best practices.
- **R-TS-006** SHOULD: Create shared type definition files (e.g., types/index.ts) for domain models used across multiple modules.
- **R-TS-007** SHOULD: Use TypeScript path aliases in tsconfig.json to simplify imports and improve code organization.
- **R-TS-008** SHOULD: Document team conventions for when to use 'interface' vs 'type' and establish naming conventions for type definitions.

### Verify

```bash
# Check for any remaining JavaScript files (excluding node_modules and .next)
find . -name '*.js' -o -name '*.jsx' | grep -v node_modules | grep -v '.next' | wc -l | grep -q '^0$'

# Verify strict mode is enabled in tsconfig.json
grep -q '"strict": true' tsconfig.json

# Run TypeScript compiler in strict mode without emitting files
npx tsc --noEmit --project tsconfig.json
```

**Accept when:**
- All source files in src/ directory use .ts or .tsx extensions (excluding explicitly exempted files)
- TypeScript compiler runs without errors in strict mode
- tsconfig.json has strict mode enabled and no implicit any types are allowed
- No .js or .jsx files exist in the codebase outside of build configuration and node_modules

<enforcement>
Claude Code MUST NOT skip or defer verification. Pre-commit hooks, CI/CD pipeline, and code review processes MUST enforce TypeScript compilation and type safety checks. Violations result in build failure and require architectural review.
</enforcement>