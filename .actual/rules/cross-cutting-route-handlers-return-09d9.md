# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Route Handlers Return

These rules are ALWAYS ACTIVE for all HTTP API endpoints, server-side data mutations, server actions, and route handlers defined in the app/api directory structure and feature directories.

### Rules

- **R-RH-001** SHOULD: Route handlers SHOULD return NextResponse objects with appropriate status codes and headers.

### Verify

```bash
# Find all route.ts files with proper HTTP method exports
find . -path '*/app/api/*/route.ts' -type f | xargs grep -l 'export.*function.*(GET|POST|PUT|DELETE|PATCH)'

# Find all actions.ts files with 'use server' directive
find . -path '*/app/*/actions.ts' -type f | xargs grep -l "'use server'"

# Count total route.ts and actions.ts files
grep -r "route.ts\|actions.ts" --include="*.ts" --include="*.tsx" | wc -l
```

**Accept when:**
- All API endpoints are defined in route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH)
- All server actions are defined in actions.ts files with 'use server' directive at the top
- No client components directly access databases or external services without going through defined boundaries
- Route handlers return NextResponse objects with appropriate status codes and headers
- Server actions are colocated with feature directories (e.g., app/todos/actions.ts)

<enforcement>
Claude Code MUST NOT skip or defer verification. All route handlers and server actions must be checked against these rules before approval.
</enforcement>