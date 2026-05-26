# Adopt TypeScript as Standard Module Language for React Components and Utility Libraries: React Components Implemented

These rules are ALWAYS ACTIVE for all React components, pages, utility libraries, API routes, context providers, and configuration files that support TypeScript across the application stack.

### Rules

- **R-TS-001** MUST: All React components MUST be implemented using TypeScript with .tsx file extension.
- **R-TS-002** MUST: All utility libraries and helper modules MUST use TypeScript with .ts file extension.
- **R-TS-003** MUST: All API routes and backend logic MUST be implemented in TypeScript.
- **R-TS-004** MUST: All context providers and state management code MUST use TypeScript.
- **R-TS-005** MUST: tsconfig.json MUST have strict mode enabled with 'strict': true and 'noImplicitAny': true.
- **R-TS-006** MUST: ESLint MUST be configured with @typescript-eslint plugin to enforce TypeScript best practices.
- **R-TS-007** SHOULD: Shared type definition files (e.g., types/index.ts) SHOULD be created for domain models used across multiple modules.
- **R-TS-008** SHOULD: TypeScript path aliases SHOULD be configured in tsconfig.json to simplify imports and improve code organization.
- **R-TS-009** SHOULD: Team conventions for 'interface' vs 'type' usage and naming conventions for type definitions SHOULD be documented.

### Verify

```bash
# Check for any remaining JavaScript files in source (excluding node_modules and .next)
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
- No .js or .jsx files exist in the source tree (excluding build artifacts and node_modules)
- ESLint configuration includes @typescript-eslint plugin rules

<enforcement>
Claude Code MUST NOT skip or defer verification. Pre-commit hooks, CI/CD pipeline, and code review processes MUST enforce TypeScript compilation and type safety checks. Violations result in build failure and require architectural review.
</enforcement>