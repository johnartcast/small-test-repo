# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Route Handlers Defined

These rules are ALWAYS ACTIVE for all service and API boundary implementations in the codebase. All new API endpoints and server-side data mutations must follow these patterns.

### Rules

- **R-ROUTE-001** MUST: API route handlers MUST be defined in route.ts files following Next.js App Router conventions (e.g., app/api/[resource]/route.ts)
- **R-ROUTE-002** MUST: All HTTP API endpoints exposed to external clients MUST use route.ts files in the app/api directory structure with named exports for HTTP methods (GET, POST, PUT, DELETE, PATCH)
- **R-ROUTE-003** MUST: All server-side data mutations and database operations MUST be defined in actions.ts files colocated with feature directories (e.g., app/todos/actions.ts) with the 'use server' directive
- **R-ROUTE-004** MUST: Server actions invoked from client components via form actions or transitions MUST include the 'use server' directive at the top of the file
- **R-ROUTE-005** SHOULD: Use TypeScript interfaces to define request/response types and share them between client and server code
- **R-ROUTE-006** SHOULD: Implement error handling consistently across all boundaries using try-catch and appropriate HTTP status codes or error returns
- **R-ROUTE-007** SHOULD: Consider using Zod or similar validation libraries to validate inputs at service boundaries

### Verify

```bash
# Verify route.ts files exist with proper HTTP method exports
find . -path '*/app/api/*/route.ts' -type f | xargs grep -l 'export.*function.*(GET|POST|PUT|DELETE|PATCH)'

# Verify actions.ts files exist with 'use server' directive
find . -path '*/app/*/actions.ts' -type f | xargs grep -l "'use server'"

# Count route.ts and actions.ts files in codebase
grep -r "route.ts\|actions.ts" --include="*.ts" --include="*.tsx" | wc -l
```

**Accept when:**
- All API endpoints are defined in route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH)
- All server actions are defined in actions.ts files with 'use server' directive at the top
- No client components directly access databases or external services without going through defined boundaries
- TypeScript interfaces are used to define request/response types shared between client and server
- Error handling is implemented consistently across all service boundaries

<enforcement>
Claude Code MUST NOT skip or defer verification. All new API endpoints and server-side mutations MUST conform to these rules before code review approval.
</enforcement>