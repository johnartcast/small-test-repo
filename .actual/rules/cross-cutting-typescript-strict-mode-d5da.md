# Adopt TypeScript as Standard Module Language for React Components and Utility Libraries: Typescript Strict Mode

These rules are ALWAYS ACTIVE for all React components, pages, utility libraries, API routes, context providers, and configuration files that support TypeScript across the application stack.

### Rules

- **R-TS-001** MUST: TypeScript strict mode MUST be enabled in tsconfig.json to enforce type safety.
- **R-TS-002** MUST: All React components and pages MUST use .tsx or .ts file extensions.
- **R-TS-003** MUST: All utility libraries and helper modules MUST use .ts file extensions.
- **R-TS-004** MUST: All API routes and backend logic MUST use .ts file extensions.
- **R-TS-005** MUST: All context providers and state management MUST use .ts or .tsx file extensions.
- **R-TS-006** MUST: TypeScript configuration MUST include 'strict': true and 'noImplicitAny': true.
- **R-TS-007** SHOULD: ESLint SHOULD be configured with @typescript-eslint plugin to enforce TypeScript best practices.
- **R-TS-008** SHOULD: Shared type definition files SHOULD be created (e.g., types/index.ts) for domain models used across multiple modules.
- **R-TS-009** SHOULD: TypeScript path aliases SHOULD be configured in tsconfig.json to simplify imports and improve code organization.
- **R-TS-010** MAY: Build configuration files that require JavaScript (e.g., webpack.config.js) MAY remain in JavaScript.
- **R-TS-011** MAY: Third-party dependencies and node_modules MAY remain untyped.
- **R-TS-012** MAY: Legacy migration code with documented exception approval MAY deviate from this standard.
- **R-TS-013** MAY: Test fixtures or mock data files where typing is not beneficial MAY use JavaScript.

### Verify

```bash
# Verify no untyped JavaScript files exist in source
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
- Pre-commit hooks successfully run TypeScript compiler to catch type errors before commit
- CI/CD pipeline includes TypeScript compilation step that passes without errors

<enforcement>
Claude Code MUST NOT skip or defer verification. TypeScript compilation MUST succeed in strict mode before accepting any changes to typed modules.
</enforcement>