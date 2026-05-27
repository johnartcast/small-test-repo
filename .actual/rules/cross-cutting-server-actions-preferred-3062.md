# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Server Actions Preferred

These rules are ALWAYS ACTIVE for all service and API boundary implementations, including new API endpoints, server-side data mutations, form submission handlers, and server-side business logic requiring authentication or authorization.

### Rules

- **R-SVC-001** SHOULD: Server Actions SHOULD be preferred over Route Handlers for form submissions and data mutations that are tightly coupled to UI components.
- **R-SVC-002** MUST: All API endpoints in the app/api directory MUST be implemented as route.ts files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH).
- **R-SVC-003** MUST: All server mutation files MUST contain the 'use server' directive and follow the actions.ts naming convention.
- **R-SVC-004** MUST: No server-only code (database queries, API keys) MUST exist in client components without proper server boundary markers.
- **R-SVC-005** SHOULD: Naming conventions SHOULD follow: route.ts for API endpoints, actions.ts for server mutations, and action functions SHOULD be prefixed with action verbs (createTodo, updateWeather).
- **R-SVC-006** SHOULD: Shared utilities for authentication, error handling, and response formatting SHOULD be implemented to work across both Route Handlers and Server Actions.

### Verify

```bash
# Count route.ts files in app/api directory
find . -path '*/app/api/*/route.ts' -type f | wc -l

# Count 'use server' directives in actions.ts files
grep -r "'use server'" --include='actions.ts' | wc -l

# Count HTTP method exports in route.ts files
grep -r "export async function GET\|POST\|PUT\|DELETE\|PATCH" --include='route.ts' | wc -l
```

**Accept when:**
- All API endpoints in app/api directory are implemented as route.ts files with proper HTTP method exports
- All server mutation files contain 'use server' directive and follow actions.ts naming convention
- No server-only code (database queries, API keys) exists in client components without proper server boundary markers
- Automated linting rules verify 'use server' directive presence in actions.ts files
- Static analysis tools detect and flag server-only imports in client components
- Code review checklist items confirm service boundary patterns are followed

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All new service boundaries and API implementations MUST be checked against R-SVC-001 through R-SVC-006 before approval. CI pipeline checks for route.ts file structure and linter warnings for missing 'use server' directives MUST pass. Violations result in build failures and code review blocks until remediated.
</enforcement>