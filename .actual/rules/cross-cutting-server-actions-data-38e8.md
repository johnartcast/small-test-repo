# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Server Actions Data

These rules are ALWAYS ACTIVE for all service and API boundary implementations in the codebase, including all new API endpoints and server-side data mutations.

### Rules

- **R-SA-001** MUST: Server actions for data mutations MUST be defined in actions.ts files colocated with their feature domains (e.g., app/[feature]/actions.ts)

### Verify

```bash
# Verify server actions are defined in actions.ts files with 'use server' directive
find . -path '*/app/*/actions.ts' -type f | xargs grep -l "'use server'"

# Verify route handlers are defined in route.ts files with proper HTTP method exports
find . -path '*/app/api/*/route.ts' -type f | xargs grep -l 'export.*function.*(GET|POST|PUT|DELETE|PATCH)'

# Count total route.ts and actions.ts files in codebase
grep -r "route.ts\|actions.ts" --include="*.ts" --include="*.tsx" | wc -l
```

**Accept when:**
- All server actions are defined in actions.ts files with 'use server' directive at the top
- All API endpoints are defined in route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH)
- No client components directly access databases or external services without going through defined boundaries
- Server actions are colocated with their feature domains in the app directory structure

<enforcement>
Claude Code MUST NOT skip or defer verification. All service boundary implementations MUST follow these rules. CI pipeline checks using grep/find commands verify file structure compliance. Pull requests are blocked until code review approves boundary implementation and automated ESLint rules confirm naming conventions.
</enforcement>