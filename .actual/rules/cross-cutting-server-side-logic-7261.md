# Adopt React and TypeScript as Standard Frontend Stack: Server Side Logic

These rules are ALWAYS ACTIVE for all frontend development activities. All new components, pages, and UI modules must comply with these standards.

### Rules

- **R-REACT-TS-001** SHOULD: Server-side logic in Next.js applications SHOULD be separated into server actions or API routes rather than mixed with client components.

### Verify

```bash
# Count TypeScript files in src directory
find src -type f \( -name '*.tsx' -o -name '*.ts' \) | wc -l

# Count React imports across TypeScript files
grep -r "import.*react" src/ --include="*.tsx" --include="*.ts" | wc -l

# Run TypeScript compiler in strict mode
npx tsc --noEmit --strict

# Check for legacy class components
grep -E "(class.*extends React\.Component|React\.createClass)" src/ -r || echo 'No class components found'
```

**Accept when:**
- TypeScript compilation succeeds with strict mode enabled and no type errors
- All component files use .tsx extension and functional component patterns with hooks
- At least 90% of files in src/ directory are TypeScript (.ts/.tsx) rather than JavaScript (.js/.jsx)
- React imports are present in all component files and no class-based components exist in new code

<enforcement>
Claude Code MUST NOT skip or defer verification. TypeScript compiler checks in CI/CD pipeline with strict mode enabled are mandatory. ESLint rules enforcing TypeScript usage and React best practices must pass. Code review checklist requires TypeScript compliance and proper type annotations. Pre-commit hooks running type checking must prevent commits with type errors.
</enforcement>