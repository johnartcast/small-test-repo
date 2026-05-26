# Adopt TypeScript as Standard Module Language for React Components and Utility Libraries: Component Props Defined

These rules are ALWAYS ACTIVE for all React components, pages, utility libraries, API routes, context providers, and configuration files that support TypeScript across the application stack.

### Rules

- **R-TS-001** SHOULD: Component props SHOULD be defined using TypeScript interfaces or type aliases.

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

<enforcement>
Claude Code MUST NOT skip or defer verification. Pre-commit hooks, CI/CD pipeline, and code review processes are mandatory enforcement points. TypeScript compilation failures block builds. Pull requests with new .js or .jsx files are automatically flagged. All 'any' type usage requires code review approval.
</enforcement>