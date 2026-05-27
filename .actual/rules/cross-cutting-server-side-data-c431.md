# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Server Side Data

These rules are ALWAYS ACTIVE for all server-side data mutations, form actions, API endpoints, and service boundary implementations in the codebase.

### Rules

- **R-BOUNDARY-001** MUST: Server-side data mutations and form actions MUST be implemented as Server Actions in `actions.ts` files, colocated with their feature modules.
- **R-BOUNDARY-002** MUST: All API endpoints in the `app/api/` directory MUST be implemented as `route.ts` files with proper HTTP method exports (GET, POST, PUT, DELETE, PATCH).
- **R-BOUNDARY-003** MUST: All `actions.ts` files MUST contain the `'use server'` directive at the top of the file.
- **R-BOUNDARY-004** MUST: Server-only code (database queries, API keys, sensitive business logic) MUST NOT exist in client components without proper server boundary markers.
- **R-BOUNDARY-005** SHOULD: Use naming conventions with action verbs for Server Action functions (e.g., `createTodo`, `updateWeather`, `deleteTodo`).
- **R-BOUNDARY-006** SHOULD: Implement shared utilities for common concerns like authentication, error handling, and response formatting that work across both Route Handlers and Server Actions.

### Verify

```bash
# Count route.ts files in app/api directory
find . -path '*/app/api/*/route.ts' -type f | wc -l

# Count files with 'use server' directive in actions.ts files
grep -r "'use server'" --include='actions.ts' | wc -l

# Count HTTP method exports in route.ts files
grep -r "export async function GET\|POST\|PUT\|DELETE\|PATCH" --include='route.ts' | wc -l

# Check for server-only imports in client components
grep -r "from.*actions" --include='*.tsx' --include='*.ts' | grep -v "'use server'" | head -20
```

**Accept when:**
- All API endpoints in `app/api/` directory are implemented as `route.ts` files with proper HTTP method exports.
- All server mutation files contain `'use server'` directive and follow `actions.ts` naming convention.
- No server-only code (database queries, API keys) exists in client components without proper server boundary markers.
- Server Action functions use action verb naming conventions (createTodo, updateWeather, etc.).
- Shared error handling and response formatting utilities are used consistently across Route Handlers and Server Actions.

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All service boundary implementations MUST be checked against R-BOUNDARY-001 through R-BOUNDARY-006 before approval.
</enforcement>