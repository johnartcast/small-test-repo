# Adopt TypeScript as Standard Implementation Language for Application Code: Type Definitions Explicitly

These rules are ALWAYS ACTIVE for all React components (.tsx files), utility libraries and helper functions (.ts files), API routes and server-side code, context providers and custom hooks, and data models and type definitions.

### Rules

- **R-TS-001** SHOULD: Type definitions SHOULD be explicitly declared for function parameters, return values, and component props.

### Verify

```bash
# Check for no .js/.jsx files in src directory
find src -type f \( -name '*.js' -o -name '*.jsx' \) ! -path '*/node_modules/*' | wc -l | grep -q '^0$'

# Verify TypeScript strict mode is enabled
grep -q '"strict": true' tsconfig.json

# Verify TypeScript compilation succeeds
npx tsc --noEmit && echo 'TypeScript compilation successful'
```

**Accept when:**
- All application source files use .ts or .tsx extensions with no .js/.jsx files in src directory
- TypeScript strict mode is enabled in tsconfig.json
- TypeScript compilation completes without errors using 'tsc --noEmit'

<enforcement>
Claude Code MUST NOT skip or defer verification. Pre-commit hooks and CI pipeline MUST run TypeScript compiler to check for type errors. Code review MUST verify proper TypeScript usage and type annotations. ESLint rules MUST enforce TypeScript best practices and flag usage of 'any' type. CI build MUST fail if TypeScript compilation errors are present, preventing merge.
</enforcement>