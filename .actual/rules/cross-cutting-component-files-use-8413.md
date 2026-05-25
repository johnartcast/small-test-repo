# Adopt React and TypeScript as Standard Frontend Stack: Component Files Use

These rules are ALWAYS ACTIVE for all frontend development activities. All new components, pages, and UI modules must comply with these standards.

### Rules

- **R-REACT-TS-001** MUST: Component files MUST use proper TypeScript type annotations for props, state, and function signatures.

### Verify

```bash
# Count TypeScript component files
find src -type f \( -name '*.tsx' -o -name '*.ts' \) | wc -l

# Verify React imports in component files
grep -r "import.*react" src/ --include="*.tsx" --include="*.ts" | wc -l

# Run TypeScript compiler in strict mode
npx tsc --noEmit --strict

# Verify no class-based components in new code
grep -E "(class.*extends React\.Component|React\.createClass)" src/ -r || echo 'No class components found'
```

**Accept when:**
- TypeScript compilation succeeds with strict mode enabled and no type errors
- All component files use .tsx extension and functional component patterns with hooks
- At least 90% of files in src/ directory are TypeScript (.ts/.tsx) rather than JavaScript (.js/.jsx)
- React imports are present in all component files and no class-based components exist in new code

<enforcement>
Claude Code MUST NOT skip or defer verification. TypeScript compiler checks in CI/CD pipeline with strict mode enabled are mandatory before accepting any component code.
</enforcement>