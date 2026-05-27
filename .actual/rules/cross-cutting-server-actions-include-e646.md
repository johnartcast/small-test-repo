# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Server Actions Include

These rules are ALWAYS ACTIVE for all service and API boundary implementations, including Route Handlers (route.ts files) and Server Actions (actions.ts files) in the Next.js App Router architecture.

### Rules

- **R-SA-001** MUST: Server Actions MUST include the 'use server' directive at the top of the file to explicitly mark server-only code.

### Verify

```bash
# Count Route Handler files in app/api directory
find . -path '*/app/api/*/route.ts' -type f | wc -l

# Count Server Action files with 'use server' directive
grep -r "'use server'" --include='actions.ts' | wc -l

# Count HTTP method exports in route.ts files
grep -r "export async function GET\|POST\|PUT\|DELETE\|PATCH" --include='route.ts' | wc -l
```

**Accept when:**
- All API endpoints in app/api directory are implemented as route.ts files with proper HTTP method exports
- All server mutation files contain 'use server' directive and follow actions.ts naming convention
- No server-only code (database queries, API keys) exists in client components without proper server boundary markers

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All new API endpoints and server-side data mutations must follow these patterns before acceptance.
</enforcement>