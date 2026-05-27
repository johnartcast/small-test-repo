# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Route Handlers Export

These rules are ALWAYS ACTIVE for all service and API boundary implementations in the codebase, including all new API endpoints and server-side data mutations.

### Rules

- **R-RH-001** MUST: Route Handlers MUST export named functions corresponding to HTTP methods (GET, POST, PUT, DELETE, PATCH) using Next.js conventions.

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
- Route Handlers export named async functions for each supported HTTP method
- CI pipeline checks confirm route.ts file structure compliance in app/api directory

<enforcement>
Claude Code MUST NOT skip or defer verification. All route.ts files must be inspected for proper HTTP method exports. Linting rules checking for 'use server' directive in actions.ts files must pass. Code review and CI pipeline checks are mandatory before deployment.
</enforcement>