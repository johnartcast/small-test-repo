# Standardize Next.js API Routes for External API Integration: Routes Implement Caching

These rules are ALWAYS ACTIVE for all Next.js API routes under `app/api/**`, server actions in `actions.ts` files, library modules in `src/lib/**` that interact with external APIs, and client components that consume external data.

### Rules

- **R-ROUTES-001** MAY: API routes MAY implement caching strategies for external API responses to reduce latency and API quota consumption.
- **R-ROUTES-002** MUST: All API routes that interact with authenticated external services MUST use environment variables for credentials.
- **R-ROUTES-003** MUST: No hardcoded API keys or credentials SHALL appear in client-side code (components, pages).
- **R-ROUTES-004** SHOULD: API routes SHOULD mirror the external service they proxy in their naming convention (e.g., `/api/weather` for weather API integration).
- **R-ROUTES-005** SHOULD: TypeScript interfaces SHOULD be used to define request/response contracts between client components and API routes.

### Verify

```bash
# Detect direct fetch calls to external APIs from client code
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "api/" | grep -v "localhost"

# Find API routes missing environment variable usage for credentials
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Detect hardcoded API keys or credentials in client-side code
grep -r "API_KEY\|api_key\|apiKey" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- No client-side components contain direct fetch calls to external third-party APIs (excluding localhost and internal `/api` routes)
- All API routes that interact with authenticated external services use environment variables for credentials
- No hardcoded API keys or credentials are found in client-side code (components, pages)

<enforcement>
Claude Code MUST NOT skip or defer verification. All three verification commands MUST pass before accepting changes to API integration patterns.
</enforcement>