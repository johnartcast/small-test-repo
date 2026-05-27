# Adopt TypeScript as Standard Implementation Language for Application Code: Third Party Libraries

These rules are ALWAYS ACTIVE for all application code including components, pages, API routes, utilities, and configuration files.

### Rules

- **R-TS3P-001** SHOULD: Third-party libraries without native TypeScript support SHOULD have @types packages installed.

### Verify

```bash
# Verify no plain JavaScript files exist in src directory
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
Claude Code MUST NOT skip or defer verification. Pre-commit hooks and CI pipeline MUST enforce TypeScript compilation checks. Pull requests with .js/.jsx files in application code MUST be flagged for conversion to TypeScript.
</enforcement>