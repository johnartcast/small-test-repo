# Standardize Next.js API Routes for External API Integration: Route Handlers Implement

These rules are ALWAYS ACTIVE for all Next.js API routes under `app/api/**`, server actions in `actions.ts` files, library modules in `src/lib/**` that interact with external APIs, and client components that consume external data.

### Rules

- **R-ROUTE-001** MUST: API route handlers MUST implement proper error handling with appropriate HTTP status codes (4xx for client errors, 5xx for server errors).

### Verify

```bash
# Check for direct fetch calls to external APIs in client code
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "api/" | grep -v "localhost"

# Find API routes that don't use environment variables for credentials
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Check for hardcoded API keys or credentials in client-side code
grep -r "API_KEY\|api_key\|apiKey" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- No client-side components contain direct fetch calls to external third-party APIs (excluding localhost and internal /api routes)
- All API routes that interact with authenticated external services use environment variables for credentials
- No hardcoded API keys or credentials are found in client-side code (components, pages)

<enforcement>
Claude Code MUST NOT skip or defer verification. All three verification commands must pass before accepting changes to API integration patterns.
</enforcement>