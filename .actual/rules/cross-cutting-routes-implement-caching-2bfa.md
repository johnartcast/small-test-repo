# Standardize Next.js API Routes for External Service Integration: Routes Implement Caching

These rules are ALWAYS ACTIVE for all Next.js API routes and client components that integrate with external services.

### Rules

- **R-ROUTES-001** MAY: API routes MAY implement caching strategies to reduce external API calls and improve performance.
- **R-ROUTES-002** MUST: All external API credentials and keys MUST be stored in environment variables (process.env) and never hardcoded or exposed in client-side code.
- **R-ROUTES-003** MUST: All external API calls from client components MUST route through Next.js API routes in the app/api directory.
- **R-ROUTES-004** MUST: All API routes MUST implement consistent error handling with appropriate HTTP status codes.
- **R-ROUTES-005** MUST: TypeScript interfaces MUST define contracts for API route requests and responses, shared between client and server code.

### Verify

```bash
# Detect direct external API calls from client components (should return empty)
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "'/api/" | grep -v "localhost"

# Find API routes missing environment variable usage
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Detect hardcoded API credentials in client-accessible code (should return empty)
grep -r "API_KEY\|apiKey\|api_key" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- All external API calls from client components route through Next.js API routes (no direct external fetch calls in client code)
- No API credentials or keys are hardcoded or accessible in client-side code bundles
- All API routes implement consistent error handling with appropriate HTTP status codes
- TypeScript interfaces define contracts for API route requests and responses
- Environment variables are validated for presence at runtime in all API routes

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for code review and CI pipeline enforcement.
</enforcement>