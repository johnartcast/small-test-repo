# Standardize Next.js API Routes for External Service Integration: Routes Implement Request

These rules are ALWAYS ACTIVE for all Next.js API routes and client components that integrate with external services.

### Rules

- **R-ROUTE-001** SHOULD: API routes SHOULD implement request validation before calling external services.

### Verify

```bash
# Detect direct external API calls from client components (should route through /api/)
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "'/api/" | grep -v "localhost"

# Find API routes missing environment variable usage for credentials
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Detect hardcoded API credentials in client-accessible code
grep -r "API_KEY\|apiKey\|api_key" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- All external API calls from client components route through Next.js API routes (no direct external fetch calls in client code)
- No API credentials or keys are hardcoded or accessible in client-side code bundles
- All API routes implement consistent error handling with appropriate HTTP status codes
- TypeScript interfaces define contracts for API route requests and responses

<enforcement>
Claude Code MUST NOT skip or defer verification. All three verify commands MUST pass before accepting changes to API route implementations or client-side service integrations.
</enforcement>