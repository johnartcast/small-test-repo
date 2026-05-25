# Standardize Next.js API Routes for External API Integration: Client Components Not

These rules are ALWAYS ACTIVE for all Next.js client components, server actions, and API route handlers that integrate with external third-party services and public APIs.

### Rules

- **R-NEXTJS-API-001** MUST NOT: Client components MUST NOT contain hardcoded API endpoints, credentials, or direct fetch calls to external third-party services.
- **R-NEXTJS-API-002** MUST: All external API integrations MUST be proxied through Next.js API routes (app/api/** directory) or server actions (actions.ts files).
- **R-NEXTJS-API-003** MUST: API credentials and sensitive configuration MUST be stored in environment variables and accessed only on the server side.
- **R-NEXTJS-API-004** MUST: API routes that interact with authenticated external services MUST use process.env for credential access.
- **R-NEXTJS-API-005** SHOULD: API route naming conventions SHOULD mirror the external service they proxy (e.g., /api/weather for weather API integration).
- **R-NEXTJS-API-006** SHOULD: TypeScript interfaces SHOULD be defined to establish request/response contracts between client components and API routes.
- **R-NEXTJS-API-007** MAY: Official SDK libraries that handle authentication securely in client-side code (e.g., Firebase, Auth0) MAY be used as exceptions (EXC-001).
- **R-NEXTJS-API-008** MAY: Public APIs that require no authentication and have no rate limiting concerns MAY be called directly from client code as exceptions (EXC-002).

### Verify

```bash
# Check for direct fetch calls to external APIs in client components
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "api/" | grep -v "localhost"

# Find API routes missing environment variable usage for credentials
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Check for hardcoded API keys or credentials in client-side code
grep -r "API_KEY\|api_key\|apiKey" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- No client-side components contain direct fetch calls to external third-party APIs (excluding localhost and internal /api routes)
- All API routes that interact with authenticated external services use environment variables for credentials
- No hardcoded API keys or credentials are found in client-side code (components, pages)

<enforcement>
Claude Code MUST NOT skip or defer verification. All three verification commands MUST pass before accepting changes to files in scope.
</enforcement>