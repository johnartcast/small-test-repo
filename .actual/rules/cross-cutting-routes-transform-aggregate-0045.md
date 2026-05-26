# Adopt Server-Side API Route Proxying for External API Integration: Routes Transform Aggregate

These rules are ALWAYS ACTIVE for all external third-party API integrations, public APIs with CORS restrictions, services requiring API key management, and external data sources consumed by client-side React components in Next.js applications.

### Rules

- **R-PROXY-001** MAY: API routes MAY transform or aggregate data from multiple external sources before returning to clients.

### Verify

```bash
# Verify API keys are accessed server-side only
grep -r "process.env" src/app/api/ | grep -v "node_modules"

# Check for direct external API calls from client components
grep -r "fetch.*http" src/components/ src/app/ | grep -v "/api/" | grep -v "node_modules"

# List all API route handlers
find src/app/api -name "route.ts" -o -name "route.js"
```

**Accept when:**
- All external API calls requiring authentication are routed through `/app/api/*` endpoints
- No API keys or credentials are present in client-side component code or browser bundles
- Client components use relative fetch paths (e.g., `/api/weather`) rather than external URLs for authenticated services
- API route handlers are placed in `/app/api/[service]/route.ts` following Next.js App Router conventions
- Environment variables for API keys are validated at application startup
- Consistent error response formats are implemented across all API routes
- Rate limiting and request logging are configured via Next.js middleware

<enforcement>
Claude Code MUST NOT skip or defer verification. All external API integrations MUST route through server-side API routes. Direct client-to-external-API communication with authentication credentials is a violation and MUST be blocked. Security review is required for any exceptions involving authentication credentials.
</enforcement>