# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Server Actions Colocated

These rules are ALWAYS ACTIVE for all service and API boundary implementations in the codebase, including HTTP API endpoints, server-side data mutations, server actions invoked from client components, and route handlers in the app/api directory structure.

### Rules

- **R-SVC-001** SHOULD: Server actions SHOULD be colocated with the UI components that invoke them to maintain feature cohesion.
- **R-SVC-002** MUST: All HTTP API endpoints exposed to external clients MUST be defined in route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH).
- **R-SVC-003** MUST: All server-side data mutations and database operations MUST be implemented as server actions in actions.ts files with the 'use server' directive.
- **R-SVC-004** MUST: Server actions MUST be colocated with feature directories (e.g., app/todos/actions.ts) rather than centralized in a separate directory.
- **R-SVC-005** SHOULD: TypeScript interfaces SHOULD be used to define request/response types and shared between client and server code.
- **R-SVC-006** SHOULD: Error handling SHOULD be implemented consistently across all boundaries using try-catch and appropriate HTTP status codes or error returns.
- **R-SVC-007** MAY: Zod or similar validation libraries MAY be used to validate inputs at service boundaries.

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
- All API endpoints are defined in route.ts files with proper HTTP method exports
- All server actions are defined in actions.ts files with 'use server' directive
- No client components directly access databases or external services without going through defined boundaries
- Server actions are colocated with their corresponding feature directories
- TypeScript types are shared between client and server code at boundaries

<enforcement>
Claude Code MUST NOT skip or defer verification. All service boundary implementations MUST conform to these rules before code review approval. CI pipeline checks MUST verify file structure and naming conventions. Violations MUST block pull requests until resolved.
</enforcement>