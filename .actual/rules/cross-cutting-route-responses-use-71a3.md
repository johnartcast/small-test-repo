# Standardize Next.js API Routes for External Service Integration: Route Responses Use

These rules are ALWAYS ACTIVE for all Next.js API routes, client components, and external service integrations within the application.

### Rules

- **R-ROUTE-001** SHOULD: API route responses SHOULD use TypeScript interfaces to define request and response contracts.

### Verify

```bash
# Detect direct external API calls from client components (should route through /api/)
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "'/api/" | grep -v "localhost"

# Find API routes missing environment variable usage for credentials
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Detect API credentials or keys in client-side code
grep -r "API_KEY\|apiKey\|api_key" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- All external API calls from client components route through Next.js API routes (no direct external fetch calls in client code)
- No API credentials or keys are hardcoded or accessible in client-side code bundles
- All API routes implement consistent error handling with appropriate HTTP status codes
- TypeScript interfaces define contracts for API route requests and responses

<enforcement>
Claude Code MUST NOT skip or defer verification. Automated grep/pattern matching in CI pipeline detects direct external API calls from client components. Code review checklist requires verification of API route usage. Static analysis tools detect credential exposure in client bundles. TypeScript compilation ensures type-safe API contracts. Violations block merge and require remediation.
</enforcement>