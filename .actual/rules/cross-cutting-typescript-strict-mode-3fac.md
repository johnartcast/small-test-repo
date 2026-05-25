# Adopt React and TypeScript as Standard Frontend Stack: Typescript Strict Mode

These rules are ALWAYS ACTIVE for all frontend development activities. All new components, pages, and UI modules must comply with these standards.

### Rules

- **R-TS-001** MUST: TypeScript strict mode MUST be enabled in tsconfig.json to enforce maximum type safety.

### Verify

```bash
# Count TypeScript files in src directory
find src -type f \( -name '*.tsx' -o -name '*.ts' \) | wc -l

# Verify React imports are present
grep -r "import.*react" src/ --include="*.tsx" --include="*.ts" | wc -l

# Run TypeScript compiler with strict mode
npx tsc --noEmit --strict

# Verify no class-based components exist
grep -E "(class.*extends React\.Component|React\.createClass)" src/ -r || echo 'No class components found'
```

**Accept when:**
- TypeScript compilation succeeds with strict mode enabled and no type errors
- All component files use .tsx extension and functional component patterns with hooks
- At least 90% of files in src/ directory are TypeScript (.ts/.tsx) rather than JavaScript (.js/.jsx)
- React imports are present in all component files and no class-based components exist in new code

<enforcement>
Claude Code MUST NOT skip or defer verification. TypeScript compilation with strict mode enabled is mandatory before accepting any frontend code changes.
</enforcement>