# Adopt React and TypeScript as Standard Frontend Stack: Component Libraries Utility

These rules are ALWAYS ACTIVE for all frontend development activities. All new components, pages, and UI modules must comply with these standards.

### Rules

- **R-REACT-001** SHOULD: Component libraries and utility modules SHOULD be organized in dedicated directories (src/components, src/lib) with clear separation of concerns.
- **R-REACT-002** SHOULD: Ensure tsconfig.json has strict mode enabled with 'strict': true and appropriate compiler options for React JSX transformation.
- **R-REACT-003** SHOULD: Organize components in src/components/ directory with clear naming conventions (PascalCase for components, descriptive names indicating purpose).
- **R-REACT-004** SHOULD: Use React Context API for cross-cutting concerns like theming, authentication, or global state rather than prop drilling.
- **R-REACT-005** SHOULD: Separate server-side logic into dedicated files (actions.ts, route.ts) to maintain clear boundaries between client and server code in Next.js applications.
- **R-REACT-006** SHOULD: Leverage TypeScript interfaces and types for component props, API responses, and shared data structures to ensure type safety across the application.
- **R-REACT-007** SHOULD: Follow Next.js app directory conventions for file-based routing and use appropriate file naming (page.tsx, layout.tsx, route.ts) for framework features.

### Verify

```bash
# Count TypeScript files in src directory
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
Claude Code MUST NOT skip or defer verification. TypeScript compiler checks in CI/CD pipeline with strict mode enabled are mandatory. ESLint rules enforcing TypeScript usage and React best practices must be applied. Code review checklist must require TypeScript compliance and proper type annotations. Pre-commit hooks running type checking must prevent commits with type errors.
</enforcement>