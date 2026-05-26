# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Route Handlers Implement

These rules are ALWAYS ACTIVE for all service and API boundary implementations in the codebase, including HTTP API endpoints, server-side data mutations, server actions, and route handlers in the app/api directory structure.

### Rules

- **R-RH-001** MAY: Route handlers MAY implement middleware for cross-cutting concerns like authentication, logging, and rate limiting.

### Verify

```bash
# Verify route handlers exist with proper HTTP method exports
find . -path '*/app/api/*/route.ts' -type f | xargs grep -l 'export.*function.*(GET|POST|PUT|DELETE|PATCH)'

# Verify server actions exist with 'use server' directive
find . -path '*/app/*/actions.ts' -type f | xargs grep -l "'use server'"

# Count route.ts and actions.ts files in codebase
grep -r "route.ts\|actions.ts" --include="*.ts" --include="*.tsx" | wc -l
```

**Accept when:**
- All API endpoints are defined in route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH)
- All server actions are defined in actions.ts files with 'use server' directive at the top
- No client components directly access databases or external services without going through defined boundaries
- Route handlers and server actions follow Next.js App Router file naming conventions
- TypeScript interfaces define request/response types shared between client and server code
- Error handling is consistent across all boundaries using try-catch and appropriate HTTP status codes

<enforcement>
Claude Code MUST NOT skip or defer verification. All service boundary implementations MUST follow these route handler and server action patterns. Violations block CI pipeline and pull request approval until resolved.
</enforcement>