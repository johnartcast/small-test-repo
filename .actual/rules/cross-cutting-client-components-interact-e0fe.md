# Adopt Server-Side API Route Proxying for External API Integration: Client Components Interact

These rules are ALWAYS ACTIVE for all client components and API route handlers that integrate with external third-party APIs requiring authentication or managing CORS policies.

### Rules

- **R-PROXY-001** MUST: Client components MUST interact with external APIs exclusively through internal API routes using relative paths (e.g., `/api/weather`) rather than direct external URLs.

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
- API route handlers use `process.env` for credential access and validate their presence at startup
- Consistent error response formats are implemented across all API routes

<enforcement>
Claude Code MUST NOT skip or defer verification. CI pipeline verification that no environment variables are bundled in client JavaScript is mandatory. Security review is required for any direct client-to-external-API communication. Pull requests must be blocked until violations are resolved.
</enforcement>