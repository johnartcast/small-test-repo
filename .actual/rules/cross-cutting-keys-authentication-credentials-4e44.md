# Adopt Server-Side API Route Proxying for External API Integration: Keys Authentication Credentials

These rules are ALWAYS ACTIVE for all external third-party API integrations requiring authentication, public APIs with CORS restrictions, and services requiring API key management consumed by client-side React components in Next.js applications.

### Rules

- **R-KEYS-001** MUST: API keys and authentication credentials MUST be stored in environment variables and accessed only in server-side code.
- **R-KEYS-002** MUST: All external API calls requiring authentication are routed through `/app/api/*` endpoints.
- **R-KEYS-003** MUST: No API keys or credentials are present in client-side component code or browser bundles.
- **R-KEYS-004** MUST: Client components use relative fetch paths (e.g., `/api/weather`) rather than external URLs for authenticated services.
- **R-KEYS-005** SHOULD: Place API route handlers in `/app/api/[service]/route.ts` following Next.js App Router conventions.
- **R-KEYS-006** SHOULD: Implement consistent error response formats (e.g., `{ error: string, status: number }`) across all API routes.
- **R-KEYS-007** SHOULD: Use Next.js middleware for cross-cutting concerns like rate limiting and request logging.
- **R-KEYS-008** SHOULD: Implement rate limiting at the API route level to prevent abuse and unexpected external API costs.

### Verify

```bash
# Verify API keys accessed server-side only
grep -r "process.env" src/app/api/ | grep -v "node_modules"

# Check for direct external API calls from client components
grep -r "fetch.*http" src/components/ src/app/ | grep -v "/api/" | grep -v "node_modules"

# List all API route handlers
find src/app/api -name "route.ts" -o -name "route.js"

# Verify no environment variables bundled in client JavaScript
grep -r "process.env" src/components/ | grep -v "node_modules"
```

**Accept when:**
- All external API calls requiring authentication are routed through `/app/api/*` endpoints
- No API keys or credentials are present in client-side component code or browser bundles
- Client components use relative fetch paths (e.g., `/api/weather`) rather than external URLs for authenticated services
- Environment variables are validated for presence at application startup
- API route endpoints implement rate limiting and proper error handling

<enforcement>
Claude Code MUST NOT skip or defer verification. CI pipeline verification that no environment variables are bundled in client JavaScript is mandatory. Automated code review checks scanning for external API URLs in client components are mandatory. Pull requests MUST be blocked until violations are resolved.
</enforcement>