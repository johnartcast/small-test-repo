# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Route Handlers Export

These rules are ALWAYS ACTIVE for all HTTP API endpoints exposed to external clients, all server-side data mutations and database operations, server actions invoked from client components via form actions or transitions, and route handlers in the app/api directory structure.

### Rules

- **R-RH-001** MUST: Route handlers MUST export named functions corresponding to HTTP methods (GET, POST, PUT, DELETE, PATCH).

### Verify

```bash
# Verify route.ts files export HTTP method functions
find . -path '*/app/api/*/route.ts' -type f | xargs grep -l 'export.*function.*(GET|POST|PUT|DELETE|PATCH)'

# Verify actions.ts files have 'use server' directive
find . -path '*/app/*/actions.ts' -type f | xargs grep -l "'use server'"

# Count route.ts and actions.ts files in codebase
grep -r "route.ts\|actions.ts" --include="*.ts" --include="*.tsx" | wc -l
```

**Accept when:**
- All API endpoints are defined in route.ts files with proper HTTP method exports
- All server actions are defined in actions.ts files with 'use server' directive
- No client components directly access databases or external services without going through defined boundaries

<enforcement>
Claude Code MUST NOT skip or defer verification. All route handlers and server actions must conform to these naming and export conventions before code is approved.
</enforcement>