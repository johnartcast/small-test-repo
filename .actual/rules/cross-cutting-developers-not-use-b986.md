# Adopt TypeScript as Standard Implementation Language for Application Code: Developers Not Use

These rules are ALWAYS ACTIVE for all React components (.tsx files), utility libraries and helper functions (.ts files), API routes and server-side code, context providers and custom hooks, and data models and type definitions.

### Rules

- **R-TS-001** MUST_NOT: Developers MUST NOT use 'any' type except in exceptional cases with documented justification.

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
Claude Code MUST NOT skip or defer verification. Pre-commit hooks, CI pipeline, code review, and ESLint rules enforce TypeScript compilation and type safety. Violations prevent merge; exceptions require tech lead approval and documentation.
</enforcement>