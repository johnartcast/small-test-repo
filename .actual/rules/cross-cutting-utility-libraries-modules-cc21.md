# Adopt TypeScript as Standard Module Language for React Components and Utility Libraries: Utility Libraries Modules

These rules are ALWAYS ACTIVE for all utility libraries, helper modules, React components, pages, API routes, context providers, and state management code in the project.

### Rules

- **R-TYPESCRIPT-001** MUST: All utility libraries and modules MUST be implemented using TypeScript with .ts file extension
- **R-TYPESCRIPT-002** MUST: All React components and pages MUST use .tsx file extension
- **R-TYPESCRIPT-003** MUST: tsconfig.json MUST have strict mode enabled with `"strict": true` and `"noImplicitAny": true`
- **R-TYPESCRIPT-004** MUST: All API routes and backend logic MUST be implemented in TypeScript
- **R-TYPESCRIPT-005** MUST: All context providers and state management code MUST be implemented in TypeScript
- **R-TYPESCRIPT-006** SHOULD: Create shared type definition files (e.g., types/index.ts) for domain models used across multiple modules
- **R-TYPESCRIPT-007** SHOULD: Use TypeScript path aliases in tsconfig.json to simplify imports and improve code organization
- **R-TYPESCRIPT-008** SHOULD: Configure ESLint with @typescript-eslint plugin to enforce TypeScript best practices
- **R-TYPESCRIPT-009** MAY: Configuration files that support TypeScript (e.g., tailwind.config.ts) SHOULD use TypeScript

### Verify

```bash
# Check for any remaining JavaScript files in source (excluding node_modules and .next)
find . -name '*.js' -o -name '*.jsx' | grep -v node_modules | grep -v '.next' | wc -l | grep -q '^0$'

# Verify strict mode is enabled in tsconfig.json
grep -q '"strict": true' tsconfig.json

# Run TypeScript compiler in strict mode without emitting
npx tsc --noEmit --project tsconfig.json
```

**Accept when:**
- All source files in src/ directory use .ts or .tsx extensions (excluding explicitly exempted files)
- TypeScript compiler runs without errors in strict mode
- tsconfig.json has strict mode enabled and no implicit any types are allowed
- No .js or .jsx files exist in source directories (excluding build artifacts and node_modules)

<enforcement>
Claude Code MUST NOT skip or defer verification. Pre-commit hooks, CI/CD pipeline, and code review processes MUST enforce TypeScript compilation and type safety. Violations result in build failure and require architectural review.
</enforcement>