# Standardize Next.js API Routes for External Service Integration: External Integrations Implemented

These rules are ALWAYS ACTIVE for all external API integrations, client-side API consumption patterns, and server-side credential management in Next.js applications.

### Rules

- **R-EX-001** MUST: External API integrations MUST be implemented using Next.js API routes (app/api/**/route.ts) rather than direct client-side calls.
- **R-EX-002** MUST: All sensitive credentials and API keys MUST be stored in environment variables (process.env) and never hardcoded or accessible in client-side code bundles.
- **R-EX-003** MUST: All API routes MUST implement consistent error handling with appropriate HTTP status codes and standardized error response formatting.
- **R-EX-004** SHOULD: TypeScript interfaces SHOULD define contracts for API route requests and responses and be shared between client and server code.
- **R-EX-005** MAY: Public APIs that require no authentication and have CORS enabled MAY be called directly from client components (EXC-001).
- **R-EX-006** MAY: Server components in Next.js 13+ app directory MAY fetch external APIs directly during server-side rendering (EXC-002).

### Verify

```bash
# Detect direct external API calls from client components
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "'/api/" | grep -v "localhost"

# Find API routes missing environment variable usage
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Detect API credentials in client-accessible code
grep -r "API_KEY\|apiKey\|api_key" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- All external API calls from client components route through Next.js API routes (no direct external fetch calls in client code)
- No API credentials or keys are hardcoded or accessible in client-side code bundles
- All API routes implement consistent error handling with appropriate HTTP status codes
- TypeScript interfaces define contracts for API route requests and responses

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for external service integration patterns. Violations must be caught during code review and CI pipeline checks before merge.
</enforcement>