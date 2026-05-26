# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Server Actions Marked

These rules are ALWAYS ACTIVE for all service and API boundary implementations in the codebase, including HTTP API endpoints, server-side data mutations, server actions invoked from client components, and route handlers in the app/api directory structure.

### Rules

- **R-SVC-001** MUST: Server actions MUST be marked with 'use server' directive at the file or function level.

### Verify

```bash
# Verify all API endpoints are defined in route.ts files with proper HTTP method exports
find . -path '*/app/api/*/route.ts' -type f | xargs grep -l 'export.*function.*(GET|POST|PUT|DELETE|PATCH)'

# Verify all server actions are defined in actions.ts files with 'use server' directive
find . -path '*/app/*/actions.ts' -type f | xargs grep -l "'use server'"

# Count route.ts and actions.ts files in the codebase
grep -r "route.ts\|actions.ts" --include="*.ts" --include="*.tsx" | wc -l
```

**Accept when:**
- All API endpoints are defined in route.ts files with proper HTTP method exports
- All server actions are defined in actions.ts files with 'use server' directive
- No client components directly access databases or external services without going through defined boundaries

<enforcement>
Claude Code MUST NOT skip or defer verification. All service boundary implementations must be checked against these rules before acceptance.
</enforcement>