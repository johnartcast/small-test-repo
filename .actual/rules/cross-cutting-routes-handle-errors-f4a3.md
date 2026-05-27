# Standardize Next.js API Routes for External Service Integration: Routes Handle Errors

These rules are ALWAYS ACTIVE for all Next.js API routes and client components that integrate with external services.

### Rules

- **R-ROUTES-001** MUST: API routes MUST handle errors gracefully and return standardized error responses with appropriate HTTP status codes.

### Verify

```bash
# Detect direct external API calls from client components (should route through /api/)
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "'/api/" | grep -v "localhost"

# Find API routes missing environment variable usage for credentials
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Detect API credentials in client-side code
grep -r "API_KEY\|apiKey\|api_key" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- All external API calls from client components route through Next.js API routes (no direct external fetch calls in client code)
- No API credentials or keys are hardcoded or accessible in client-side code bundles
- All API routes implement consistent error handling with appropriate HTTP status codes
- TypeScript interfaces define contracts for API route requests and responses

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory and must be checked before approving changes to API routes or client components that consume external services.
</enforcement>