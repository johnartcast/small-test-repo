# Adopt Server-Side API Route Proxying for External API Integration: Route Handlers Implement

These rules are ALWAYS ACTIVE for all external third-party API integrations requiring authentication, public APIs with CORS restrictions, services requiring API key management, and external data sources consumed by client-side React components.

### Rules

- **R-PROXY-001** SHOULD: API route handlers SHOULD implement appropriate error handling and return standardized response formats to client components.

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
- API route handlers implement consistent error response formats (e.g., `{ error: string, status: number }`)
- Environment variables for API keys are validated at application startup

<enforcement>
Claude Code MUST NOT skip or defer verification. Automated code review checks MUST scan for external API URLs in client components. CI pipeline verification MUST confirm no environment variables are bundled in client JavaScript. Pull requests MUST be blocked until violations are resolved.
</enforcement>