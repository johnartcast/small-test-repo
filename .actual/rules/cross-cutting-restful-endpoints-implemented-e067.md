# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Restful Endpoints Implemented

These rules are ALWAYS ACTIVE for all service and API boundary implementations in the codebase, including all new API endpoints and server-side data mutations.

### Rules

- **R-RESTFUL-001** MUST: All RESTful API endpoints MUST be implemented as Route Handlers in route.ts files within the app/api directory structure.
- **R-RESTFUL-002** MUST: All server mutation files MUST contain the 'use server' directive and follow actions.ts naming convention.
- **R-RESTFUL-003** MUST: No server-only code (database queries, API keys) MUST exist in client components without proper server boundary markers.
- **R-RESTFUL-004** SHOULD: Use naming conventions with route.ts for API endpoints, actions.ts for server mutations, and prefix action functions with action verbs (createTodo, updateWeather).
- **R-RESTFUL-005** SHOULD: Implement shared utilities for common concerns like authentication, error handling, and response formatting that work across both Route Handlers and Server Actions.

### Verify

```bash
# Count route.ts files in app/api directory
find . -path '*/app/api/*/route.ts' -type f | wc -l

# Count files with 'use server' directive in actions.ts files
grep -r "'use server'" --include='actions.ts' | wc -l

# Count HTTP method exports in route.ts files
grep -r "export async function GET\|POST\|PUT\|DELETE\|PATCH" --include='route.ts' | wc -l
```

**Accept when:**
- All API endpoints in app/api directory are implemented as route.ts files with proper HTTP method exports
- All server mutation files contain 'use server' directive and follow actions.ts naming convention
- No server-only code (database queries, API keys) exists in client components without proper server boundary markers
- Static analysis tools detect no server-only imports in client components

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All RESTful endpoint implementations MUST be checked against R-RESTFUL-001 through R-RESTFUL-005 before approval.
</enforcement>