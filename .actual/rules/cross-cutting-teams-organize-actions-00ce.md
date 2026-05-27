# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Teams Organize Actions

These rules are ALWAYS ACTIVE for all service and API boundary implementations, including API endpoints exposed to external clients or frontend applications, server-side data mutations (create, update, delete operations), form submission handlers, proxy endpoints for third-party API integrations, and server-side business logic requiring authentication or authorization.

### Rules

- **R-BOUNDARY-001** MAY: Teams MAY organize actions.ts files either at the feature level (e.g., app/todos/actions.ts) or at the route level depending on complexity and scope.
- **R-BOUNDARY-002** MUST: All API endpoints in the app/api directory be implemented as route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH).
- **R-BOUNDARY-003** MUST: All server mutation files contain the 'use server' directive and follow the actions.ts naming convention.
- **R-BOUNDARY-004** MUST: No server-only code (database queries, API keys) exist in client components without proper server boundary markers.
- **R-BOUNDARY-005** SHOULD: Use route.ts for API endpoints and actions.ts for server mutations, with action functions prefixed with action verbs (createTodo, updateWeather).
- **R-BOUNDARY-006** SHOULD: Implement shared utilities for common concerns like authentication, error handling, and response formatting that work across both Route Handlers and Server Actions.

### Verify

```bash
# Count Route Handler files in app/api directory
find . -path '*/app/api/*/route.ts' -type f | wc -l

# Count Server Actions with 'use server' directive
grep -r "'use server'" --include='actions.ts' | wc -l

# Count HTTP method exports in route.ts files
grep -r "export async function GET\|POST\|PUT\|DELETE\|PATCH" --include='route.ts' | wc -l
```

**Accept when:**
- All API endpoints in app/api directory are implemented as route.ts files with proper HTTP method exports
- All server mutation files contain 'use server' directive and follow actions.ts naming convention
- No server-only code (database queries, API keys) exists in client components without proper server boundary markers
- Linting rules detect 'use server' directive in actions.ts files
- Static analysis tools detect server-only imports in client components
- Code review checklist items for service boundary patterns are satisfied

<enforcement>
Claude Code MUST NOT skip or defer verification. CI pipeline checks for route.ts file structure in app/api directory MUST pass. Linter warnings for missing 'use server' directives in actions.ts files MUST be escalated to errors. Code review MUST block deployment if server boundaries are improperly defined. Security scanning tools MUST flag potential exposure of sensitive server code.
</enforcement>