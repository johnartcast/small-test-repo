# Standardize Next.js API Routes for External Service Integration: Sensitive Credentials Keys

These rules are ALWAYS ACTIVE for all Next.js API routes, client components, and server-side code that integrates with external services or handles sensitive credentials.

### Rules

- **R-CREDS-001** MUST: Sensitive credentials (API keys, tokens) MUST be stored in environment variables and accessed only in server-side API routes.
- **R-CREDS-002** MUST: No API credentials or keys shall be hardcoded or accessible in client-side code bundles.
- **R-CREDS-003** MUST: All external API calls from client components MUST route through Next.js API routes (no direct external fetch calls in client code).
- **R-CREDS-004** MUST: All API routes MUST implement consistent error handling with appropriate HTTP status codes.
- **R-CREDS-005** SHOULD: TypeScript interfaces SHOULD define contracts for API route requests and responses.
- **R-CREDS-006** MAY: Public APIs that require no authentication and have CORS enabled may be called directly from client components (EXC-001).
- **R-CREDS-007** MAY: Server components in Next.js 13+ app directory may fetch external APIs directly during server-side rendering (EXC-002).

### Verify

```bash
# Detect direct external API calls from client components
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "'/api/" | grep -v "localhost"

# Find API routes without environment variable usage
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Detect hardcoded API credentials in client-accessible code
grep -r "API_KEY\|apiKey\|api_key" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- All external API calls from client components route through Next.js API routes (no direct external fetch calls in client code)
- No API credentials or keys are hardcoded or accessible in client-side code bundles
- All API routes implement consistent error handling with appropriate HTTP status codes
- TypeScript interfaces define contracts for API route requests and responses
- Environment variables are validated for presence at runtime in all API routes

<enforcement>
Claude Code MUST NOT skip or defer verification. All grep commands MUST return empty results (no matches) for production code, except where documented exceptions (EXC-001, EXC-002) apply with explicit justification in code comments.
</enforcement>