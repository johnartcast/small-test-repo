# Adopt React and TypeScript as Standard Frontend Stack: Components Use Additional

These rules are ALWAYS ACTIVE for all frontend development activities. All new components, pages, and UI modules must comply with these standards.

### Rules

- **R-REACT-001** MAY: Components MAY use additional React ecosystem libraries (e.g., React Hook Form, React Query) when they provide clear value for specific use cases.

### Verify

```bash
# Count TypeScript/TSX files in src directory
find src -type f \( -name '*.tsx' -o -name '*.ts' \) | wc -l

# Count React imports across TypeScript files
grep -r "import.*react" src/ --include="*.tsx" --include="*.ts" | wc -l

# Run TypeScript compiler in strict mode
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
Claude Code MUST NOT skip or defer verification. TypeScript compiler checks in CI/CD pipeline with strict mode enabled are mandatory before accepting code changes.
</enforcement>