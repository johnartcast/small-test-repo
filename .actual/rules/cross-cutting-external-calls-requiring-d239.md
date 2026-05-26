# Adopt Server-Side API Route Proxying for External API Integration: External Calls Requiring

These rules are ALWAYS ACTIVE for all external API integrations requiring authentication, public APIs with CORS restrictions, and services requiring API key management consumed by client-side React components.

### Rules

- **R-EX-001** MUST: External API calls requiring authentication MUST be proxied through server-side API routes (e.g., /app/api/*/route.ts) rather than called directly from client components.

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
- All external API calls requiring authentication are routed through /app/api/* endpoints
- No API keys or credentials are present in client-side component code or browser bundles
- Client components use relative fetch paths (e.g., /api/weather) rather than external URLs for authenticated services

<enforcement>
Claude Code MUST NOT skip or defer verification. Automated code review checks MUST scan for external API URLs in client components. CI pipeline verification MUST confirm no environment variables are bundled in client JavaScript. Manual code review is required for new API integrations. CI build fails if violations are detected. Pull requests are blocked until violations are resolved.
</enforcement>