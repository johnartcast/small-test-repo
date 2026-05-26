# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Client Components Not

These rules are ALWAYS ACTIVE for all service and API boundary implementations in the codebase. All new API endpoints and server-side data mutations must follow these patterns.

### Rules

- **R-SVC-001** MUST_NOT: Client components MUST NOT directly access database or external services; they MUST use route handlers or server actions.

### Verify

```bash
# Find all route.ts files with proper HTTP method exports
find . -path '*/app/api/*/route.ts' -type f | xargs grep -l 'export.*function.*(GET|POST|PUT|DELETE|PATCH)'

# Find all server actions with 'use server' directive
find . -path '*/app/*/actions.ts' -type f | xargs grep -l "'use server'"

# Count route.ts and actions.ts files
grep -r "route.ts\|actions.ts" --include="*.ts" --include="*.tsx" | wc -l
```

**Accept when:**
- All API endpoints are defined in route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH)
- All server actions are defined in actions.ts files with 'use server' directive at the top
- No client components directly access databases or external services without going through defined boundaries
- TypeScript interfaces are used to define request/response types shared between client and server code
- Error handling is implemented consistently across all boundaries using try-catch and appropriate HTTP status codes

<enforcement>
Claude Code MUST NOT skip or defer verification. All service boundary implementations MUST be checked against these rules before approval. Violations block CI pipeline and pull request merging.
</enforcement>