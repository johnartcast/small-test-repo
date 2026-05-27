# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Route Handlers Used

These rules are ALWAYS ACTIVE for all service and API boundary implementations in the codebase, including new API endpoints and server-side data mutations.

### Rules

- **R-ROUTE-001** SHOULD: Route Handlers SHOULD be used for external API integrations and third-party service calls that need to be proxied through the server.
- **R-ROUTE-002** SHOULD: Server Actions SHOULD be used for server-side data mutations including create, update, delete operations.
- **R-ROUTE-003** SHOULD: Form submission handlers and progressive enhancement scenarios SHOULD use Server Actions or Route Handlers as appropriate.
- **R-ROUTE-004** MUST: All API endpoints exposed to external clients or frontend applications MUST be implemented as route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH).
- **R-ROUTE-005** MUST: All server mutation files MUST contain the 'use server' directive and follow actions.ts naming convention.
- **R-ROUTE-006** MUST: No server-only code (database queries, API keys) MUST exist in client components without proper server boundary markers.
- **R-ROUTE-007** SHOULD: Naming conventions SHOULD follow: route.ts for API endpoints, actions.ts for server mutations, with action functions prefixed with action verbs (createTodo, updateWeather).
- **R-ROUTE-008** SHOULD: Shared utilities for authentication, error handling, and response formatting SHOULD be implemented to work across both Route Handlers and Server Actions.

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
- Route Handlers are used for external API integrations and third-party service proxying
- Server Actions are used for form submissions and progressive enhancement scenarios

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. Violations MUST be caught during code review and CI pipeline checks. Linter warnings for missing 'use server' directives MUST be escalated to errors. Static analysis tools MUST flag potential exposure of sensitive server code.
</enforcement>