# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Server Only Code

These rules are ALWAYS ACTIVE for all service and API boundary implementations, including Route Handlers (route.ts files), Server Actions (actions.ts files), and any code that defines where client code ends and server code begins.

### Rules

- **R-BOUNDARY-001** MUST NOT: Server-only code (database queries, API keys, sensitive business logic) MUST NOT be placed in client components without proper server boundary markers.
- **R-BOUNDARY-002** MUST: All API endpoints in the app/api directory MUST be implemented as route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH).
- **R-BOUNDARY-003** MUST: All server mutation files MUST contain the 'use server' directive and follow the actions.ts naming convention.
- **R-BOUNDARY-004** MUST: No server-only code (database queries, API keys) MUST exist in client components without proper server boundary markers.
- **R-BOUNDARY-005** SHOULD: Use Route Handlers (route.ts) for RESTful API endpoints exposed to external clients or frontend applications.
- **R-BOUNDARY-006** SHOULD: Use Server Actions (actions.ts) for server-side data mutations including create, update, delete operations and form submission handlers.
- **R-BOUNDARY-007** SHOULD: Establish naming conventions with action functions prefixed by action verbs (createTodo, updateWeather, etc.).
- **R-BOUNDARY-008** SHOULD: Implement shared utilities for common concerns like authentication, error handling, and response formatting across both Route Handlers and Server Actions.

### Verify

```bash
# Count Route Handler files
find . -path '*/app/api/*/route.ts' -type f | wc -l

# Count Server Action files with 'use server' directive
grep -r "'use server'" --include='actions.ts' | wc -l

# Count HTTP method exports in route.ts files
grep -r "export async function GET\|POST\|PUT\|DELETE\|PATCH" --include='route.ts' | wc -l

# Check for server-only imports in client components
grep -r "'use client'" --include='*.tsx' --include='*.ts' -l | xargs grep -l "database\|API_KEY\|secret" 2>/dev/null || echo "No violations found"
```

**Accept when:**
- All API endpoints in app/api directory are implemented as route.ts files with proper HTTP method exports
- All server mutation files contain 'use server' directive and follow actions.ts naming convention
- No server-only code (database queries, API keys) exists in client components without proper server boundary markers
- Linting rules detect and flag missing 'use server' directives in actions.ts files
- Static analysis tools flag potential exposure of sensitive server code in client components

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All service boundary implementations MUST be checked against R-BOUNDARY-001 through R-BOUNDARY-008 before code review approval. Violations MUST result in CI build failures or linter errors escalated to blocking status.
</enforcement>